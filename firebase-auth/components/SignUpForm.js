import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';
import axios from 'axios';

// place this on .env file
const ROOT_URL = 'https://us-central1-one-time-password-797c6.cloudfunctions.net';

class SignUpForm extends Component {
  // ES2017
  // no need for constructor since we won't be doing anything from there except for initializing a state
  state = {
    phone: '',
  };

  // ES2017
  // no need to do this.handle.bind(this) since the arrow function handles it
  handleSubmit = async () => {
    const { phone } = this.state;
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone });
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone });
    } catch (err) {
      console.log(err);
    }

  }

  render() {
    const { phone } = this.state;

    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            placeholder="639XXXXXXXXX"
            value={phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}

export default SignUpForm;
