const functions = require('firebase-functions');
const createUser = require('./create_user');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// since we made an object property 'helloWorld' for exports, google will assume that we will make a function name using this
// functions.https.onRequest, this is how to setup google cloud functions
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.goodBye = functions.https.onRequest((request, response) => {
 response.send("...goodbye!");
});

// create a function `createUser` and set it up using the createUser function that has been imported
exports.createUser = functions.https.onRequest(createUser);
