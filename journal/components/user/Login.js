import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { withApollo } from 'react-apollo';

import CreateUser from './CreateUser';
import LoginUser from './LoginUser';

class Login extends Component {
    state = { register: true };

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.register
                        ? <CreateUser {...this.props} />
                        : <LoginUser {...this.props} />
                }

                <View style={styles.button}>
                    <Button
                        title={this.state.register ? 'Login' : 'Register'}
                        onPress={() => this.setState({ register: !this.state.register })}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        width: '100%',
        marginTop: 20
    },
    button: {
        width: '90%',
        margin: 10
    }
});

export default withApollo(Login);
