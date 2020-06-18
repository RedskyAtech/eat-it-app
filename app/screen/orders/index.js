import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';

export default class orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleLoading: false,
      orders: [
        {
          image: require('../../assets/sweet.jpg'),
          name: 'Bolognese baked Potato',
          price: 50,
          time: '02:30 pm',
          orderId: '#4529874',
          type: 'veg',
        },
        {
          image: require('../../assets/burger.jpg'),
          name: 'Chilli Potato',
          price: 100,
          time: '03:30 pm',
          orderId: '#4521274',
          type: 'nonVeg',
        },
        {
          image: require('../../assets/food.jpg'),
          name: 'Merlin Super Jumbo',
          price: 0,
          time: '01:30 pm',
          orderId: '#5629874',
          type: 'langar',
        },
        {
          image: require('../../assets/sweet.jpg'),
          name: 'Bolognese baked Potato',
          price: 50,
          time: '02:30 pm',
          orderId: '#4529874',
          type: 'veg',
        },
        {
          image: require('../../assets/burger.jpg'),
          name: 'Chilli Potato',
          price: 100,
          time: '03:30 pm',
          orderId: '#4521274',
          type: 'nonVeg',
        },
        {
          image: require('../../assets/food.jpg'),
          name: 'Merlin Super Jumbo',
          price: 0,
          time: '01:30 pm',
          orderId: '#5629874',
          type: 'langar',
        },
        {
          image: require('../../assets/sweet.jpg'),
          name: 'Bolognese baked Potato',
          price: 50,
          time: '02:30 pm',
          orderId: '#4529874',
          type: 'veg',
        },
        {
          image: require('../../assets/burger.jpg'),
          name: 'Chilli Potato',
          price: 100,
          time: '03:30 pm',
          orderId: '#4521274',
          type: 'nonVeg',
        },
        {
          image: require('../../assets/food.jpg'),
          name: 'Merlin Super Jumbo',
          price: 0,
          time: '01:30 pm',
          orderId: '#5629874',
          type: 'langar',
        },
      ],
    };
  }
  onBack = async () => {
    await this.props.navigation.navigate('tab5');
  };
  onOrder = async () => {
    await this.props.navigation.navigate('OrderDetails',{from:'orders'});
  };
  render() {
    const {
      container,
      column,
      list_height,
      top_container,
      price_text,
      address_text,
      text_style,
      column_between_spacing,
      clock,
      non_veg_icon,
      green_color,
      red_color,
      row_center_align,
      product_heading,
      list_image_continer,
      list_image,
      row,
      inner_list_spacing,
      between_spacing,
      centered_text,
      yellow_color,
      inner_container,
      spacing,
      arrow,
      heading_text,
      end_align,
    } = styles;
    return (
      <View style={[container, column, between_spacing]}>
        <View>
          <View style={[inner_container, row, between_spacing, spacing]}>
            <TouchableOpacity onPress={this.onBack}>
              <Image
                resizeMode="contain"
                source={require('../../assets/back_arrow.png')}
                style={arrow}
              />
            </TouchableOpacity>
            <Text style={heading_text}>Received orders</Text>
            <View>
              <Text> </Text>
            </View>
          </View>

          {!this.state.noDataExist ? (
            <View style={list_height}>
              <ScrollView>
                {this.state.orders.map(value => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={this.onOrder}>
                      <View
                        style={[
                          row,
                          column_between_spacing,
                          top_container,
                          inner_list_spacing,
                        ]}>
                        <View style={row}>
                          <View style={list_image_continer}>
                            <Image
                              resizeMode="cover"
                              source={value.image}
                              style={list_image}
                            />
                          </View>

                          <View style={[column, column_between_spacing]}>
                            <View style={{width: wp(48)}}>
                              <View style={[row]}>
                                <Text style={product_heading}>
                                  {value.orderId}
                                </Text>
                              </View>
                              <Text style={[product_heading, address_text]}>
                                {value.name}
                              </Text>
                            </View>

                            <View style={[row, between_spacing]}>
                              <View style={[row, row_center_align]}>
                                <View
                                  style={
                                    value.type == 'veg'
                                      ? [non_veg_icon, green_color]
                                      : value.type == 'langar'
                                      ? [non_veg_icon, yellow_color]
                                      : [non_veg_icon, red_color]
                                  }
                                />
                                <Text style={text_style}>
                                  {value.type == 'veg'
                                    ? 'Veg'
                                    : value.type == 'langar'
                                    ? 'Langar'
                                    : 'Non-veg'}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={[column, column_between_spacing, end_align]}>
                          <Text style={text_style}>{value.time}</Text>
                          <Text style={price_text}>Rs {value.price}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View style={[list_height, column, centered_text]}>
              <Text style={{textAlign: 'center'}}>No food found</Text>
            </View>
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
