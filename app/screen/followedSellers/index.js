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
import * as colors from '../../constants/colors';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';

export default class followedSellers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleLoading: false,
      userId: '',
      userToken: '',
      followedSellers: [],
      noDataExist: false,
    };
  }
  componentDidMount = async () => {
    const token = await utility.getToken('token');
    const userId = await utility.getItem('userId');
    await this.setState({userToken: token, userId: userId});
    await this.getFollowedSellers();
  };
  getFollowedSellers = async () => {
    await this.setState({isVisibleLoading: true});
    try {
      let response = Service.getDataApi(
        `favorites?buyerId=${this.state.userId}`,
        '',
      );
      response
        .then(res => {
          if (res.data) {
            let tempFavourites = [];
            if (res.data.favorites && res.data.favorites.length != 0) {
              for (let item of res.data.favorites) {
                if (item) {
                  tempFavourites.push({
                    sellerId: item.sellerId,
                    name: item.firstName + ' ' + item.lastName,
                    image: item.image.resize_url,
                    totalFollowers: item.followerCount,
                    totalDishes: item.totalDishes,
                  });
                }
              }
              this.setState({
                isVisibleLoading: false,
                followedSellers: tempFavourites,
                noDataExist: false,
              });
            } else {
              this.setState({
                isVisibleLoading: false,
                noDataExist: true,
              });
            }
          } else {
            this.setState({isVisibleLoading: false, noDataExist: false});
            console.log('no data found', res.error);
            // alert(res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false, noDataExist: false});
          console.log('error in try-catch', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      this.setState({isVisibleLoading: false, noDataExist: false});
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  showDialog = async sellerId => {
    await utility.showAlert('Do you want to unfollow seller.', () =>
      this.unFollowSeller(sellerId),
    );
  };
  unFollowSeller = async sellerId => {
    this.setState({isVisibleLoading: true});
    let body = {
      isfollowed: 'false',
      sellerId: sellerId,
    };
    try {
      let response = Service.putDataApi(
        `users/${this.state.userId}`,
        body,
        this.state.userToken,
      );
      response
        .then(res => {
          if (res.data) {
            this.setState({isVisibleLoading: false});
            alert('Unfollow successfully');
            this.getFollowedSellers();
          } else {
            this.setState({isVisibleLoading: false});
            console.log('no data found', res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('error in try-catch', error);
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

  render() {
    const {
      container,
      column,
      list_height,
      row,
      between_spacing,
      centered_text,
      inner_container,
      spacing,
      arrow,
      heading_text,
      profile_image,
      like_icon,
      text_style,
      list_text_style,
      horizontally_centered,
      bottom_margin,
      name_heading,
      loader,
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
            <Text style={heading_text}>Seller you follow</Text>
            <View>
              <Text> </Text>
            </View>
          </View>

          {!this.state.noDataExist ? (
            <View style={list_height}>
              <ScrollView>
                {this.state.followedSellers.map(value => {
                  return (
                    <View style={[row, between_spacing, bottom_margin]}>
                      <View style={[row]}>
                        <Image
                          resizeMode="cover"
                          source={{uri: value.image}}
                          style={profile_image}
                        />
                        <View style={[column, list_text_style]}>
                          <Text style={name_heading}>{value.name}</Text>
                          <View
                            style={[row, {justifyContent: 'space-between'}]}>
                            <Text style={text_style}>
                              {value.totalFollowers} followers
                            </Text>
                            <Text style={text_style}>
                              {value.totalDishes} dishes added
                            </Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this.showDialog(value.sellerId);
                        }}>
                        <Image
                          resizeMode="cover"
                          style={like_icon}
                          source={require('../../assets/heart_fill.png')}
                        />
                      </TouchableOpacity>
                    </View>
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
