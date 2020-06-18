import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      message: '',
      messages: [
        {
          from: 'other',
          message: 'Hii sir',
          time: '02:30 pm',
        },
        {
          from: 'me',
          message: 'Hii',
          time: '02:32 pm',
        },
        {
          from: 'other',
          message: 'How are you',
          time: '02:35 pm',
        },
        {
          from: 'me',
          message: 'Fine........................... What about you?',
          time: '02:37 pm',
        },
        {
          from: 'other',
          message: 'Shooping',
          time: '02:45 pm',
        },
      ],
    };
  }
  componentDidMount = async () => {
    let code;
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.code) {
        code = this.props.navigation.state.params.code;
      }
      await this.setState({code: code});
    }
  };
  onBack = async () => {
    this.props.navigation.navigate('Messages');
  };
  onMessageChange = async value => {
    await this.setState({message: value});
  };
  onForwardMessage = async () => {
    let joined = this.state.messages.concat({
      from: 'me',
      message: this.state.message,
      time: '02:30 pm',
    });
    await this.setState({messages: joined, message: ''});
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
      message_list,
      message_style,
      time_style,
      right_list,
      bottom_spacing,
      bottom_container,
      top_container,
      search_container,
      around_spacing,
      search_icon,
      search_input,
      next_arrow_container,
      icons,
      list_height,
      triangle,
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
            <Text style={heading_text}>{this.state.code}</Text>
            <View>
              <Text> </Text>
            </View>
          </View>

          <View style={list_height}>
            <ScrollView>
              {this.state.messages.map(message => {
                return (
                  <>
                    <View style={[column]}>
                      <View
                        style={[
                          row,
                          message_list,
                          message.from == 'me' ? right_list : '',
                        ]}>
                        <Text style={message_style}>{message.message}</Text>
                        <Text style={time_style}>{message.time}</Text>
                      </View>
                    </View>
                    {/* <View style={styles.triangle} /> */}
                  </>
                );
              })}
            </ScrollView>
          </View>
        </View>

        <View style={[row, between_spacing, top_container]}>
          <View style={[search_container, row, around_spacing]}>
            <TextInput
              placeholder="Type a message"
              style={search_input}
              onChangeText={message => this.onMessageChange(message)}
              value={this.state.message}
            />
          </View>
          <TouchableOpacity onPress={this.onForwardMessage}>
            <View style={next_arrow_container}>
              <Image
                resizeMode="contain"
                source={require('../../assets/send_icon.png')}
                style={icons}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
