import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { MapView } from 'expo';

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      // Makati long, lat from www.google.com.ph
      longitude: 121.0244,
      latitude: 14.5547,
      //xxxDelta indicates the zoom state of the long, lat
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = region => {
    this.setState({ region });
  }

  render() {
    const { region, mapLoaded } = this.state;
    if (!mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion= {region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
      </View>
    );
  }
}

export default MapScreen;
