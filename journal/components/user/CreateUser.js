import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import UserForm from './UserForm';

class CreateUser extends Component {
  createUser = async ({ email, password }) => {
    console.log(email, password, typeof email, typeof password);

    try {
      const user = await this.props.createUser({
        variables: { email, password }
      });

      const signin = await this.props.signinUser({
        variables: { email, password }
      });

      console.log(signin.data.signinUser.token);
    } catch (err) {
      console.error('error from createuser', err);
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

const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default compose(
  graphql(signinUser, { name: 'signinUser' }),
  graphql(createUser, { name: 'createUser' })
)(CreateUser);
