# Developer-Test
 
The Challenge is written below in Detail. 

**The Challenge**

Build a CRUD application with a REST API that the application uses for at least one set
of Create (POST) and Read (GET) requests.
For example, build an application that enables a user to Book Appointments over HTTP
to achieve the following;

i. Create new appointment
ii. Read existing appointments (for a given date + individual
appointments)

As well as the solution itself this is a chance to showcase your skills and experience for
what makes a good codebase and what else should accompany that codebase.

**Additional Details;**

One of the languages GO, Java or NodeJS should be incorporated into the codebase
Candidates should consider what time they require to complete the challenge and
inform the ByzGen team of the deadline. 

The deadline should not extend beyond 10 days after receipt of the test.

The ByzGen team will be available for any questions or clarifications the candidate has
for the duration of the test - either by email or slack.
A local git repository is used with commits/branches and git bundle is used to share the
repository back to the ByzGen team
The candidate has a chance to present back to the ByzGen team the solution and key
thinking around development of the codebase


++++++++++++++++++++++Project Development Information++++++++++++++++++++s


The Project is developed using blockchain technology on hyperledger fabric 2.0 with update network , chaincode installation and new chaincode is add in this system on Golang.


----------------+++++The Folder Structure++++++---------------------
1. Appointment_project
   1. BasicNetwork-2.0-Appointment
      1. artifacts
        1. channel
        2. src
      2. client
      3. connection
      4. .createchannel.sh.swp
      5. .generate.sh.swp
      6. createChannel.sh
      7. deploychaincode.sh
      8. envVar.sh
      9. generate.sh
      10. installchaincode.sh
      11. log.txt
      12. start_network.sh
      13. teardown.sh
   2. frontend
      1. e2e
      2. node_modules
      3. src
   3. prereqs-ubuntu.sh

----------------+++++The Network Structure++++++---------------------
1. Two organzation
2. Three Orderer Srevices
3. Two CA
4. Two Peer in each organzation
5. Four Coucdb


====================================== Steps to Run Project===============================================

===============Backend Part======================
1. To Generate Certificate and Cryto Material
   #command
   1. cd BasicNetwork-2.0-Appointment
   ./generate.sh

2. To Start Network
    #command
    1. ./start_network.sh 
 
3. To Install Chaincode 
    #command
    1. ./install.chaincode.sh

================ Start Rest API's in Client Folder =====================

1. go to client folder
    #command
    1. cd BasicNetwork-2.0-Appointment/client
    2. rm -r wallet/*
    3. npm install 
    4. node enrollAdminOrg1.js
    5. node enrollAdminOrg2.js
    6. node registersystem.js
    7. nodemon app.js

====================Start Frontend   Part===========================

#command
1. cd frontend
2. ng serve


Open Broweser and write URL:localhost:4200 
The UserInterface is Running. 
