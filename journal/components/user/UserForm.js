import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';

export default class UserForm extends Component {
    state = {
        email: '',
        password: ''
    };

    submitForm = () => {
        const { email, password } = this.state;

        this.props.onSubmit({
            email,
            password
        });
    };

    render() {
        return (
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>

                    <Input
                        keyboardType="email-address"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                </Item>

                <Item floatingLabel>
                    <Label>Password</Label>

                    <Input
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                </Item>

                <Button
                    style={styles.button}
                    title={this.props.type}
                    onPress={this.submitForm}
                />
            </Form>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: 100
    }
});
