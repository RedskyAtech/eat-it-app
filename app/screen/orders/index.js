import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';
import * as colors from '../../constants/colors';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';

export default class orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userId: '',
      selectedIndex: 0,
      noDataExist: false,
      isVisibleLoading: false,
      orders: [],
      query: '',
      filtersList: [
        {
          name: 'Current',
        },
        {
          name: 'Past',
        },
      ],
    };
  }
  componentDidMount = async () => {
    const token = await utility.getToken('token');
    const userId = await utility.getItem('userId');
    await this.setState({
      userToken: token,
      userId: userId,
      query: `sellerId=${this.state.userId}history=false`,
    });
    await this.getReceivedOrders();
  };
  getReceivedOrders = async () => {
    await this.setState({isVisibleLoading: true, orders: []});
    try {
      let response = Service.getDataApi(
        `orders?sellerId=${this.state.userId}`,
        this.state.userToken,
      );
      response
        .then(res => {
          if (res.data) {
            if (res.data.orders && res.data.orders.length != 0) {
              let tempOrders = [];
              for (let item of res.data.orders) {
                if (item) {
                  let image;
                  if (item.images && item.images.length != 0) {
                    image = item.images[0].resize_url;
                  }
                  tempOrders.push({
                    id: item.id,
                    image: image,
                    name: item.name,
                    price: item.price,
                    time: item.cookingTime,
                    orderId: item.orderId,
                    type: item.type,
                    status: item.status,
                  });
                }
              }
              this.setState({
                isVisibleLoading: false,
                noDataExist: false,
                orders: tempOrders,
              });
            } else {
              this.setState({isVisibleLoading: false, noDataExist: true});
              console.log('no data found');
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
  onBack = async () => {
    await this.props.navigation.navigate('tab5');
  };
  onOrder = async (id, status) => {
    await this.props.navigation.navigate('OrderDetails', {
      from: 'orders',
      orderId: id,
      status: status,
    });
  };
  onListItem = async index => {
    if (index == 0) {
      await this.setState({
        query: `sellerId=${this.state.userId}history=false`,
      });
    }
    if (index == 1) {
      await this.setState({query: `sellerId=${this.state.userId}history=true`});
    }
    await this.getReceivedOrders();
    await this.setState({selectedIndex: index});
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
      free_text,
      loader,
      status_container,
      pending_style,
      confirmed_style,
      delivered_style,
      rejected_style,
      status_style,
      filter_container,
      filters,
      selected_color,
      unselected_color,
      filter_text,
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

          <View style={[row, filter_container, between_spacing]}>
            {this.state.filtersList.map(item => {
              let index = this.state.filtersList.indexOf(item);
              return (
                <TouchableOpacity onPress={() => this.onListItem(index)}>
                  <View
                    style={
                      this.state.selectedIndex == index
                        ? [filters, selected_color]
                        : [filters, unselected_color]
                    }>
                    <Text style={filter_text}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {!this.state.noDataExist ? (
            <View style={list_height}>
              <ScrollView>
                {this.state.orders.map(value => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => this.onOrder(value.id, value.status)}>
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
                              source={{uri: value.image}}
                              style={list_image}
                            />
                          </View>

                          <View style={[column, column_between_spacing]}>
                            <View style={{width: wp(48)}}>
                              <View style={[row]}>
                                <Text style={product_heading}>
                                  #{value.orderId}
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
                              <View style={[row, row_center_align]}>
                                <Image
                                  resizeMode="stretch"
                                  source={require('../../assets/clock.png')}
                                  style={clock}
                                />
                                <Text style={text_style}>{value.time}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={[column, column_between_spacing, end_align]}>
                          <View
                            style={[
                              status_container,
                              ,
                              value.status == 'pending'
                                ? pending_style
                                : value.status == 'confirmed'
                                ? confirmed_style
                                : value.status == 'delivered'
                                ? delivered_style
                                : rejected_style,
                            ]}>
                            <Text style={status_style}>{value.status}</Text>
                          </View>
                          {value.type == 'langar' ? (
                            <View />
                          ) : value.price == 0 ? (
                            <Text style={free_text}>Free</Text>
                          ) : (
                            <Text style={price_text}>Rs {value.price}</Text>
                          )}
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
          <View style={loader}>
            <ActivityIndicator
              animating={this.state.isVisibleLoading}
              size="large"
              color={colors.primaryColor}
            />
          </View>
        </View>
      </View>
    );
  }
}
