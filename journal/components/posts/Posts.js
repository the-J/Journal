import React, { Component, Fragment } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Body, Icon, List, ListItem, Right } from 'native-base';

class Posts extends Component {
    goToPost = post => {
        const { navigation } = this.props;

        navigation.navigate('Post', {
            id: post.id,
            title: post.title
        });
    };

    render() {
        const { screenProps } = this.props;

        return (
            <Fragment>
                {screenProps.user.posts.length ? (
                    <List>
                        <FlatList
                            data={screenProps.user.posts}
                            keyExtractor={item => item.id}
                            renderItem={( { item } ) => (
                                <ListItem
                                    style={styles.listText}
                                    onPress={() => this.goToPost(item)}
                                >
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
                ) : (
                    <View style={styles.createNew}>
                        <Text style={styles.createNewText}>No posts</Text>
                    </View>
                )}
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    createNew: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    createNewText: {
        fontSize: 20
    }
});

export default Posts;

