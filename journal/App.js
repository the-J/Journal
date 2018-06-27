import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import navStyles from './styles/navStyles';

import Post from './Post';

class App extends Component {
  static navigationOptions = { title: 'Home', ...navStyles };

  goToPost = () => this.props.navigation.navigate('Post');

  render() {
    return (
      <View style={styles.container}>
        <Text> Hello</Text>

        <Button onPress={this.goToPost} title="Go to post page" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default createStackNavigator({
  Home: {
    screen: App
  },
  Post: {
    screen: Post
  }
});
