import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

export default class App extends React.Component {
  componentDidMount() {
    // move this to a .env file
    const config = {
    apiKey: "AIzaSyAeJsPZZLdaxOYGznT_1gjnR-x7lpscNT8",
    authDomain: "one-time-password-797c6.firebaseapp.com",
    databaseURL: "https://one-time-password-797c6.firebaseio.com",
    projectId: "one-time-password-797c6",
    storageBucket: "one-time-password-797c6.appspot.com",
    messagingSenderId: "248733918475"
  };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
