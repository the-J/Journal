import React, { Component } from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';

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
      <View>
        <TextInput
          style={styles.title}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <TextInput
          style={styles.body}
          onChangeText={body => this.setState({ body })}
          value={this.state.body}
        />
        <Button title="Save Post" onPress={this.submitForm} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 10,
    height: 40,
    borderColor: '#333',
    borderWidth: 1
  },
  body: {
    padding: 10,
    height: 100,
    borderColor: '#333',
    borderWidth: 1,
    textAlignVertical: 'top'
  }
});
