import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PostForm from './PostForm';

import navStyles from '../../styles/navStyles';

class UpdatePost extends Component {
    static navigationOptions = { title: 'Update Post', ...navStyles };

    state = { loading: false };

    newPost = ( { title, body } ) => {
        this.setState({ loading: true });

        const { createPost, navigation, screenProps } = this.props;

        createPost({
            variables: {
                title,
                body,
                userId: screenProps.user.id
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
  mutation createPost($title: String!, $body: String!, $userId: ID!) {
    createPost(title: $title, body: $body, userId: $userId) {
      id
    }
  }
`;

// options will refetch named query
export default graphql(newPost, {
    name: 'createPost',
    options: {
        refetchQueries: [ 'userQuery' ]
    }
})(UpdatePost);
