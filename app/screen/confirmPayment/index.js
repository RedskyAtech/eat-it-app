import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Modal from 'react-native-modal';
import * as colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

export default class confirmPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }
  componentDidMount = async () => {
    await this.setState({isVisible: this.props.visible});
  };

  onSubmit = async () => {
    await this.props.closeDialog();
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
    } = styles;
    return (
      <Modal
        backdropOpacity={1}
        backdropColor={'grey'}
        isVisible={this.props.visible}
        hasBackdrop={false}>
        <View style={[container, column, around_spacing]}>
          <View style={[dialog_container, vertical_margin, column]}>
            <Text style={[text_style, bottom_margin]}>
              Payment submitted successfully
              {/* <Text style={[text_style, bottom_margin, colored_text]}>
                #4509234
              </Text> */}
            </Text>
            <View style={[row, button_container]}>
              <View />
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
                  <Text style={button_text}>Ok</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
