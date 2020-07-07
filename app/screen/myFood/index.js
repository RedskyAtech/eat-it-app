import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './style';
import {Accordion} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import LikeDislikeFood from '../likeDislikeFood';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {NavigationActions, StackActions} from 'react-navigation';
import moment from 'moment';

export default class myFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      visible: false,
      query: '',
      isDialogVisible: false,
      userId: '',
      userToken: '',
      foodId: '',
      sellerId: '',
      dataArray: [{id: '1', content: []}, {id: '2', content: []}],
      filtersList: [
        {
          name: 'Current',
        },
        {
          name: 'Past',
        },
      ],
      selectedIndex: 0,
      isSkipped: false,
    };
  }
  componentDidMount = async () => {
    let isSkipped = await utility.getItem('isSkipped');
    await this.setState({isSkipped: isSkipped, selectedIndex: 0});

    if (this.state.isSkipped == false) {
      if (this.props.navigation.state.params) {
        let from;
        if (
          this.props.navigation.state.params.from != '' ||
          this.props.navigation.state.params.from != undefined ||
          this.props.navigation.state.params.from != null
        ) {
          from = this.props.navigation.state.params.from;
          await this.setState({from: from});
        }
      } else {
        await this.setState({from: ''});
      }
      const userId = await utility.getItem('userId');
      const userToken = await utility.getToken('token');
      await this.setState({
        userId: userId,
        userToken: userToken,
        query: `buyerId=${userId}&history=false`,
      });
      await this.getPurchasedFood();
      await this.getSharedFood();
    }
  };
  onTabItem = async index => {
    if (index == 0) {
      await this.setState({
        query: `buyerId=${this.state.userId}&history=false`,
      });
    }
    if (index == 1) {
      await this.setState({
        query: `buyerId=${this.state.userId}&history=true`,
      });
    }
    await this.getPurchasedFood();
    await this.setState({selectedIndex: index});
  };
  onRefersh = async () => {
    await this.setState({query: `buyerId=${this.state.userId}&history=true`});
    await this.getPurchasedFood();
  };
  getPurchasedFood = async () => {
    try {
      let response = Service.getDataApi(
        `orders?${this.state.query}`,
        this.state.userToken,
      );
      response
        .then(res => {
          if (res.data) {
            if (res.data.orders) {
              if (res.data.orders.length != 0) {
                let shared = [{id: '1', content: []}, {id: '2', content: []}];
                let tempContent = [];
                let now = moment().format('DD-MM-YYYY');
                let timeStamp;
                let isToday = false;
                for (let i = 0; i < res.data.orders.length; i++) {
                  let image;
                  if (res.data.orders[i].images) {
                    image = res.data.orders[i].images[0].url;
                  }
                  if (res.data.orders[i].timeStamp) {
                    timeStamp = moment(res.data.orders[i].timeStamp).format(
                      'DD-MM-YYYY',
                    );
                    if (now == timeStamp) {
                      isToday = true;
                    } else {
                      isToday = false;
                    }
                  }
                  tempContent.push({
                    id: res.data.orders[i].id,
                    foodId: res.data.orders[i].foodId,
                    name: res.data.orders[i].name,
                    price: res.data.orders[i].price,
                    time: res.data.orders[i].cookingTime,
                    address: res.data.orders[i].address,
                    image: image,
                    isLiked: res.data.orders[i].favoriteType,
                    type: res.data.orders[i].type,
                    status: res.data.orders[i].status,
                    isToday: isToday,
                  });
                }
                shared[0].content = tempContent;
                shared[1].content = this.state.dataArray[1].content;
                this.setState({dataArray: shared});
              }
            }
          } else {
            console.log('no data found', res.error);
            // alert(res.error);
          }
        })
        .catch(error => {
          console.log('error in try-catch', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  getSharedFood = async () => {
    try {
      let response = Service.getDataApi(
        `foods?userId=${this.state.userId}`,
        '',
      );
      response
        .then(res => {
          if (res.data) {
            if (res.data.length != 0) {
              let shared = [{id: '1', content: []}, {id: '2', content: []}];
              let tempContent = [];
              for (let i = 0; i < res.data.length; i++) {
                let image;
                if (res.data[i].images) {
                  image = res.data[i].images[0].url;
                }
                tempContent.push({
                  id: res.data[i]._id,
                  name: res.data[i].name,
                  type: res.data[i].type,
                  price: res.data[i].price,
                  time: res.data[i].cookingTime,
                  address: res.data[i].address,
                  image: image,
                  isLiked: 'none',
                  type: res.data[i].type,
                  isVeg: true,
                  status: 'null',
                  isToday: false,
                });
              }
              shared[0].content = this.state.dataArray[0].content;
              shared[1].content = tempContent;
              this.setState({dataArray: shared});
            }
          } else {
            console.log('no data found', res.error);
            // alert(res.error);
          }
        })
        .catch(error => {
          console.log('error in try-catch', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  // showDialog = async (foodId, sellerId, type) => {
  //   if (type == 'none') {
  //     await this.setState({
  //       isDialogVisible: true,
  //       foodId: foodId,
  //       sellerId: sellerId,
  //     });
  //   }
  // };
  // closeDialog = async () => {
  //   this.setState({isDialogVisible: false});
  //   // await this.getPurchasedFood();
  // };
  onOrderDetail = async (orderId, status, isToday, isLiked) => {
    await this.props.navigation.navigate('OrderDetails', {
      from: 'myFood',
      status: status,
      orderId: orderId,
      isToday: isToday,
      isLiked: isLiked,
      onRefersh: this.onRefersh,
    });
  };
  renderHeader = (item, expanded) => {
    let index;
    if (this.state && this.state.dataArray) {
      index = this.state.dataArray.indexOf(item);
    }
    return (
      <View
        style={[
          index % 2 == 0 ? styles.even_color : styles.odd_color,
          styles.row,
          styles.between_spacing,
          styles.inner_container,
          styles.list_item_style,
          styles.list_spacing,
        ]}>
        <Text style={styles.list_item_text}>
          {' '}
          {index == 0 ? 'Food you bought' : 'Food you share'}
        </Text>
        {expanded ? (
          <Icon style={styles.top_down_icon} name="chevron-up" />
        ) : (
          <Icon style={styles.top_down_icon} name="chevron-down" />
        )}
      </View>
    );
  };

  renderContent = item => {
    let index;
    if (this.state && this.state.dataArray) {
      index = this.state.dataArray.indexOf(item);
    }
    return (
      <>
        <View style={styles.list_height} key={item.id}>
          {index == 0 ? (
            <View
              style={[
                styles.row,
                styles.filter_container,
                styles.between_spacing,
              ]}>
              {this.state.filtersList.map(item => {
                let index = this.state.filtersList.indexOf(item);
                return (
                  <TouchableOpacity onPress={() => this.onTabItem(index)}>
                    <View
                      style={
                        this.state.selectedIndex == index
                          ? [styles.filters, styles.selected_color]
                          : [styles.filters, styles.unselected_color]
                      }>
                      <Text style={styles.filter_text}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View />
          )}
          {item.content.length != 0 ? (
            <ScrollView>
              {item.content.map(value => {
                console.log('islikedddd:::::',value.isLiked)
                return (
                  <TouchableOpacity
                    onPress={
                      index == 0
                        ? () => {
                            this.onOrderDetail(
                              value.id,
                              value.status,
                              value.isToday,
                              value.isLiked,
                            );
                          }
                        : () => {}
                    }
                    // onPress={
                    //   index == 0 && value.status == 'delivered'
                    //     ? () =>
                    //         this.showDialog(
                    //           value.foodId,
                    //           value.sellerId,
                    //           value.isLiked,
                    //         )
                    //     : () => {
                    //         this.onOrderDetail(
                    //           value.id,
                    //           value.status,
                    //           value.isToday,
                    //         );
                    //       }
                    // }
                  >
                    <View
                      style={[
                        styles.row,
                        styles.column_between_spaceing,
                        styles.inner_container,
                        styles.inner_list_spacing,
                      ]}>
                      <View style={styles.row}>
                        <View style={styles.list_image_continer}>
                          <Image
                            resizeMode="cover"
                            source={
                              this.state.from == ''
                                ? {uri: value.image}
                                : value.image
                            }
                            style={styles.list_image}
                          />
                        </View>
                        <View
                          style={[
                            styles.column,
                            styles.column_between_spaceing,
                          ]}>
                          <View style={{width: widthPercentageToDP(45)}}>
                            <View style={[styles.row]}>
                              <Text style={styles.product_heading}>
                                {value.name}
                              </Text>
                            </View>
                            <Text style={styles.address_text} numberOfLines={1}>
                              {value.address}
                            </Text>
                          </View>

                          <View style={[styles.row, styles.between_spacing]}>
                            <View style={[styles.row, styles.row_center_align]}>
                              <View
                                style={
                                  value.type == 'veg'
                                    ? [styles.non_veg_icon, styles.green_color]
                                    : value.type == 'langar'
                                    ? [styles.non_veg_icon, styles.yellow_color]
                                    : [styles.non_veg_icon, styles.red_color]
                                }
                              />
                              <Text style={styles.text_style}>
                                {value.type == 'veg'
                                  ? 'Veg'
                                  : value.type == 'langar'
                                  ? 'Langar'
                                  : 'Non-veg'}
                              </Text>
                            </View>
                            <View style={[styles.row, styles.row_center_align]}>
                              <Image
                                resizeMode="stretch"
                                source={require('../../assets/clock.png')}
                                style={styles.clock}
                              />
                              <Text style={styles.text_style}>
                                {value.time}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={[styles.column, styles.column_between_spaceing]}>
                        {index == 0 ? (
                          <>
                            {value.isLiked == 'none' ? (
                              <View
                                style={[
                                  styles.status_container,
                                  value.status == 'pending'
                                    ? styles.pending_style
                                    : value.status == 'confirmed'
                                    ? styles.confirmed_style
                                    : value.status == 'delivered'
                                    ? styles.delivered_style
                                    : styles.rejected_style,
                                ]}>
                                <Text style={styles.status_style}>
                                  {value.status}
                                </Text>
                              </View>
                            ) : (
                              // <>
                              //   {value.isLiked == 'none' ? (
                              //     <View />
                              //   ) : (
                              <Image
                                resizeMode="stretch"
                                source={
                                  value.isLiked == 'like'
                                    ? require('../../assets/like.png')
                                    : require('../../assets/dislike.png')
                                }
                                style={[
                                  styles.like_dislike_icon,
                                  {alignSelf: 'flex-end'},
                                ]}
                              />
                              //   )}
                              // </>
                            )}
                          </>
                        ) : (
                          <View />
                        )}
                        {value.type == 'langar' ? (
                          <View />
                        ) : value.price == 0 ? (
                          <Text style={styles.free_text}>Free</Text>
                        ) : (
                          <Text style={styles.price_text}>
                            Rs {value.price}
                          </Text>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <View style={[styles.centered_text, {height: '100%'}]}>
              <Text>No food found</Text>
            </View>
          )}
        </View>
      </>
    );
  };
  onBack = async () => {
    if (this.state.from == 'notification') {
      await this.props.navigation.navigate('Notifications');
    }
    if (this.state.from == 'profile') {
      await this.props.navigation.navigate('tab5');
    }
    if (
      this.state.from == '' ||
      this.state.from == undefined ||
      this.state.from == null
    ) {
      await this.setState({isVisible: !this.state.isVisible});
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'BottomTab'})],
        }),
      );
      await this.props.navigation.navigate('tab1');
    }
    await this.setState({from: ''});
  };
  render() {
    const {
      container,
      inner_container,
      spacing,
      row,
      arrow,
      column,
      heading_text,
      between_spacing,
      centered_text,
      skipped_content,
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
            <Text style={heading_text}>My food</Text>
            <View>
              <Text> </Text>
            </View>
          </View>
          {!this.state.isSkipped ? (
            <Accordion
              style={{border: 'none'}}
              dataArray={this.state.dataArray}
              animation={true}
              expanded={true}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
            />
          ) : (
            <View style={[skipped_content, centered_text]}>
              <Text>You have to login first to access this page</Text>
            </View>
          )}
          {this.state.isDialogVisible ? (
            <LikeDislikeFood
              visible={this.state.isDialogVisible}
              closeDialog={this.closeDialog}
              foodId={this.state.foodId}
              sellerId={this.state.sellerId}
            />
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}
