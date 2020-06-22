import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardOffset: 0,
      code: '',
      message: '',
      height: hp(82),
      iskeyboard: false,
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
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    let code;
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.code) {
        code = this.props.navigation.state.params.code;
      }
      await this.setState({code: code});
    }
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow = async event => {
    let value = event.endCoordinates.height;
    await this.setState({keyboardOffset: value, iskeyboard: true});
  };
  _keyboardDidHide = async () => {
    await this.setState({keyboardOffset: 0, iskeyboard: false});
  };

  onBack = async () => {
    this.props.navigation.navigate('Messages');
  };
  onMessageChange = async value => {
    await this.setState({message: value});
  };
  onForwardMessage = async () => {
    if (this.state.message != '') {
      let joined = this.state.messages.concat({
        from: 'me',
        message: this.state.message,
        time: '02:30 pm',
      });
      await this.setState({messages: joined, message: ''});
    }
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
      top_container,
      search_container,
      around_spacing,
      search_input,
      next_arrow_container,
      icons,
      list_height,
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

          <View
            style={this.state.iskeyboard ? {height: hp(50)} : {height: hp(82)}}>
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
                  </>
                );
              })}
            </ScrollView>
          </View>
        </View>

        <View
          style={[
            row,
            between_spacing,
            top_container,
            {position: 'absolute', bottom: this.state.keyboardOffset},
          ]}>
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
