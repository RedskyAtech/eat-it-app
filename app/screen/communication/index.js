import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Switch} from 'react-native';
import styles from './style';
import Modal from 'react-native-modal';
import * as colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

export default class confirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isCallEnabled: false,
      isSmsEnabled: false,
    };
  }
  componentDidMount = async () => {
    await this.setState({isVisible: this.props.visible});
  };

  close = async () => {
    await this.props.closeDialog();
    this.props.navigation.navigate('OrderDetail');
  };

  onSubmit = async () => {
    await this.props.closeDialog();
    this.props.navigation.navigate('OrderDetail');
  };

  render() {
    const {
      container,
      column,
      row,
      around_spacing,
      cancel_style,
      button_container,
      bottom_margin,
      vertical_margin,
      dialog_container,
      text_style,
      colored_text,
      button,
      centered_text,
      button_text,
      profile_image,
      between_spacing,
      icons_style,
    } = styles;
    return (
      <Modal
        backdropOpacity={1}
        backdropColor={'grey'}
        isVisible={this.props.visible}
        hasBackdrop={false}>
        <View style={[container, column, around_spacing]}>
          <View style={[dialog_container, vertical_margin, column]}>
            <View style={[row, around_spacing]}>
              <Text style={[text_style, bottom_margin]}>
                Mode of communication
              </Text>
            </View>
            <View style={[row, between_spacing, bottom_margin]}>
              <View style={[row, {alignItems: 'center'}]}>
                <View style={[profile_image, centered_text]}>
                  <Image
                    resizeMode="cover"
                    style={icons_style}
                    source={require('../../assets/phone_yellow.png')}
                  />
                </View>
                <Text style={text_style}>Call</Text>
              </View>
              <Switch
                trackColor={{false: '#FFFFFF', true: '#FFFFFF'}}
                thumbColor={
                  this.state.isCallEnabled
                    ? colors.primaryColor
                    : colors.greyText
                }
                onValueChange={value => {
                  this.setState({isCallEnabled: value, isSmsEnabled: false});
                }}
                value={this.state.isCallEnabled}
                // tintColor={this.state.isSmsEnabled?colors.primaryColor:colors.greyText}
              />
            </View>
            <View style={[row, between_spacing, bottom_margin]}>
              <View style={[row, {alignItems: 'center'}]}>
                <View style={[profile_image, centered_text]}>
                  <Image
                    resizeMode="cover"
                    style={icons_style}
                    source={require('../../assets/email_yellow.png')}
                  />
                </View>
                <Text style={text_style}>SMS</Text>
              </View>
              <Switch
                trackColor={{false: '#FFFFFF', true: '#FFFFFF'}}
                thumbColor={
                  this.state.isSmsEnabled
                    ? colors.primaryColor
                    : colors.greyText
                }
                onValueChange={value => {
                  this.setState({isSmsEnabled: value, isCallEnabled: false});
                }}
                value={this.state.isSmsEnabled}
              />
            </View>
            <View style={[row, button_container]}>
              <TouchableOpacity onPress={() => this.close()}>
                <Text style={cancel_style}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.onSubmit()}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    colors.gradientFirstColor,
                    colors.gradientSecondColor,
                  ]}
                  style={[button, centered_text]}>
                  <Text style={button_text}>Confirm</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
