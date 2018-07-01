import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import UserForm from './UserForm';

import { signIn } from '../../utils/util-login';

class CreateUser extends Component {
  createUser = async ({ email, password }) => {
    try {
      const user = await this.props.createUser({
        variables: { email, password }
      });

      const signin = await this.props.signinUser({
        variables: { email, password }
      });

      signIn(signin.data.signinUser.token);
    } catch (err) {
      console.error('createUser err', err);
    }
  };

  render() {
    return (
      <View>
        <Text>Register</Text>
        <UserForm type="Register" onSubmit={this.createUser} />
      </View>
    );
  }
}

const createUser = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
  }
`;

export default graphql(createUser, { name: 'createUser' })(CreateUser);
