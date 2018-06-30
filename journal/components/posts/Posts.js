import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Posts extends Component {
  render() {
    const { loading, allPosts, navigation } = this.props;

    if (loading) return <ActivityIndicator size="large" />;

    return (
      <View>
        <FlatList
          data={allPosts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Text
              style={styles.listText}
              onPress={() =>
                navigation.navigate('Post', {
                  id: item.id,
                  title: item.title
                })
              }>
              {item.title}
            </Text>
          )}
        />
      </View>
    );
  }
}

// this query need to be named so it
//  will be refetched after form onSubmit()
const postsQuery = gql`
  query postsQuery {
    allPosts {
      id
      title
    }
  }
`;

export default graphql(postsQuery, {
  props: ({ data }) => ({ ...data })
})(Posts);

const styles = StyleSheet.create({
  listText: {
    paddingTop: 30,
    flex: 1,
    fontSize: 40
  }
});
