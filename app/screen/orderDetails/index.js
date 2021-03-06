import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';
import * as colors from '../../constants/colors';
import ConfirmOrder from '../confirmOrder';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import LikeDislikeFood from '../likeDislikeFood';

export default class orderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: '',
      from: '',
      foodId: '',
      name: '',
      address: '',
      price: 0,
      orderId: '',
      type: '',
      deliveryPrice: 0,
      totalAmount: 0,
      isDialogVisible: false,
      isLikeDislikeDialogVisible: false,
      isLiked: '',
      sellerId: '',
      images: [],
      isVisibleLoading: false,
      isPriceShow: true,
      id: '',
      status: '',
      buttonStatus: '',
      fields: [1, 2, 3, 4],
      firstDigit: '',
      secondDigit: '',
      thirdDigit: '',
      fourthDigit: '',
      selectedField: 0,
      showButtons: false,
      isToday: false,
      otp: '',
    };
  }
  componentDidMount = async () => {
    const token = await utility.getToken('token');
    await this.setState({userToken: token});

    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.from) {
        await this.setState({from: this.props.navigation.state.params.from});
        if (this.state.from == 'orders' || this.state.from == 'myFood') {
          if (this.props.navigation.state.params.orderId) {
            await this.setState({
              id: this.props.navigation.state.params.orderId,
            });
          }
          if (this.props.navigation.state.params.status) {
            await this.setState({
              status: this.props.navigation.state.params.status,
            });
          }
          if (this.props.navigation.state.params.isToday) {
            await this.setState({
              isToday: this.props.navigation.state.params.isToday,
            });
          }
          await this.getOrderDetail();
        }
        if (this.state.from == 'myFood') {
          if (this.props.navigation.state.params.isLiked) {
            await this.setState({
              isLiked: this.props.navigation.state.params.isLiked,
            });
          }
        }
      }
    }
  };

  getOrderDetail = async () => {
    await this.setState({isVisibleLoading: true});
    try {
      let response = Service.getDataApi(
        `orders/${this.state.id}`,
        this.state.userToken,
      );
      response
        .then(res => {
          if (res.data) {
            let deliveryPrice;
            let price;
            console.log('datata:', res.data);
            if (
              res.data.homeDeliveryPrice == '' ||
              res.data.homeDeliveryPrice == undefined ||
              res.data.homeDeliveryPrice == null ||
              res.data.homeDeliveryPrice == 0
            ) {
              deliveryPrice = 0;
            } else {
              deliveryPrice = res.data.homeDeliveryPrice;
            }
            if (
              res.data.price == '' ||
              res.data.price == undefined ||
              res.data.price == null ||
              res.data.price == 0
            ) {
              price = 0;
            } else {
              price = res.data.price;
            }
            this.setState({
              foodId: res.data.foodId,
              sellerId: res.data.sellerId,
              name: res.data.name,
              address: res.data.address,
              price: price,
              orderId: res.data.orderId,
              type: res.data.type,
              deliveryPrice: deliveryPrice,
              totalAmount: price + deliveryPrice,
              images: res.data.images,
              isVisibleLoading: false,
              showButtons: true,
              otp: res.data.otp,
            });
          } else {
            this.setState({isVisibleLoading: false});
            console.log('no data found', res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('error in try-catch', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  showLikeDisLikeDialog = async () => {
    if (this.state.isLiked == 'none') {
      await this.setState({
        isLikeDislikeDialogVisible: true,
      });
    }
  };
  closeLikeDislikeDialog = async () => {
    this.setState({isLikeDislikeDialogVisible: false});
    this.props.navigation.state.params.onRefersh();
    this.props.navigation.goBack();
  };
  onBack = async () => {
    this.props.navigation.goBack();
  };
  get pagination() {
    const {activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={this.state.images.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.dot_style}
        inactiveDotStyle={styles.inactive_dot_styles}
        inactiveDotScale={0.6}
      />
    );
  }
  _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="cover"
        style={styles.images}
        source={{uri: item.url}}
      />
    );
  };
  onSubmit = async from => {
    await this.setState({isDialogVisible: true, buttonStatus: from});
  };
  onOrderConfirmation = async () => {
    this.setState({isVisibleLoading: true});
    let body;
    if (this.state.buttonStatus == 'confirm') {
      body = {
        status: 'confirmed',
      };
    }
    if (this.state.buttonStatus == 'reject') {
      body = {
        status: 'rejected',
      };
    }
    try {
      let response = Service.putDataApi(
        `orders/${this.state.id}`,
        body,
        this.state.userToken,
      );
      response
        .then(res => {
          if (res.data) {
            this.setState({isVisibleLoading: false});
            this.closeDialog();
            if (this.state.buttonStatus == 'reject') {
              alert('Order rejected successfully');
            }
            if (this.state.buttonStatus == 'confirm') {
              alert('Order confirmed successfully');
            }
            this.props.navigation.state.params.refersh();
            this.props.navigation.goBack();
          } else {
            this.setState({isVisibleLoading: false});
            this.closeDialog();
            console.log('no data found', res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          this.closeDialog();
          console.log('error in try-catch', error);
          alert('Something went wrong');
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      this.closeDialog();
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  closeDialog = async () => {
    await this.setState({isDialogVisible: false});
  };
  onChange = async (value, item) => {
    if (item == 1) {
      await this.setState({firstDigit: value, selectedField: item});
      if (value) {
        this.refs.second.focus();
      }
    }
    if (item == 2) {
      await this.setState({secondDigit: value, selectedField: item});
      if (value) {
        this.refs.third.focus();
      }
      0;
    }
    if (item == 3) {
      await this.setState({thirdDigit: value, selectedField: item});
      if (value) {
        this.refs.fourth.focus();
      }
    }
    if (item == 4) {
      await this.setState({fourthDigit: value, selectedField: item});
    }
  };
  onSubmitOtp = async () => {
    let body = {
      otp:
        this.state.firstDigit +
        this.state.secondDigit +
        this.state.thirdDigit +
        this.state.fourthDigit,
    };
    try {
      await this.setState({isVisibleLoading: true});
      let response = Service.putDataApi(
        `orders/${this.state.id}`,
        body,
        this.state.userToken,
      );
      response
        .then(res => {
          if (res.data) {
            this.setState({isVisibleLoading: false});
            alert('Order delivered successfully');
            this.props.navigation.state.params.refersh();
            this.props.navigation.goBack();
          } else {
            this.setState({isVisibleLoading: false});
            console.log('no data found', res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('error in try-catch', error.error);
          if (error.error == 'Error: OTP_DID_NOT_MATCH') {
            alert('Otp did not match');
          } else {
            alert('Something went wrong');
          }
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };

  render() {
    const {
      inner_container,
      button_container,
      content_container_style,
      button_text,
      centered_text,
      scroll_container,
      colored_text,
      timing_heading_style,
      non_veg_icon,
      type_text,
      price,
      address_style,
      bottom_spacing,
      product_name,
      detail_container,
      bottom_container,
      spacing,
      row,
      free_text,
      arrow,
      heading_text,
      between_spacing,
      type_icon,
      veg_icon,
      top_spacing,
      langar_icon,
      id_heading,
      loader,
      column,
      otp_fields,
      otp_input_box,
      background_theme_color,
      otp_container,
      text_style,
      otp_card,
      otp_text,
      rating_button_container,
    } = styles;
    return (
      <View>
        <View style={[inner_container, row, between_spacing, spacing]}>
          <TouchableOpacity onPress={this.onBack}>
            <Image
              resizeMode="contain"
              source={require('../../assets/back_arrow.png')}
              style={arrow}
            />
          </TouchableOpacity>
          <Text style={heading_text}>Order detail</Text>
          <View>
            <Text> </Text>
          </View>
        </View>

        <Carousel
          layout={'default'}
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.images}
          renderItem={this._renderItem}
          sliderWidth={wp(85)}
          itemWidth={wp(85)}
          autoplay={true}
          onSnapToItem={index => this.setState({activeSlide: index})}
          containerCustomStyle={scroll_container}
          contentContainerStyle={content_container_style}
        />
        {this.pagination}

        <View style={[detail_container]}>
          <View
            style={
              this.state.images.length == 1
                ? [row, bottom_spacing, top_spacing]
                : [row, bottom_spacing]
            }>
            <Text style={id_heading}>Order id : </Text>
            <Text style={[id_heading, colored_text]}>
              #{this.state.orderId}
            </Text>
          </View>
          <View style={[row, between_spacing, bottom_spacing]}>
            <Text style={product_name}>{this.state.name}</Text>
          </View>

          <Text style={[address_style, bottom_spacing]}>
            {this.state.address}
          </Text>

          <View style={[row, between_spacing, bottom_spacing]}>
            {!this.state.isPriceShow ? (
              <View />
            ) : this.state.type == 'langar' ? (
              <View />
            ) : this.state.price == 0 ? (
              <Text style={[price, free_text]}>Free</Text>
            ) : (
              <Text style={[price, colored_text]}>Rs {this.state.price}</Text>
            )}
            <View style={[row, {alignItems: 'center'}]}>
              <View
                style={
                  this.state.type == ''
                    ? ''
                    : this.state.type == 'veg'
                    ? [type_icon, veg_icon]
                    : this.state.type == 'langar'
                    ? [type_icon, langar_icon]
                    : [type_icon, non_veg_icon]
                }
              />
              <Text style={type_text}>{this.state.type}</Text>
            </View>
          </View>

          <View style={[row, bottom_spacing]}>
            <Text style={timing_heading_style}>Delivery Charges : </Text>
            <Text style={address_style}>
              Rs{' '}
              {this.state.deliveryPrice == '' ||
              this.state.deliveryPrice == undefined
                ? '0'
                : this.state.deliveryPrice}
            </Text>
          </View>

          <View style={[row, bottom_spacing]}>
            <Text style={timing_heading_style}>Total payable amount : </Text>
            <Text style={[address_style, colored_text]}>
              Rs {this.state.totalAmount}
            </Text>
          </View>

          {this.state.from == 'orders' ? (
            !this.state.showButtons || !this.state.isToday ? (
              <View />
            ) : (
              <>
                {this.state.status == 'confirmed' ? (
                  <View style={[column, otp_container]}>
                    <View style={[row, centered_text]}>
                      <Text style={[colored_text, text_style]}>
                        Enter four digit OTP for confirmation.
                      </Text>
                    </View>
                    <View style={[row, otp_fields, between_spacing]}>
                      {this.state.fields.map(item => {
                        return (
                          <TextInput
                            style={
                              this.state.selectedField >= item
                                ? [otp_input_box, background_theme_color]
                                : otp_input_box
                            }
                            maxLength={1}
                            ref={
                              item == 1
                                ? 'first'
                                : item == 2
                                ? 'second'
                                : item == 3
                                ? 'third'
                                : 'fourth'
                            }
                            keyboardType="numeric"
                            onChangeText={value => this.onChange(value, item)}
                          />
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={this.onSubmitOtp}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={[
                          colors.gradientFirstColor,
                          colors.gradientSecondColor,
                        ]}
                        style={[
                          button_container,
                          centered_text,
                          {alignSelf: 'center', marginTop: hp(0)},
                        ]}>
                        <Text style={button_text}>Submit</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={[bottom_container, bottom_spacing]}>
                    {this.state.status == 'rejected' ||
                    this.state.status == 'delivered' ? (
                      <View />
                    ) : (
                      <>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => this.onSubmit('reject')}>
                          <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={[
                              colors.gradientFirstColor,
                              colors.gradientSecondColor,
                            ]}
                            style={[button_container, centered_text]}>
                            <Text style={button_text}>Reject</Text>
                          </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => this.onSubmit('confirm')}>
                          <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={[
                              colors.gradientFirstColor,
                              colors.gradientSecondColor,
                            ]}
                            style={[button_container, centered_text]}>
                            <Text style={button_text}>Confirm</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                )}
              </>
            )
          ) : this.state.from == 'myFood' ? (
            !this.state.showButtons ? (
              <View />
            ) : (
              <>
                {this.state.status == 'confirmed' ? (
                  this.state.isToday ? (
                    <LinearGradient
                      start={this.state.isProfile ? {x: 0, y: 1} : {x: 0, y: 0}}
                      end={this.state.isProfile ? {x: 0, y: 0} : {x: 1, y: 0}}
                      colors={[
                        colors.gradientFirstColor,
                        colors.gradientSecondColor,
                      ]}
                      style={[otp_card, centered_text]}>
                      <Text style={otp_text}>
                        Your confirmation otp is {this.state.otp}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <View />
                  )
                ) : this.state.status == 'delivered' &&
                  this.state.isLiked == 'none' ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.showLikeDisLikeDialog}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={[
                        colors.gradientFirstColor,
                        colors.gradientSecondColor,
                      ]}
                      style={[rating_button_container, centered_text]}>
                      <Text style={button_text}>Rate your experience</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </>
            )
          ) : (
            <View />
          )}
          {this.state.isDialogVisible ? (
            <ConfirmOrder
              visible={this.state.isDialogVisible}
              closeDialog={this.closeDialog}
              onOrderConfirmation={this.onOrderConfirmation}
              orderId={this.state.orderId}
              status={this.state.buttonStatus}
            />
          ) : (
            <View />
          )}
          <View style={loader}>
            <ActivityIndicator
              animating={this.state.isVisibleLoading}
              size="large"
              color={colors.primaryColor}
            />
          </View>
        </View>
        {this.state.isLikeDislikeDialogVisible ? (
          <LikeDislikeFood
            visible={this.state.isLikeDislikeDialogVisible}
            closeDialog={this.closeLikeDislikeDialog}
            orderId={this.state.id}
            foodId={this.state.foodId}
            sellerId={this.state.sellerId}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}
