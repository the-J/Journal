import React, { Component } from 'react';
import { Text, View } from 'react-native';

import navStyles from './styles/navStyles';

export default class Post extends Component {
  static navigationOptions = {
    title: 'Post',
    ...navStyles
  };

  render() {
    console.log(this.props);
    return (
      <View>
        <Text> {this.props.navigation.state.params.id} </Text>
      </View>
    );
  }
}
