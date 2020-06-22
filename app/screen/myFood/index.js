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

export default class myFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      visible: false,
      isDialogVisible: false,
      userId: '',
      userToken: '',
      foodId: '',
      sellerId: '',
      dataArray: [
        {
          content: [],
        },
        {
          content: [],
        },
      ],
      isSkipped: false,
    };
  }
  componentDidMount = async () => {
    let isSkipped = await utility.getItem('isSkipped');
    await this.setState({isSkipped: isSkipped});

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
      this.setState({userId: userId, userToken: userToken});
      await this.getPurchasedFood();
      await this.getSharedFood();
    }
  };
  getPurchasedFood = async () => {
    try {
      let response = Service.getDataApi(
        `payments?userId=${this.state.userId}`,
        this.state.userToken,
      );
      response
        .then(res => {
          if (res.data) {
            if (res.data.payments) {
              if (res.data.payments.length != 0) {
                let shared = [
                  {
                    content: [],
                  },
                  {
                    content: [],
                  },
                ];
                let tempContent = [];
                for (let i = 0; i < res.data.payments.length; i++) {
                  let image;
                  if (res.data.payments[i].images) {
                    image = res.data.payments[i].images[0].url;
                  }
                  tempContent.push({
                    id: res.data.payments[i].id,
                    foodId: res.data.payments[i].foodId,
                    name: res.data.payments[i].name,
                    price: res.data.payments[i].price,
                    time: res.data.payments[i].cookingTime,
                    address: res.data.payments[i].address,
                    image: image,
                    isLiked: res.data.payments[i].favoriteType,
                    type: res.data.payments[i].type,
                    isVeg: true,
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
              console.log('datattatatata:', res.data);
              let shared = [
                {
                  content: [],
                },
                {
                  content: [],
                },
              ];
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

  showDialog = async (foodId, sellerId, type) => {
    if (type == 'none') {
      await this.setState({
        isDialogVisible: true,
        foodId: foodId,
        sellerId: sellerId,
      });
    }
  };
  closeDialog = async () => {
    this.setState({isDialogVisible: false});
    await this.getPurchasedFood();
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
        <View style={styles.list_height}>
          {item.content.length != 0 ? (
            <ScrollView>
              {item.content.map(value => {
                return (
                  <TouchableOpacity
                    onPress={
                      index == 0
                        ? () =>
                            this.showDialog(
                              value.foodId,
                              value.sellerId,
                              value.isLiked,
                            )
                        : () => {}
                    }>
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
                        {value.isLiked == 'none' ? (
                          <View />
                        ) : (
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
                        {/* <Text style={styles.price_text}>Rs {value.price}</Text> */}
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

// if (from == 'profile') {
//   const userId = await utility.getItem('userId');
//   const userToken = await utility.getToken('token');
//   this.setState({userId: userId, userToken: userToken});
//   await this.getPurchasedFood();
//   await this.getSharedFood();
// } else {
//   let array = [
//     {
//       content: [
//         {
//           id: '1',
//           foodId: '2',
//           name: 'Pasta',
//           price: '10',
//           time: '02:30 pm',
//           address: 'Mohali, Chandigarh',
//           image: require('../../assets/sweet.jpg'),
//           isLiked: 'none',
//           type: 'veg',
//           isVeg: true,
//         },
//         {
//           id: '1',
//           foodId: '2',
//           name: 'Burger',
//           price: '10',
//           time: '02:30 pm',
//           address: 'Mohali, Chandigarh',
//           image: require('../../assets/sweet.jpg'),
//           isLiked: 'none',
//           type: 'veg',
//           isVeg: true,
//         },
//         {
//           id: '1',
//           foodId: '2',
//           name: 'Piza',
//           price: '10',
//           time: '02:30 pm',
//           address: 'Mohali, Chandigarh',
//           image: require('../../assets/sweet.jpg'),
//           isLiked: 'none',
//           type: 'veg',
//           isVeg: true,
//         },
//         {
//           id: '1',
//           foodId: '2',
//           name: 'Poha',
//           price: '10',
//           time: '02:30 pm',
//           address: 'Mohali, Chandigarh',
//           image: require('../../assets/sweet.jpg'),
//           isLiked: 'none',
//           type: 'veg',
//           isVeg: true,
//         },
//         {
//           id: '1',
//           foodId: '2',
//           name: 'Pasta',
//           price: '10',
//           time: '02:30 pm',
//           address: 'Mohali, Chandigarh',
//           image: require('../../assets/sweet.jpg'),
//           isLiked: 'none',
//           type: 'veg',
//           isVeg: true,
//         },
//       ],
//     },
//     {
//       content: [
//         {
//           id: '1',
//           foodId: '2',
//           name: 'Pasta',
//           price: '10',
//           time: '02:30 pm',
//           address: 'Mohali, Chandigarh',
//           image: require('../../assets/sweet.jpg'),
//           isLiked: 'none',
//           type: 'veg',
//           isVeg: true,
//         },
//         {
//           id: '1',
//           foodId: '2',
//           name: 'Pasta',
//           price: '10',
//           time: '02:30 pm',
//           address: 'Mohali, Chandigarh',
//           image: require('../../assets/sweet.jpg'),
//           isLiked: 'none',
//           type: 'veg',
//           isVeg: true,
//         },
//       ],
//     },
//   ];
//   await this.setState({dataArray: array});
// }
