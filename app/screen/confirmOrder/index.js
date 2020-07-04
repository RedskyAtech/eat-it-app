import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Modal from 'react-native-modal';
import * as colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

export default class confirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }
  componentDidMount = async () => {
    await this.setState({isVisible: this.props.visible});
  };

  close = async () => {
    await this.props.closeDialog();
    if (this.props.status != 'purchase') {
      await this.props.navigation.navigate('OrderDetail');
    }
  };

  onSubmit = async () => {
    await this.props.onOrderConfirmation();
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
            <View style={row}>
              {this.props.status == 'purchase' ? (
                <Text style={[text_style, bottom_margin]}>
                  Do you really want to place order
                </Text>
              ) : (
                <>
                  <Text style={[text_style, bottom_margin]}>
                    Want to <Text>{this.props.status}</Text> order with id{' '}
                  </Text>
                  <Text style={[text_style, bottom_margin, colored_text]}>
                    #{this.props.orderId}
                  </Text>
                </>
              )}
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
