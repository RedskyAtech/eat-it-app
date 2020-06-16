import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import * as utility from '../../utility/index';

export default class messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          name: 'Jain Imam',
          orderCode: '#4523967',
          time: '02:00 pm',
        },
        {
          name: 'Jain Imam',
          orderCode: '#4523982',
          time: '03:00 pm',
        },
        {
          name: 'Jain Imam',
          orderCode: '#4523985',
          time: '06:00 pm',
        },
        {
          name: 'Jain Imam',
          orderCode: '#4523987',
          time: 'Yesterday',
        },
        {
          name: 'Jain Imam',
          orderCode: '#4523987',
          time: 'Yesterday',
        },
        {
          name: 'Jain Imam',
          orderCode: '#4523987',
          time: '12/03/2020',
        },
        {
          name: 'Jain Imam',
          orderCode: '#4523987',
          time: '10/03/2020',
        },
      ],
    };
  }
  componentDidMount() {}
  onBack = async () => {
    this.props.navigation.navigate('tab5');
  };
  onlistItem = async item => {
    this.props.navigation.navigate('ChatScreen', {code: item});
  };
  render() {
    const {
      container,
      column,
      row,
      between_spacing,
      inner_container,
      spacing,
      arrow,
      heading_text,
      horizontal_line,
      list_heading,
      code_style,
      message_style,
      time_style,
      list_padding,
    } = styles;
    return (
      <View style={[container]}>
        <View style={[inner_container, row, between_spacing, spacing]}>
          <TouchableOpacity onPress={this.onBack}>
            <Image
              resizeMode="contain"
              source={require('../../assets/back_arrow.png')}
              style={arrow}
            />
          </TouchableOpacity>
          <Text style={heading_text}>Messages</Text>
          <View>
            <Text> </Text>
          </View>
        </View>

        {this.state.messages.map(message => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => this.onlistItem(message.orderCode)}>
                <View style={[column, inner_container, list_padding]}>
                  <View style={[row, between_spacing]}>
                    <Text style={list_heading}>{message.name}</Text>
                    <Text style={[list_heading, code_style]}>
                      {message.orderCode}
                    </Text>
                  </View>
                  <View style={[row, between_spacing]}>
                    <Text style={message_style}>Hii jain</Text>
                    <Text style={time_style}>{message.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={horizontal_line} />
            </View>
          );
        })}
      </View>
    );
  }
}
