import React, { Component } from 'react';
import { View } from 'react-native';

import UserForm from './UserForm';

export default class LoginUser extends Component {
  loginUser = () => {
    console.log('login');
  };

  render() {
    return (
      <View>
        <UserForm type="Login" onSubmit={this.loginUser} />
      </View>
    );
  }
}
