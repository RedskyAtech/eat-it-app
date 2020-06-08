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
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';

export default class searchName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      products: [],
      query: '',
      isVisibleLoading: false,
    };
  }
  componentDidMount = async () => {
    let name;
    let filters = {};
    if (this.props.navigation.state.params.name) {
      name = this.props.navigation.state.params.name;
    }
    if (name != '') {
      await this.setState({name: name});
      this.setState({query: `name=${this.state.name}&searchType=food`});
      await this.getFood();
    }
    if (this.props.navigation.state.params.filters) {
      filters = this.props.navigation.state.params.filters;
      console.log('filtersssssss:', this.props.navigation.state.params.filters);
      if (filters) {
        if (filters.cost != '' && filters.type == '' && filters.from == '') {
          if (filters.cost == 'paid') {
            this.setState({
              query: `name=${
                this.state.name
              }&searchType=food&cost=paid&minPrice=${
                filters.minPrice
              }&maxPrice=${filters.maxPrice}`,
            });
          } else {
            this.setState({
              query: `name=${this.state.name}&searchType=food&cost=free`,
            });
          }
        } else if (
          filters.cost != '' &&
          filters.type != '' &&
          filters.from == ''
        ) {
          this.setState({
            query: `name=${this.state.name}&searchType=food&type=${
              filters.type
            }`,
          });
        } else if (
          filters.cost != '' &&
          filters.type == '' &&
          filters.from != ''
        ) {
          this.setState({
            query: `name=${this.state.name}&searchType=food&foodCooked=${
              filters.from
            }`,
          });
        } else if (
          filters.cost != '' &&
          filters.type != '' &&
          filters.from == ''
        ) {
          if (filters.cost == 'paid') {
            this.setState({
              query: `name=${
                this.state.name
              }&searchType=food&cost=paid&minPrice=${
                filters.minPrice
              }&maxPrice=${filters.maxPrice}&foodCooked=${filters.from}`,
            });
          } else {
            this.setState({
              query: `name=${
                this.state.name
              }&searchType=food&cost=free&foodCooked=${filters.from}`,
            });
          }
        } else if (
          filters.cost == '' &&
          filters.type != '' &&
          filters.from != ''
        ) {
          this.setState({
            query: `name=${this.state.name}&searchType=food&type=${
              filters.type
            }&foodCooked=${filters.from}`,
          });
        } else if (
          filters.cost != '' &&
          filters.type == '' &&
          filters.from != ''
        ) {
          if (filters.cost == 'paid') {
            this.setState({
              query: `name=${
                this.state.name
              }&searchType=food&cost=paid&minPrice=${
                filters.minPrice
              }&maxPrice=${filters.maxPrice}$&foodCooked=${filters.from}`,
            });
          } else {
            this.setState({
              query: `name=${
                this.state.name
              }&searchType=food&cost=free&foodCooked=${filters.from}`,
            });
          }
        } else if (
          filters.cost != '' &&
          filters.type != '' &&
          filters.from != ''
        ) {
          if (filters.cost == 'paid') {
            this.setState({
              query: `name=${
                this.state.name
              }&searchType=food&cost=paid&minPrice=${
                filters.minPrice
              }&maxPrice=${filters.maxPrice}$&foodCooked=${filters.from}&type=${
                filters.type
              }`,
            });
          } else {
            this.setState({
              query: `name=${
                this.state.name
              }&searchType=food&cost=free&foodCooked=${filters.from}&type=${
                filters.type
              }`,
            });
          }
        } else {
          this.setState({query: `name=${this.state.name}&searchType=food`});
        }
      }
    }
  };

  onNameChange(name) {
    if (name == '') {
      this.setState({products: [], name});
    } else {
      this.setState({name});
      this.setState({query: `name=${this.state.name}&searchType=food`});
      this.getFood();
    }
  }

  getFood = async () => {
    await this.setState({products: [], isVisibleLoading: true});
    try {
      let response = Service.getDataApi(
        Url.SEARCH_FOOD + `?${this.state.query}`,
        '',
      );
      response
        .then(res => {
          if (res.data) {
            if (res.data.length != 0) {
              let tempProducts = [];
              for (let i = 0; i < res.data.length; i++) {
                let image;
                if (res.data[i].images) {
                  image = res.data[i].images[0].url;
                }
                tempProducts.push({
                  id: res.data[i]._id,
                  name: res.data[i].name,
                  price: res.data[i].price,
                  time: res.data[i].cookingTime,
                  address: res.data[i].address,
                  image: image,
                  type: res.data[i].type,
                });
              }
              this.setState({products: tempProducts, isVisibleLoading: false});
            }
          } else {
            this.setState({isVisibleLoading: false});
            console.log('if no data in response:', res.error);
            alert(res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('api problem:', error.error);
          alert(error.error);
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert(err);
    }
  };

  onFilter = async () => {
    this.props.navigation.navigate('Filter');
  };
  render() {
    const {
      container,
      column,
      search_container,
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
      around_spacing,
      search_input,
      icons,
      search_icon,
    } = styles;
    return (
      <View style={[container, column, between_spacing]}>
        <View>
          <View style={[row, between_spacing, top_container]}>
            <View style={[search_container, row, around_spacing]}>
              <TouchableOpacity>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/search.png')}
                  style={search_icon}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Search"
                style={search_input}
                onChangeText={name => this.onNameChange(name)}
                value={this.state.name}
              />
            </View>
            <TouchableOpacity onPress={this.onFilter}>
              <Image
                resizeMode="contain"
                source={require('../../assets/filter_yellow.png')}
                style={icons}
              />
            </TouchableOpacity>
          </View>

          <View style={list_height}>
            <ScrollView>
              {this.state.products.map(value => {
                return (
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
                        <View style={{width: wp(45)}}>
                          <View style={[row]}>
                            <Text style={product_heading}>{value.name}</Text>
                          </View>
                          <Text style={address_text}>{value.address}</Text>
                        </View>

                        <View style={[row, between_spacing]}>
                          <View style={[row, row_center_align]}>
                            <View
                              style={
                                value.type == 'veg'
                                  ? [non_veg_icon, green_color]
                                  : [non_veg_icon, red_color]
                              }
                            />
                            <Text style={text_style}>
                              {value.type == 'veg' ? 'Veg' : 'Non-veg'}
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
                    <View style={[column, column_between_spacing]}>
                      <View />
                      <Text style={price_text}>Rs {value.price}</Text>
                    </View>
                  </View>
                );
              })}
              <View
                style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
                <ActivityIndicator
                  animating={this.state.isVisibleLoading}
                  size="large"
                  color="#0000ff"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

// products: [
//   {
//     heading: 'Bolognese Baked Potato',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: false,
//     isVeg: true,
//     time: '06:00 pm',
//     image: require('../../assets/food.jpg'),
//   },
//   {
//     heading: 'Lamb Stuffed Sweet Potato',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: true,
//     isVeg: false,
//     time: '06:00 pm',
//     image: require('../../assets/burger.jpg'),
//   },
//   {
//     heading: 'Merlin Super Jumbo',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: true,
//     time: '06:00 pm',
//     isVeg: true,
//     image: require('../../assets/sweet.jpg'),
//   },
//   {
//     heading: 'Lamb Stuffed Sweet Potato',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: 'none',
//     time: '06:00 pm',
//     isVeg: true,
//     image: require('../../assets/food.jpg'),
//   },
//   {
//     heading: 'Merlin Super Jumbo',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: true,
//     isVeg: false,
//     time: '06:00 pm',
//     image: require('../../assets/burger.jpg'),
//   },
//   {
//     heading: 'Bolognese Baked Potato',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: false,
//     time: '06:00 pm',
//     isVeg: true,
//     image: require('../../assets/sweet.jpg'),
//   },
//   {
//     heading: 'Lamb Stuffed Sweet Potato',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: 'none',
//     isVeg: false,
//     time: '06:00 pm',
//     image: require('../../assets/burger.jpg'),
//   },
//   {
//     heading: 'Bolognese Baked Potato',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: true,
//     isVeg: true,
//     time: '06:00 pm',
//     image: require('../../assets/sweet.jpg'),
//   },
//   {
//     heading: 'Bolognese Baked Potato',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: false,
//     time: '06:00 pm',
//     isVeg: true,
//     image: require('../../assets/sweet.jpg'),
//   },
//   {
//     heading: 'Lamb Stuffed Sweet Potato',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: 'none',
//     isVeg: false,
//     time: '06:00 pm',
//     image: require('../../assets/burger.jpg'),
//   },
//   {
//     heading: 'Bolognese Baked Potato',
//     address: 'Amrit Sweets, Phase 5, Mohali',
//     isLiked: true,
//     isVeg: true,
//     time: '06:00 pm',
//     image: require('../../assets/sweet.jpg'),
//   },
// ],
