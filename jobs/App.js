import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

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

    const TabNavigator = createAppContainer(createBottomTabNavigator({
      Welcome: WelcomeScreen,
      Auth: AuthScreen,
      Main: createBottomTabNavigator({
        Map: MapScreen,
        Deck: DeckScreen,
        Review: ReviewStack,
      })
    }));

    return (
      <View style={styles.container}>
        <TabNavigator />
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
