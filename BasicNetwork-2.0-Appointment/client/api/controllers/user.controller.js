//var dbconn = require('../data/dbconnection.js');

//var hotelData = require('../data/hotel-data.json');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http')
var fs = require('fs');
var Fabric_Client = require('fabric-client');
var Fabric_CA_Client = require('fabric-ca-client');
var path = require('path');
var util = require('util');
var os = require('os');



module.exports.user_register = function(userid,adminId,department,msp,connectionFile, next) {


  return_args = {}

  /*
   * SPDX-License-Identifier: Apache-2.0
   */

  'use strict';

  const {
    FileSystemWallet,
    Gateway,
    X509WalletMixin
  } = require('fabric-network');
  console.log(FileSystemWallet);
  console.log(Gateway);

  const path = require('path');

  const ccpPath = path.resolve(__dirname, '..', '..', '..', 'connection', connectionFile);

  async function main() {
    try {

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = new FileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we've already enrolled the user.
      const userExists = await wallet.exists(userid);
      if (userExists) {
        console.log('An identity for the user ' + userid + ' already exists in the wallet');
        return;
      }

      // Check to see if we've already enrolled the admin user.
      const adminExists = await wallet.exists(adminId);
      if (!adminExists) {
        console.log('An identity for the admin user "admin" does not exist in the wallet');
        console.log('Run the enrollAdmin.js application before retrying');
        return;
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccpPath, {
        wallet,
        identity: adminId,
        discovery: {
          enabled: true,
          asLocalhost: true
        }
      });

      // Get the CA client object from the gateway for interacting with the CA.
      const ca = gateway.getClient().getCertificateAuthority();
      const adminIdentity = gateway.getCurrentIdentity();
      // affiliation: 'org1.department1',

      // Register the user, enroll the user, and import the new identity into the wallet.
      const secret = await ca.register({
        affiliation: department,
        enrollmentID: userid,
        role: 'client',
        attrs: [{
          name: 'UserId',
          value: userid,
          ecert: true
        }]
      }, adminIdentity);
      const enrollment = await ca.enroll({
        enrollmentID: userid,
        enrollmentSecret: secret
      });
      // Org1MSP
      const userIdentity = X509WalletMixin.createIdentity(msp, enrollment.certificate, enrollment.key.toBytes());
      await wallet.import(userid, userIdentity);
      console.log('Successfully registered and enrolled admin user ' + userid + ' and imported it into the wallet');
      return_args.status = 200;
      return_args.message = "User registered";
      next_function(return_args);
    } catch (error) {
      console.error(`Failed to register user ` + userid + `: ${error}`);
      return_args.status = 400;
      return_args.message = "User cannot register";
      process.exit(1);
    }
  }

  main();

}
