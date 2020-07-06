import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import styles from './style';
import SocketIOClient from 'socket.io-client';

export default class messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          name: 'Zain Imam',
          orderCode: '#4523967',
          time: '02:00 pm',
        },
        {
          name: 'Zain Imam',
          orderCode: '#4523982',
          time: '03:00 pm',
        },
        {
          name: 'Zain Imam',
          orderCode: '#4523985',
          time: '06:00 pm',
        },
        {
          name: 'Zain Imam',
          orderCode: '#4523987',
          time: 'Yesterday',
        },
        {
          name: 'Zain Imam',
          orderCode: '#4523987',
          time: 'Yesterday',
        },
        {
          name: 'Zain Imam',
          orderCode: '#4523987',
          time: '12/03/2020',
        },
        {
          name: 'Zain Imam',
          orderCode: '#4523987',
          time: '10/03/2020',
        },
      ],
    };
    this.socket = SocketIOClient('http://localhost:6600');
  }
  componentDidMount() {
    var currentRoom = 'meenu' + '-' + 'zain';
    var reverseRoom = 'zain' + '-' + 'meenu';
    this.socket.emit('set-room', {name1: currentRoom, name2: reverseRoom});
  }
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
      phone_icon,
      centered_text,
      list_container,
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
              <View style={[row, centered_text]}>
                <TouchableOpacity
                  onPress={() => this.onlistItem(message.orderCode)}>
                  <View style={[column, list_container, list_padding]}>
                    <View style={[row, between_spacing]}>
                      <Text style={list_heading}>{message.name}</Text>
                      <Text style={[list_heading, code_style]}>
                        {message.orderCode}
                      </Text>
                    </View>

                    <View style={[row, between_spacing]}>
                      <Text style={message_style}>Hii sir</Text>
                      <Text style={time_style}>{message.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('tel:9992240889');
                  }}>
                  <Image
                    source={require('../../assets/phone.png')}
                    style={phone_icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('sms:9992240889?body=Hii');
                  }}>
                  <Image
                    source={require('../../assets/email.png')}
                    style={phone_icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={horizontal_line} />
            </View>
          );
        })}
      </View>
    );
  }
}
