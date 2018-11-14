import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { Fab, Icon } from 'native-base';

import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import navStyles from '../../styles/navStyles';

class Post extends Component {
    static navigationOptions = ( { navigation } ) => {
        return {
            title: navigation.state.params.title,
            ...navStyles
        };
    };

    updatePost = () => {
        const { Post } = this.props;
        this.props.navigation.navigate('UpdatePost', {
            id: Post.id,
            title: Post.title,
            body: Post.body
        });
    };

    deletePost = async () => {
        try {
            const { Post, navigation } = this.props;

            await this.props.deletePost({
                variables: { id: Post.id }
            });

            navigation.navigate('Home');
        } catch (res) {
            console.log(res);
        }
    };

    render() {
        const { Post, loading } = this.props;

        return (
            <Fragment>
                {loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.bodyText}>{Post.body}</Text>

                        <Fab
                            style={styles.deletePost}
                            position="bottomLeft"
                            onPress={() => (Alert.alert(
                                'Delete post?',
                                'Post \'' + Post.title + '\' will be deleted',
                                [
                                    { text: 'cancel', onPress: () => {}},
                                    { text: 'delete', onPress: () => this.deletePost()}
                                ],
                                { cancelable: true }
                            ))}
                        >
                            <Icon name="trash" />
                        </Fab>

                        <Fab
                            style={styles.newPost}
                            onPress={this.updatePost}
                        >
                            <Icon name="create" />
                        </Fab>
                    </View>
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
    },
    container: {
        padding: 20,
        flex: 1
    },
    bodyText: {
        fontSize: 16
    },
    newPost: {
        backgroundColor: '#00FF00'
    },
    deletePost: {
        backgroundColor: 'red'
    }
});

const postQuery = gql`
    query Post($id: ID!) {
        Post(id: $id) {
            id
            title
            body
        }
    }
`;

const deletePost = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`;

export default compose(
    graphql(postQuery, {
        props: ( { data } ) => ({ ...data }),
        options: ( { navigation } ) => ({
            variables: {
                id: navigation.state.params.id
            }
        })
    }),
    graphql(deletePost, {
        name: 'deletePost',
        options: {
            refetchQueries: [ 'userQuery' ]
        }
    })
)(Post);
