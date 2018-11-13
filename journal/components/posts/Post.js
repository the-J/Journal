import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Fab, Icon } from 'native-base';

import { graphql } from 'react-apollo';
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
        this.props.navigation.navigate('UpdatePost');
    };

    render() {
        const { Post, loading } = this.props;

        if (loading) return <ActivityIndicator size="large" />;

        return (
            <View style={styles.container}>
                <Text style={styles.bodyText}>{Post.body}</Text>
                <Fab style={styles.newPost} onPress={this.updatePost}>
                    <Icon name="create" />
                </Fab>
            </View>
        );
    }
}

const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      body
    }
  }
`;

export default graphql(postQuery, {
    props: ( { data } ) => ({ ...data }),
    options: ( { navigation } ) => ({
        variables: {
            id: navigation.state.params.id
        }
    })
})(Post);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    bodyText: {
        fontSize: 16
    },
    newPost: {
        backgroundColor: '#00FF00'
    }
});
