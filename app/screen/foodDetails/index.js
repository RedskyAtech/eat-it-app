import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {widthPercentageToDP as wp} from '../../utility/index';
import * as colors from '../../constants/colors';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import {NavigationActions, StackActions} from 'react-navigation';
import {WebView} from 'react-native-webview';
import ConfirmPayment from '../confirmPayment';

export default class foodDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      foodId: '',
      name: '',
      address: '',
      price: 0,
      type: '',
      cookingTime: '',
      pickupTime: {
        from: '',
        to: '',
      },
      deliveryPrice: 0,
      totalAmount: 0,
      images: [],
      isVisibleLoading: false,
      isPriceShow: false,
      userId: '',
      sellerId: '',
      isSeller: true,
      // isSeller: false,
      isSkipped: false,
      showModal: false,
      status: 'pending',
      paypalToken: '',
      paymentId: '',
      isDialogVisible: false,
      userToken: '',
    };
  }
  componentDidMount = async () => {
    let foodId;
    let from;
    let isSkipped = await utility.getItem('isSkipped');
    const userId = await utility.getItem('userId');
    const token = await utility.getItem('token');

    await this.setState({
      isSkipped: isSkipped,
      userId: userId,
      userToken: token,
    });

    if (this.props.navigation.state.params) {
      if (
        this.props.navigation.state.params.from == 'home' ||
        this.props.navigation.state.params.from == 'search'
      ) {
        from = this.props.navigation.state.params.from;
        if (this.props.navigation.state.params.foodId) {
          foodId = this.props.navigation.state.params.foodId;
        }
        await this.setState({foodId: foodId, from: from});
        await this.getFoodDetail();
      } else {
        await this.setState({
          from: 'notification',
          name: 'Pasta',
          address: 'Mohali, Chandigarh',
          price: 100,
          type: 'veg',
          cookingTime: '02:30 pm',
          pickupTime: {
            from: '03:30 pm',
            to: '07:30 pm',
          },
          deliveryPrice: 10,
          totalAmount: 110,
          images: [
            {
              url: require('../../assets/burger.jpg'),
            },
          ],
        });
      }
    }
  };

  getFoodDetail = async () => {
    await this.setState({isVisibleLoading: true});
    try {
      let response = Service.getDataApi(`foods/${this.state.foodId}`, '');
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
              name: res.data.name,
              address: res.data.address,
              price: price,
              type: res.data.type,
              cookingTime: res.data.cookingTime,
              pickupTime: {
                from: res.data.pickupTime.from,
                to: res.data.pickupTime.to,
              },
              deliveryPrice: deliveryPrice,
              totalAmount: deliveryPrice + price,
              images: res.data.images,
              sellerId: res.data.userId,
            });
            if (this.state.userId == this.state.sellerId) {
              this.setState({isSeller: true});
            } else {
              this.setState({isSeller: false});
            }
            this.setState({isVisibleLoading: false, isPriceShow: true});
          } else {
            this.setState({isVisibleLoading: false});
            console.log('no data found:', res.error);
            // alert(res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('try-catch error:', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };

  onBack = async () => {
    if (this.state.from == 'home') {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'BottomTab'})],
        }),
      );
      await this.props.navigation.navigate('tab1');
    } else if (this.state.from == 'search') {
      await this.props.navigation.navigate('SearchName');
    } else {
      this.props.navigation.navigate('Notifications');
    }
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
        source={this.state.from == 'home' ? {uri: item.url} : item.url}
      />
    );
  };
  onBuy = async () => {
    await this.onGetToken();
    // await this.props.navigation.navigate('Payment');
  };
  onAlert = async () => {
    await utility.showAlert('Please login or register first.', this.onLogin);
  };
  onLogin = async () => {
    await this.props.navigation.navigate('Login');
  };
  handelResponse = async data => {
    if (data.title == 'success') {
      await this.onOrderFood();
      // await this.setState({
      //   showModal: false,
      //   isDialogVisible: true,
      //   status: 'completed',
      // });
    } else if (data.title == 'cancel') {
      await this.setState({showModal: false, status: 'cancelled'});
    } else {
      return;
    }
  };
  onOrderFood = async () => {
    await this.setState({isVisibleLoading: true});
    try {
      let body = {
        foodId: this.state.foodId,
        paymentId: this.state.paymentId,
      };
      let response = Service.postDataApi(`orders`, body, this.state.userToken);
      response
        .then(res => {
          if (res.data) {
            console.log('place order ::', res.data);
            this.setState({
              showModal: false,
              isDialogVisible: true,
              status: 'completed',
              isVisibleLoading: false,
            });
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('try-catch error:', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  onGetToken = async () => {
    await this.setState({isVisibleLoading: true});
    try {
      let response = Service.postPaymentDataApi(
        'payments/token',
        '',
        '',
        'token',
      );
      response
        .then(res => {
          if (res.data) {
            if (res.isSuccess == true) {
              this.setState({isVisibleLoading: false});
              console.log('tokennnnnnnnnnn:', res.data.access_token);
              this.setState({paypalToken: res.data.access_token});
              this.onPayment();
            }
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
  onPayment = async () => {
    await this.setState({isVisibleLoading: true});

    var body = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `http://192.168.43.151:6600/api/payments/success?access_token=${
          this.state.paypalToken
        }&&userId=${this.state.userId}&&foodId=${this.state.foodId}`,
        cancel_url: 'http://192.168.43.151:6600/api/payments/cancel',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: this.state.name,
                sku: 'item',
                price: this.state.totalAmount,
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: this.state.totalAmount,
          },
          description: 'This is the payment description.',
        },
      ],
    };
    try {
      let response = Service.postPaymentDataApi(
        `payments/payment?access_token=${this.state.paypalToken}`,
        body,
        '',
        'payment',
      );
      response
        .then(res => {
          if (res.data) {
            if (res.isSuccess == true) {
              this.setState({
                paymentId: res.data.id,
                approvalUrl: res.data.href,
                showModal: true,
                isVisibleLoading: false,
              });
              console.log('urlllll:', res.data);
            }
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
  closeDialog = async () => {
    await this.setState({isDialogVisible: false});
    await this.props.navigation.navigate('tab1');
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
      like_icon,
      product_name,
      detail_container,
      bottom_container,
      spacing,
      row,
      arrow,
      heading_text,
      between_spacing,
      type_icon,
      veg_icon,
      top_spacing,
      langar_icon,
      free_text,
      loader,
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
          <Text style={heading_text}>Food detail</Text>
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
                ? [row, between_spacing, bottom_spacing, top_spacing]
                : [row, between_spacing, bottom_spacing]
            }>
            <Text style={product_name}>{this.state.name}</Text>
            <Image
              resizeMode="cover"
              style={like_icon}
              source={require('../../assets/heart_fill.png')}
            />
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
            <Text style={timing_heading_style}>Cooking time : </Text>
            <Text style={address_style}>{this.state.cookingTime}</Text>
          </View>
          <View style={[row, bottom_spacing]}>
            <Text style={timing_heading_style}>Pickup time : </Text>
            <Text style={address_style}>
              {this.state.pickupTime.from + ' - ' + this.state.pickupTime.to}
            </Text>
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
          <Modal
            visible={this.state.showModal}
            onRequestClose={() => {
              this.setState({showModal: false});
            }}>
            <WebView
              style={{height: 400, width: 300}}
              source={{uri: this.state.approvalUrl}}
              onNavigationStateChange={data => this.handelResponse(data)}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
              style={{marginTop: 20}}
            />
          </Modal>
          <View style={[bottom_container, bottom_spacing]}>
            <Text />
            {!this.state.isSeller ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={!this.state.isSkipped ? this.onBuy : this.onAlert}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    colors.gradientFirstColor,
                    colors.gradientSecondColor,
                  ]}
                  style={[button_container, centered_text]}>
                  <Text style={button_text}>Buy food</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </View>
        {this.state.isDialogVisible ? (
          <ConfirmPayment
            visible={this.state.isDialogVisible}
            closeDialog={this.closeDialog}
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
    );
  }
}
