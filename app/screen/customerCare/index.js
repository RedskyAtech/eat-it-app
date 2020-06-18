import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';

export default class customerCare extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onBack = async () => {
    await this.props.navigation.navigate('tab5');
  };

  render() {
    const {
      container,
      column,
      list_height,
      row,
      between_spacing,
      inner_container,
      spacing,
      arrow,
      heading_text,
      content_container,
      bottom_margin,
      list_headings,
    } = styles;
    return (
      <View style={[container, column, between_spacing]}>
        <View>
          <View style={[inner_container, row, between_spacing, spacing]}>
            <TouchableOpacity onPress={this.onBack}>
              <Image
                resizeMode="contain"
                source={require('../../assets/back_arrow.png')}
                style={arrow}
              />
            </TouchableOpacity>
            <Text style={heading_text}>Customer care</Text>
            <View>
              <Text> </Text>
            </View>
          </View>

          <View style={[list_height, column, content_container, bottom_margin]}>
            <View style={[row, bottom_margin]}>
              <Text style={list_headings}>Email : </Text>
              <Text>eatit123@gmail.com</Text>
            </View>
            <View style={row}>
              <Text style={list_headings}>Phone : </Text>
              <Text>9340236745</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
