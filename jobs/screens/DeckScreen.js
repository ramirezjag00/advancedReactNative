import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';
class DeckScreen extends Component {
  renderCard(job) {
    return (
      <Card title={job.jobTitle}>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet}</Text>
      </Card>
    );
  }

  render() {
    return (
      <View>
        <Text>{this.props.jobs[0].jobtitle}</Text>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
}

// destructuring state.jobs from combineReducers
function mapStateToProps({jobs}) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps)(DeckScreen);
