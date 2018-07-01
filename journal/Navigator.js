import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Fab, Icon } from 'native-base';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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

const NavWrapper = ({ loading, user }) => {
  if (loading) return <ActivityIndicator size="large" />;
  if (!user) return <Login />;
  return <Navigator screenProps={{ user }} />;
};

const userQuery = gql`
  query userQuery {
    user {
      id
      email
      posts(orderBy: createdAt_ASC) {
        id
        title
      }
    }
  }
`;

export default graphql(userQuery, {
  props: ({ data }) => ({ ...data })
})(NavWrapper);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  newPost: {
    backgroundColor: '#00FF00'
  }
});
