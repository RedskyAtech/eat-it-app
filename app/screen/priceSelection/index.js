import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Modal from 'react-native-modal';
import {Slider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';

export default class priceSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      value: 10,
    };
  }
  componentDidMount = async () => {
    await this.setState({isVisible: this.props.visible});
  };

  close = async () => {
    this.props.closeDialog();
  };

  onSubmit = async () => {
    // this.props.deliveryPrice = this.state.value;
    this.props.closeDialog();
  };
  onChange(value) {
    if(this.props.from=='price'){
     this.props.onPriceChange(value)
    }else{
      this.props.ondeliveryPriceChange(value);
    }
    this.setState({value: value});
  }
  render() {
    const {
      column,
      row,
      bottom_margin,
      vertical_margin,
      dialog_container,
      text_style,
      button,
      centered_text,
      button_text,
      progress_bar,
      thumb_style,
      between_spacing,
      km_text,
      percentage,
    } = styles;
    return (
      <Modal
        backdropOpacity={1}
        backdropColor={'grey'}
        isVisible={this.props.visible}
        hasBackdrop={false}>
        <View style={[dialog_container, vertical_margin, column]}>
          <Text style={[text_style, bottom_margin]}>
            {this.props.from == 'price'
              ? 'Set your dish price.'
              : 'Set your delivery price.'}
          </Text>
          <Slider
            value={this.state.value}
            thumbTintColor={'#FFBA09'}
            maximumTrackTintColor={'grey'}
            minimumTrackTintColor={'#FFBA09'}
            minimumValue={0}
            maximumValue={500}
            trackStyle={progress_bar}
            thumbStyle={thumb_style}
            onValueChange={value => this.onChange(value)}
            // onValueChange={value => {
            //   this.props.ondeliveryPriceChange(value),
            //     this.setState({value: value});
            // }}
          />
          <View style={[row, between_spacing]}>
            <Text style={km_text}>Rs 0</Text>
            <Text style={[km_text, percentage]}>
              Rs {this.state.value.toFixed(0)}
            </Text>
            <Text style={km_text}>Rs 500</Text>
          </View>

          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            activeOpacity={0.7}
            onPress={() => this.onSubmit()}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
              style={[button, centered_text]}>
              <Text style={button_text}>Done</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
