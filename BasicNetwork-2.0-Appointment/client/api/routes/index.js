var express = require('express');
var router = express.Router();

var api_functions = require('../controllers/API_functions.js')



router
  .route('/event/CreateEvent')
  .post(function(req, res) {
    console.log("Set Patient User");
     console.log(req.body);
    next_function = function(return_args) {
          res.send(return_args)
        }
        var payload;
        try {
          payload = JSON.parse(req.body.payload);
        } catch (error) {
          res.send('payload must be json object')

        }
        api_functions.invoke('system', 'mychannel', 'event', 'CreateEvent', 'connection-org1.json', next_function, req.body.uid,req.body.event,req.body.payload);
       
  });

  router
  .route('/event/GetEvent')
  .get(function(req, res) {
    next_function = function(return_args) {
      res.send(return_args)
    }
    api_functions.query('system', 'mychannel', 'event', 'GetEvent', 'connection-org1.json', next_function, req.body.uid);
  });
/*

  router
    .route('/transation/SetVaccineStatus')
    .post(function(req, res) {

      next_function = function(return_args) {
        res.send(return_args)
      }

        api_functions.invoke('system', 'mychannel', 'users', 'SetVaccineStatus', 'connection-org1.json', next_function, req.body.isvaccinated);
      
    });

  router
    .route('/transation/QueryVaccineStatus')
    .get(function(req, res) {

      next_function = function(return_args) {
        res.send(return_args)
      }

        api_functions.query('system', 'mychannel', 'users', 'QueryVaccineStatus', 'connection-org1.json', next_function, req.body.isvaccinated);
      
    });

*/
module.exports = router;


