import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PostForm from './PostForm';

import navStyles from '../../styles/navStyles';

class NewPost extends Component {
  static navigationOptions = { title: 'Post', ...navStyles };

  state = { loading: false };

  newPost = ({ title, body }) => {
    this.setState({ loading: true });

    const { createPost, navigation } = this.props;

    createPost({
      variables: {
        title,
        body
      }
    })
      .then(() => {
        navigation.goBack();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <PostForm onSubmit={this.newPost} />
        )}
      </View>
    );
  }
}

const newPost = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
    }
  }
`;

export default graphql(newPost, {
  name: 'createPost'
})(NewPost);
