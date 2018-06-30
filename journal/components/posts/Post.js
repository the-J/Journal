import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import navStyles from '../../styles/navStyles';

class Post extends Component {
  static navigationOptions = { title: 'Post', ...navStyles };

  render() {
    const { Post, loading } = this.props;

    if (loading) return null;

    return (
      <View>
        <Text>{this.props.Post.id}</Text>
        <Text>{this.props.Post.title}</Text>
      </View>
    );
  }
}

const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
    }
  }
`;

export default graphql(postQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ navigation }) => ({
    variables: {
      id: navigation.state.params.id
    }
  })
})(Post);
