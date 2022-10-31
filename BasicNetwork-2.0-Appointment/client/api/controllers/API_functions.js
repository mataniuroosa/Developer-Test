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

module.exports.invoke = function(user_id, channel_name, chaincode_name, function_name,connectionFile, next_function, ...function_arguments) {

  return_args = {};

  /*
   * SPDX-License-Identifier: Apache-2.0
   */

  'use strict';

  const { FileSystemWallet, Gateway } = require('fabric-network');
  const path = require('path');

  const ccpPath = path.resolve(__dirname, '..','..','..',  'connection', connectionFile);

  async function main() {
      try {

          // Create a new file system based wallet for managing identities.
          const walletPath = path.join(process.cwd(), 'wallet');
          const wallet = new FileSystemWallet(walletPath);
          console.log(`Wallet path: ${walletPath}`);

          // Check to see if we've already enrolled the user.
          const userExists = await wallet.exists(user_id);
          if (!userExists) {
              console.log('An identity for the user user_id does not exist in the wallet');
              console.log('Run the registerUser.js application before retrying');

              return;
          }

          // Create a new gateway for connecting to our peer node.
          const gateway = new Gateway();
          await gateway.connect(ccpPath, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

          // Get the network (channel) our contract is deployed to.
          const network = await gateway.getNetwork(channel_name);

          // Get the contract from the network.
          const contract = network.getContract(chaincode_name);

          await contract.submitTransaction(function_name, ...function_arguments);
          console.log('Transaction has been submitted');
          return_args.status = 200;
          return_args.message = "SUCCESS";
          next_function(return_args);        // Disconnect from the gateway.
          await gateway.disconnect();

      } catch (error) {
          console.error(`Failed to submit transaction: ${error}`);
          return_args.status = 404;
          return_args.message = error.toString()
          next_function(return_args);
          process.exit(1);
      }
  }

  main();


}



module.exports.query = function(user_id, channel_name, chaincode_name, function_name,connectionFile, next_function, ...function_arguments) {

  return_args = {};
  /*
   * SPDX-License-Identifier: Apache-2.0
   */

  'use strict';

  const { FileSystemWallet, Gateway } = require('fabric-network');
  const path = require('path');

  const ccpPath = path.resolve(__dirname,'..','..','..',  'connection', connectionFile);

  async function main() {
      try {

          // Create a new file system based wallet for managing identities.
          const walletPath = path.join(process.cwd(), 'wallet');
          const wallet = new FileSystemWallet(walletPath);
          console.log(`Wallet path: ${walletPath}`);
          console.log(user_id);
          // Check to see if we've already enrolled the user.
          const userExists = await wallet.exists(user_id);
          console.log(userExists);
          if (!userExists) {
              console.log('An identity for the user "'+user_id+'" does not exist in the wallet');
              console.log('Run the registerUser.js application before retrying');
              return_args.status = 200;
              return_args.message = "SUCCESS";
              return_args.data = "false";
              next_function(return_args);        // Disconnect from the gateway.
              return;
          }

          // Create a new gateway for connecting to our peer node.
          const gateway = new Gateway();
          await gateway.connect(ccpPath, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

          // Get the network (channel) our contract is deployed to.
          const network = await gateway.getNetwork(channel_name);

          // Get the contract from the network.
          const contract = network.getContract(chaincode_name);

          // Evaluate the specified transaction.
          // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
          // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
          const result = await contract.evaluateTransaction(function_name,...function_arguments);

  				return_args.status = 200;
          return_args.message = "SUCCESS";
          return_args.data = result.toString();
          next_function(return_args);

      } catch (error) {
          console.error(`Failed to evaluate transaction: ${error}`);
  				return_args.status = 400;
  				return_args.message = error.toString();
  				next_function(return_args);
          process.exit(1);
      }
  }

  main();

}
