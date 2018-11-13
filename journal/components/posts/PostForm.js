import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';

import navStyles from '../../styles/navStyles';

export default class PostForm extends Component {
    static navigationOptions = { title: 'Post', ...navStyles };

    state = {
        title: '',
        body: ''
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

                <Button title="Save Post" onPress={this.submitForm} />
            </Form>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: 100
    }
});
