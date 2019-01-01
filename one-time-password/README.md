# ONE TIME PASSWORD (Google Cloud Functions - SERVERLESS) for Firebase-Auth App (REACT-NATIVE PROJECT)

- this project consists for three functions: first is to create a user that'll be saved in the firebase database, second is to request one time password (4-digit code) that'll be saved into the database and be sent via sms using Promotexter API (since Twilio doesn't have free sms in Philippines if you're using trial account), third is to compare the code submitted by user and code in database then send token to allow user to be logged in or authenticated.

### DESCRIPTION:

- Serverless solution using Firebase Functions, Storage, Database and Authentication

- for the SMS, Promotexter API

#### NOTES:
- set up Firebase Account then configure Functions, Service Account, Database, Authentication
- create service_accounts.json file for configuration
- create promotexter file for configuration
- set up Promotexter API
