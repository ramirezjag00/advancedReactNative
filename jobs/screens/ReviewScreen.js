import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
} from 'react-native';
import {
  Button
} from 'react-native-elements';
import { connect } from 'react-redux';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Review Jobs',
      headerRight: (
        <Button
          title="Settings"
          onPress={() => {navigation.navigate('Settings')}}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0,112,255,1)"
        />
      ),
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
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

function mapStateToProps(state) {
  return {
    likedJobs: state.likedJobs,
  };
}

export default connect(mapStateToProps)(ReviewScreen);
