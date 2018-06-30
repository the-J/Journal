import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { List, ListItem, Body, Right, Icon } from 'native-base';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Posts extends Component {
  render() {
    const { loading, allPosts, navigation } = this.props;

    if (loading) return <ActivityIndicator size="large" />;

    return (
      <View>
        <List>
          <FlatList
            data={allPosts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                style={styles.listText}
                onPress={() =>
                  navigation.navigate('Post', {
                    id: item.id,
                    title: item.title
                  })
                }>
                <Body>
                  <Text>{item.title}</Text>
                </Body>

                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
          />
        </List>
      </View>
    );
  }
}

// this query need to be named so it
//  will be refetched after form onSubmit()
const postsQuery = gql`
  query postsQuery {
    allPosts(orderBy: createdAt_ASC) {
      id
      title
    }
  }
`;

export default graphql(postsQuery, {
  props: ({ data }) => ({ ...data })
})(Posts);

const styles = StyleSheet.create({});
