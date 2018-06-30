import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PostForm from './PostForm';

import navStyles from '../../styles/navStyles';

class NewPost extends Component {
  static navigationOptions = { title: 'Post', ...navStyles };

  newPost = ({ title, body }) => {
    console.log(title, body);

    this.props
      .createPost({
        variables: {
          title,
          body
        }
      })
      .then(() => {})
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View>
        <PostForm onSubmit={this.newPost} />
      </View>
    );
  }
}

const newPost = gql`
  mutation newPost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
    }
  }
`;

export default graphql(newPost, {
  name: 'createPost'
})(NewPost);
