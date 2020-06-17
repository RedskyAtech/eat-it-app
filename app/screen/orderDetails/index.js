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
import ConfirmOrder from '../confirmOrder';

export default class orderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodId: '',
      name: 'Bolognese Baked Potato',
      address: 'Amrit Sweets, Phase 5, Mohali',
      price: 50,
      orderId: '#4509673',
      type: 'veg',
      deliveryPrice: 10,
      totalAmount: 60,
      isDialogVisible: false,
      images: [
        {
          image: require('../../assets/sweet.jpg'),
        },
        {
          image: require('../../assets/burger.jpg'),
        },
        {
          image: require('../../assets/food.jpg'),
        },
      ],
      isVisibleLoading: false,
    };
  }
  componentDidMount = async () => {};

  onBack = async () => {
    this.props.navigation.navigate('Orders');
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
      <Image resizeMode="cover" style={styles.images} source={item.image} />
    );
  };
  onConfirm = async () => {
    await this.setState({isDialogVisible: true});
  };
  closeDialog = async () => {
    await this.setState({isDialogVisible: false});
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
      arrow,
      heading_text,
      between_spacing,
      type_icon,
      veg_icon,
      top_spacing,
      langar_icon,
      id_heading,
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
            <Text style={[id_heading, colored_text]}>{this.state.orderId}</Text>
          </View>
          <View style={[row, between_spacing, bottom_spacing]}>
            <Text style={product_name}>{this.state.name}</Text>
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
            <TouchableOpacity activeOpacity={0.7} onPress={this.onConfirm}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
                style={[button_container, centered_text]}>
                <Text style={button_text}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {this.state.isDialogVisible ? (
            <ConfirmOrder
              visible={this.state.isDialogVisible}
              closeDialog={this.closeDialog}
            />
          ) : (
            <View />
          )}
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
