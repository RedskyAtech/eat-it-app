import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {widthPercentageToDP as wp} from '../../utility/index';
import * as colors from '../../constants/colors';
import * as Service from '../../api/services';

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
    };
  }
  componentDidMount = async () => {
    let foodId;
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.from == 'home') {
        if (this.props.navigation.state.params.foodId) {
          foodId = this.props.navigation.state.params.foodId;
        }
        await this.setState({foodId: foodId, from: 'home'});
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
            });

            this.setState({isVisibleLoading: false});
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
      this.props.navigation.navigate('tab1');
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
    this.props.navigation.navigate('Payment');
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
            <Text style={[price, colored_text]}>Rs {this.state.price}</Text>
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

          <View style={[bottom_container, bottom_spacing]}>
            <Text />
            <TouchableOpacity activeOpacity={0.7} onPress={this.onBuy}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
                style={[button_container, centered_text]}>
                <Text style={button_text}>Buy food</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
            <ActivityIndicator
              animating={this.state.isVisibleLoading}
              size="large"
              color="#0000ff"
            />
          </View>
        </View>
      </View>
    );
  }
}
