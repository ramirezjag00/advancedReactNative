import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { MapView } from 'expo';

class MapScreen extends Component {
  state = {
    region: {
      // Makati long, lat from www.google.com.ph
      longitude: 121.0244,
      latitude: 14.5547,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion= {this.state.region}
        />
      </View>
    );
  }
}

export default MapScreen;
