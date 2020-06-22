import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Modal from 'react-native-modal';
import {NavigationActions, StackActions} from 'react-navigation';

export default class shareFood extends Component {
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
    await this.setState({isVisible: !this.state.isVisible});
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'BottomTab'})],
      }),
    );
    await this.props.navigation.navigate('tab1');
  };

  forward = async () => {
    await this.setState({isVisible: !this.state.isVisible});
  };

  render() {
    const {
      container,
      column,
      row,
      arrow,
      forward_container,
      around_spacing,
      cancel_style,
      button_container,
      bottom_margin,
      vertical_margin,
      dialog_container,
      text_style,
    } = styles;
    return (
      <Modal
        backdropOpacity={1}
        backdropColor={'grey'}
        isVisible={this.state.isVisible}
        hasBackdrop={false}>
        <View style={[container, column, around_spacing]}>
          <View style={[dialog_container, vertical_margin, column]}>
            <Text style={[text_style, bottom_margin]}>
              Want to Sale your food or helps other, who needs food.
            </Text>

            <View style={[row, button_container]}>
              <TouchableOpacity onPress={() => this.close()}>
                <Text style={cancel_style}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={1} onPress={() => this.forward()}>
                <View style={forward_container}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/next_button_arrow.png')}
                    style={arrow}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
