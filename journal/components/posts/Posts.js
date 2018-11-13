import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Body, Icon, List, ListItem, Right } from 'native-base';

class Posts extends Component {
    render() {
        const { navigation, screenProps } = this.props;

        return (
            <View>
                <List>
                    <FlatList
                        data={screenProps.user.posts}
                        keyExtractor={item => item.id}
                        renderItem={( { item } ) => (
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

export default Posts;

const styles = StyleSheet.create({});
