import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';

export default class UserForm extends Component {
    state = {
        email: '',
        password: '',

        errorEmail: '',
        errorPass: ''
    };

    submitForm = () => {
        const { email, password } = this.state;

        if (!email) this.setState({ errorEmail: 'Email is required' });
        if (!password) this.setState({ errorPass: 'Password is required' });

        if (!email || !password) return;

        this.props.onSubmit({
            email,
            password
        });
    };

    onTextChange = e => {
        const key = Object.keys(e)[ 0 ];
        const value = Object.values(e)[ 0 ];

        if (key === 'email') {
            this.setState({
                email: value,
                errorEmail: ''
            });
        }

        if (key === 'password') {
            this.setState({
                password: value,
                errorPass: ''
            });
        }
    };

    render() {
        return (
            <Form>
                {this.props.errors ? <Text style={styles.error}>{this.props.errors[ 0 ]}</Text> : null}

                <Item floatingLabel>
                    <Label>Email</Label>

                    <Input
                        keyboardType="email-address"
                        onChangeText={email => this.onTextChange({ email: email })}
                        value={this.state.email}
                    />
                </Item>

                {this.state.errorEmail ? <Text style={styles.error}>{this.state.errorEmail}</Text> : null}

                <Item floatingLabel>
                    <Label>Password</Label>

                    <Input
                        secureTextEntry
                        onChangeText={password => this.onTextChange({ password: password })}
                        value={this.state.password}
                    />
                </Item>

                {this.state.errorPass ? <Text style={styles.error}>{this.state.errorPass}</Text> : null}

                <View style={styles.button}>
                    <Button
                        title={this.props.type}
                        onPress={this.submitForm}
                    />
                </View>
            </Form>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        margin: 10
    },
    error: {
        color: 'red'
    }
});
