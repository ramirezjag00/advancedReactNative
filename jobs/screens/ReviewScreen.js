import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

class ReviewScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'Review Jobs',
      headerRight: (
        <Button
          // onPress={navigation.getParam('increaseCount')}
          title="Right"
          color="#000"
        />
      ),
    }
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
