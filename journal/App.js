import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// Apollo
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import navStyles from './styles/navStyles';

import Post from './Post';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'https://api.graph.cool/simple/v1/cjiy4mzjl242e0157keehyxqf',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

class App extends Component {
  static navigationOptions = { title: 'Home', ...navStyles };

  goToPost = () => this.props.navigation.navigate('Post');

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text> Hello</Text>

          <Button onPress={this.goToPost} title="Go to post page" />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default createStackNavigator({
  Home: {
    screen: App
  },
  Post: {
    screen: Post
  }
});
