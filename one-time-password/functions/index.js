const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const serviceAccount = require('./service_accounts.json');

// use admin to access our service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-797c6.firebaseio.com"
});

// sample function
// // since we made an object property 'helloWorld' for exports, google will assume that we will make a function name using this
// // functions.https.onRequest, this is how to setup google cloud functions
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// create a function `createUser` and set it up using the createUser function that has been imported
exports.createUser = functions.https.onRequest(createUser);
