import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

class Slides extends Component {
  renderSlides() {
    const { data } = this.props;
    return data.map(slide => {
      return (
        <View key={slide.text} style={styles.slideContainer}>
          <Text style={styles.slideText}>{slide.text}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideText: {
    fontSize: 30,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default Slides;
