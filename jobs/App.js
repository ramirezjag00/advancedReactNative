import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './screens/AuthScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component {
  render() {
    const ReviewStack = createStackNavigator({
      Review: ReviewScreen,
      Settings: SettingsScreen,
    });

    const TabNavigator = createBottomTabNavigator({
      Map: MapScreen,
      Deck: DeckScreen,
      Review: ReviewStack,
    });

    const RootNavigator = createAppContainer(createStackNavigator({
      Welcome: WelcomeScreen,
      Auth: AuthScreen,
      Tab: TabNavigator,
    },{
      mode: 'modal',
      headerMode: 'none'
    }));

    return (
      <View style={styles.container}>
        <RootNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
