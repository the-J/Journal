import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';

import navStyles from '../../styles/navStyles';

export default class PostForm extends Component {
    static navigationOptions = { title: 'Post', ...navStyles };

    static defaultProps = {
        post: {}
    };

    state = {
        title: this.props.post.title || '',
        body: this.props.post.body || ''
    };

    submitForm = () => {
        this.props.onSubmit({
            title: this.state.title,
            body: this.state.body
        });
    };

    render() {
        return (
            <Form>
                <Item floatingLabel>
                    <Label>Title</Label>

                    <Input
                        onChangeText={title => this.setState({ title })}
                        value={this.state.title}
                    />
                </Item>

                <Item floatingLabel>
                    <Label>Body</Label>

                    <Input
                        multiline
                        style={styles.body}
                        onChangeText={body => this.setState({ body })}
                        value={this.state.body}
                    />
                </Item>

                <View style={styles.button}>
                    <Button title="Save Post" onPress={this.submitForm} />
                </View>
            </Form>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: 100
    },
    button: {
        width: '90%',
        marginLeft: '5%'
    }
});
