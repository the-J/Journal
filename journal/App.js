import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class App extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#373142'
    },
    headerTitleStyle: {
      color: '#FFF'
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Hello</Text>
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
  }
});
