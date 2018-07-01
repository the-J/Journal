import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Fab, Icon } from 'native-base';

import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import NewPost from './components/posts/NewPost';

import Login from './components/user/Login';

import navStyles from './styles/navStyles';

class Home extends Component {
  static navigationOptions = { title: 'Home', ...navStyles };

  newPost = () => this.props.navigation.navigate('NewPost');

  render() {
    return (
      <View style={styles.container}>
        <Posts {...this.props} />

        <Fab style={styles.newPost} onPress={this.newPost}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  newPost: {
    backgroundColor: '#00FF00'
  }
});

const Navigator = createStackNavigator({
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

const NavWrapper = props => {
  return <Login />;
  return <Navigator />;
};

export default NavWrapper;
