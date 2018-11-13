import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PostForm from './PostForm';

import navStyles from '../../styles/navStyles';

class UpdatePost extends Component {
    static navigationOptions = { title: 'Update Post', ...navStyles };

    state = { loading: false };

    updatePost = ( { title, body } ) => {
        this.setState({ loading: true });

        const { updatePost, navigation, screenProps, Post } = this.props;

        if (Post.title === title && Post.body === body) {
            return navigation.navigate('Home');
        }

        updatePost({
            variables: {
                id: this.props.Post.id,
                title,
                body,
                userId: screenProps.user.id
            }
        })
            .then(() => {
                navigation.navigate('Home');
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <View>
                {
                    this.state.loading
                        ? <ActivityIndicator size="large" />
                        : <PostForm onSubmit={this.updatePost} post={this.props.Post} />
                }
            </View>
        );
    }
}

const updatePost = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!, $userId: ID!) {
    updatePost(id: $id, title: $title, body: $body, userId: $userId) {
      id
    }
  }
`;

const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      body
    }
  }
`;

export default compose(
    graphql(updatePost, {
        name: 'updatePost',
        options: {
            refetchQueries: [ 'Post' ]
        }
    }),
    graphql(postQuery, {
        props: ( { data } ) => ({ ...data }),
        options: ( { navigation } ) => ({
            variables: {
                id: navigation.state.params.id
            }
        })
    })
)(UpdatePost);
