import React, { Component, Fragment } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PostForm from './PostForm';

import navStyles from '../../styles/navStyles';

class NewPost extends Component {
    static navigationOptions = { title: 'Post', ...navStyles };

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
                navigation.navigate('Home');
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Fragment>
                {this.state.loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <PostForm onSubmit={this.newPost} />
                )}
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

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
})(NewPost);
