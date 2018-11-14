import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { withApollo } from 'react-apollo';

import CreateUser from './CreateUser';
import LoginUser from './LoginUser';

class Login extends Component {
    state = {
        register: true,
        loading: false
    };

    loading = bool => this.setState({ loading: bool });

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.header}>{this.state.register ? 'Register' : 'Login'}</Text>

                {
                    this.state.register
                        ? <CreateUser {...this.props} loading={bool => this.loading(bool)} />
                        : <LoginUser {...this.props} loading={bool => this.loading(bool)} />
                }

                <View style={styles.verticalLine} />

                <View style={styles.button}>
                    <Button
                        loading={this.state.loading}
                        title={this.state.register ? 'Login' : 'Register'}
                        onPress={() => this.setState({ register: !this.state.register })}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        justifyContent: 'center',
        width: '100%',
        padding: '5%',
        marginTop: 20
    },
    header: {
        color: 'grey'
    },
    verticalLine: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        marginLeft: '5%',
        width: '90%'
    },
    button: {
        width: '90%',
        margin: '5%'
    }
});

export default withApollo(Login);
