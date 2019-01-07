import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  Button
} from 'react-native-elements';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Review Jobs',
      headerRight: (
        <Button
          title="Settings"
          onPress={() => {navigation.navigate('Settings')}}
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
