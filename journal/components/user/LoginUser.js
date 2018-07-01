import React, { Component } from 'react';
import { View } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import UserForm from './UserForm';

class LoginUser extends Component {
  loginUser = async ({ email, password }) => {
    console.log('signin');
    try {
      const signin = await this.props.signinUser({
        variables: { email, password }
      });

      console.log(signin.data.signinUser.token);
    } catch (err) {
      console.error('loginUser err:', err);
    }
  };

  render() {
    return (
      <View>
        <UserForm type="Login" onSubmit={this.loginUser} />
      </View>
    );
  }
}

const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default graphql(signinUser, { name: 'signinUser' })(LoginUser);