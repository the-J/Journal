import React, { Component, Fragment } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Body, Icon, List, ListItem, Right } from 'native-base';

class Posts extends Component {
    render() {
        const { navigation, screenProps } = this.props;

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
                                    onPress={() =>
                                        navigation.navigate('Post', {
                                            id: item.id,
                                            title: item.title
                                        })
                                    }
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

export default Posts;

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
