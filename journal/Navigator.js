import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Posts from './Posts';
import Post from './Post';

import navStyles from './styles/navStyles';

class Home extends Component {
  static navigationOptions = { title: 'Home', ...navStyles };

  render() {
    return (
      <View style={styles.container}>
        <Posts {...this.props} />
      </View>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: Home
  },
  Post: {
    screen: Post
  }
});

const styles = StyleSheet.create({
  container: {}
});
