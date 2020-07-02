import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import styles from './style';

export default class addAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = async () => {};

  render() {
    const {container, column, row, between_spacing} = styles;
    return (
      <View styles={container}>
        <Text>jfghfjkhg</Text>
      </View>
    );
  }
}
