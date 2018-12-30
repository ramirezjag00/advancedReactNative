import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  Platform,
  UIManager,
  View,
} from 'react-native';

// get the width of the device, the user is currently using
const SCREEN_WIDTH = Dimensions.get('window').width;
// fourth of the screen of device
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  // this is where we define defaultProps
  // this basically states props that will be used in case those props weren't passed in to this component
  // by doing so, we prevent having errors
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  }

  constructor(props) {
    super(props);

    // defines an animation position of which component it will be used
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      // life cycle events of PanResponder

      // setting this as panResponder
      // everytime a user puts a finger on this component, we want this panResponder to be responsible with that gesture
      onStartShouldSetPanResponder: () => true,

      // this will be called all of the time while the user is dragging or moving this component
      onPanResponderMove: (event, gesture) => {
        // change the position manually with setValue and use dx, dy (distance of gestures) as values for x and y coordinates of animation position
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      // this will be called when the user releases the touch of this component
      onPanResponderRelease: (event, gesture) => {
        //do something when card has been swiped left or right
        if (gesture.dx > SWIPE_THRESHOLD) {
          // move the item away to the right
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // move the item away to the left
          this.forceSwipe('left');
        } else {
          // if it didn't reach the SWIPE_THRESHOLD, reset the position
          this.resetPosition();
        }
      },
    });

    this.state =  {
      panResponder,
      position,
      index: 0,
    };
  }

  // this part serves as a reset for index (highly recommended to use redux)
  // when the last item has been swiped and the app is reloading for more items
  // // alternative for deprecated componentWillReceiveProps
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // call if the nextProps is not equal to what we currently have
  //   if (nextProps.data !== prevState.data) {
  //     // equivalent to setState
  //     return ({ index: 0 })
  //   }
  // }

  componentDidUpdate() {
    // if	UIManager.setLayoutAnimationEnabledExperimental is existing, set it to true
			UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      //then call LayoutAnimation and apply spring()
      // anytime we made any changes to this component, this will be used to animate
      LayoutAnimation.spring();
	}

  forceSwipe(direction) {
    const { position } = this.state;
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    // move an item linearly without any bouncy feeling like Animated.spring()
    Animated.timing(position, {
      // x: x
      toValue: { x, y: 0 },
      // in ms
      duration: SWIPE_OUT_DURATION,
      // start animation but as soon as it finished, trigger the callback function that tells what will happen after
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const { index, position } = this.state;
    // to know which item has been swiped completely
    const item = data[index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    // reset the position x and y values
    // as per the documentation, this is a better approach to set new values of position instead of setState
    position.setValue({ x: 0, y: 0 });
    // set the index of data to +1, to get the next item
    this.setState({ index: index + 1 });
  }

  resetPosition() {
    const { position } = this.state;
    // use spring function to modify this.position to new coordinates
    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
      // start animation
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    // access the horizontal values of position with x and interpolate (tie x property with the rotation property)
    // the more you drag horizontally further, the more it rotates
    // inputRange are directly proportional to outputRange, linearly
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg' ],
    });

    // get the pre-defined properties and call/use the animation with getLayout()
    return {
      ...position.getLayout(),
      // comma separated from position and transform, means will be adding 'transform' as a new property of getCardStyle
      // rotate: rotate
      transform: [{ rotate }]
    }
  }

  renderCards() {
    const { panResponder, index } = this.state;
    const { data, renderCard, renderNoMoreCards } = this.props;

    // trigger this once there is no more item/s to render
    if (index >= data.length) {
      return renderNoMoreCards();
    }

    return data.map((item, i) => {
      // do not return an item that has already been swiped, return null
      if (i < index) {
        return null;
      }

      // ACTIVE CARD
      // render the current item based on the index
      if (i === index) {
        return (
          // Animated.View is used to wrap what should be animated coz it knows how to receive animations that get passed in to it
          <Animated.View
            // key is needed here, since our animated component will be rotating
            key={item.id}
            style={[this.getCardStyle(), styles.cardContainer]}
            // this is how to use a panHandler
            // panHandlers is a property object which contains different callbacks which help intercept presses from a user
            // using the spread syntax, we are spreading different callbacks of the panHandlers to the Animated.View
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }

      // INACTIVE CARDS
      return (
        <Animated.View
          key={item.id}
          style={[styles.cardContainer, { top: 10 * (i - index) }]}
        >
          {renderCard(item)}
        </Animated.View>
      );
      // reverse the array
    }).reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardContainer: {
    position: 'absolute',
    // left: 0,
    // right: 0,
    width: SCREEN_WIDTH,
  },
}

export default Deck;
