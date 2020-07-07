import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import {RadioButton} from 'react-native-paper';
import * as colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';

export default class likeDislikeFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'Yummy',
      like: false,
      dislike: false,
      isVisible: false,
      starOne: false,
      starTwo: false,
      starThree: false,
      starFour: false,
      starFive: false,
      foodId: '',
      orderId: '',
      userToken: '',
      rating: false,
      sellerId: '',
      paymentId: '',
      ratings: [1, 2, 3, 4, 5],
      status: [
        {
          name: 'Yummy',
        },
        {
          name: 'Delicious',
        },
        {
          name: 'Tasty',
        },
      ],
      selectedRating: 0,
    };
  }
  componentDidMount = async () => {
    let userToken = await utility.getToken('token');
    await this.setState({
      isVisible: this.props.visible,
      foodId: this.props.foodId,
      orderId: this.props.orderId,
      userToken: userToken,
      sellerId: this.props.sellerId,
    });
  };
  onLike = async () => {
    await this.setState({like: !this.state.like, dislike: false});
  };
  onSubmit = async () => {
    let status = this.state.checked.toLowerCase();
    let body;
    if (this.state.like) {
      if (this.state.selectedRating == 0) {
        body = {
          foodId: this.state.foodId,
          orderId: this.state.orderId,
          type: 'like',
          status: status,
        };
      } else {
        body = {
          foodId: this.state.foodId,
          orderId: this.state.orderId,
          type: 'like',
          status: status,
          ratingNo: this.state.selectedRating,
          sellerId: this.state.sellerId,
        };
      }
    }
    if (this.state.dislike) {
      body = {
        foodId: this.state.foodId,
        orderId: this.state.orderId,
        type: 'dislike',
      };
    }
    try {
      let response = Service.postDataApi(
        Url.ADD_FAVOURITES,
        body,
        this.state.userToken,
      );
      response
        .then(res => {
          if (res.data) {
            this.setState({selectedRating: 0});
            this.props.closeDialog();
            if (this.state.dislike) {
              alert('Dislike successfully');
            }
            if (this.state.like) {
              alert('Liked successfully');
            }
          } else {
            alert(res.error);
          }
        })
        .catch(error => {
          alert(error.error);
          console.log('errorrr:', error.error);
        });
    } catch (err) {
      alert('try:', err);
    }
  };
  onDisLike = async () => {
    await this.setState({dislike: !this.state.dislike, like: false});
    await this.onSubmit();
  };
  close = async () => {
    this.props.closeDialog();
  };
  onRating = async value => {
    await this.setState({selectedRating: value});
  };
  render() {
    const {
      container,
      column,
      row,
      like_container,
      button,
      centered_text,
      cancel_style,
      button_container,
      button_text,
      radio_button_list,
      star_container,
      radio_text_selected,
      radio_text_unselected,
      row_centered,
      bottom_margin,
      vertical_margin,
      like_icon,
      dialog_container,
      text_style,
      around_spacing,
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
              Want to like or dislike food ?
            </Text>

            <View style={[row, like_container, bottom_margin]}>
              <TouchableOpacity onPress={this.onLike}>
                <Image
                  resizeMode="stretch"
                  source={
                    this.state.like
                      ? require('../../assets/like.png')
                      : require('../../assets/like_blank.png')
                  }
                  style={like_icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onDisLike}>
                <Image
                  resizeMode="stretch"
                  source={
                    this.state.dislike
                      ? require('../../assets/dislike.png')
                      : require('../../assets/dislike_blank.png')
                  }
                  style={like_icon}
                />
              </TouchableOpacity>
            </View>
            {this.state.like == true ? (
              <>
                <View style={[row, bottom_margin, radio_button_list]}>
                  {this.state.status.map(value => {
                    return (
                      <View style={[row, row_centered]}>
                        <RadioButton
                          value={value.name}
                          color={colors.primaryColor}
                          uncheckedColor={colors.greyText}
                          status={
                            this.state.checked === value.name
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            this.setState({checked: value.name});
                          }}
                        />
                        <Text
                          style={
                            this.state.checked == value.name
                              ? radio_text_selected
                              : radio_text_unselected
                          }>
                          {value.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                <View style={[row, bottom_margin, star_container]}>
                  {this.state.ratings.map(value => {
                    let index = this.state.ratings.indexOf(value);
                    return (
                      <TouchableOpacity onPress={() => this.onRating(value)}>
                        <Image
                          resizeMode="stretch"
                          source={
                            this.state.selectedRating < index + 1
                              ? require('../../assets/star_unselected.png')
                              : require('../../assets/star.png')
                          }
                          style={like_icon}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View
                  style={[
                    row,
                    bottom_margin,
                    button_container,
                    {alignItems: 'center'},
                  ]}>
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
                      <Text style={button_text}>Done</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View />
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
