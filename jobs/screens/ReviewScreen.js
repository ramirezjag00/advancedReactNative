import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

class ReviewScreen extends Component {
  static navigationOptions = {
    title: 'Review Jobs',
  };

  render() {
    return (
      <View>
        <Text>ReviewScreen</Text>
      </View>
    );
  }
}

export default ReviewScreen;
