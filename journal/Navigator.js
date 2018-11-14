import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Fab, Icon } from 'native-base';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { signOut } from './utils/util-login.js';

import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import UpdatePost from './components/posts/UpdatePost';
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
                <Button
                    onPress={() => {
                        signOut();
                        this.props.client.resetStore();
                    }}
                    title='Logout'
                />
                <Fab style={styles.newPost} onPress={this.newPost}>
                    <Icon name="create" />
                </Fab>
            </View>
        );
    }
}

const Navigator = createStackNavigator({
    Home: {
        screen: withApollo(Home)
    },
    Post: {
        screen: Post
    },
    NewPost: {
        screen: NewPost
    },
    UpdatePost: {
        screen: UpdatePost
    }
});

const NavWrapper = ( { loading, user } ) => {
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
    props: ( { data } ) => ({ ...data })
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
