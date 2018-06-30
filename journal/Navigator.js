import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import NewPost from './components/posts/NewPost';

import navStyles from './styles/navStyles';

class Home extends Component {
  static navigationOptions = { title: 'Home', ...navStyles };

  newPost = () => this.props.navigation.navigate('NewPost');

  render() {
    return (
      <View style={styles.container}>
        <Posts {...this.props} />
        <TouchableHighlight style={styles.newPost} onPress={this.newPost}>
          <Text style={styles.newPostText}>New Post + </Text>
        </TouchableHighlight>
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
  },
  NewPost: {
    screen: NewPost
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  newPost: {
    backgroundColor: '#00FF00',
    padding: 20
  },
  newPostText: {
    fontSize: 20,
    textAlign: 'center'
  }
});
