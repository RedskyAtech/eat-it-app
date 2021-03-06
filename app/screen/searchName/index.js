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
import * as Url from '../../constants/urls';
import * as colors from '../../constants/colors';
import {widthPercentageToDP as wp} from '../../utility/index';
import * as utility from '../../utility/index';
export default class searchName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      products: [],
      query: '',
      isVisibleLoading: false,
      cuisineId: '',
      noDataExist: false,
      filters: '',
      count: 1,
      isLangar: false,
    };
    this.refersh = this.refersh.bind(this);
    this.onCuisines = this.onCuisines.bind(this);
  }
  componentDidMount = async () => {
    let name;
    let cuisineId;
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.from == 'home') {
        if (this.props.navigation.state.params.name) {
          name = this.props.navigation.state.params.name;
        }
        if (name != '') {
          await this.setState({name: name});
          this.setState({query: `name=${this.state.name}&searchType=food`});
          // await this.getFood();
        }
      } else if (this.props.navigation.state.params.from == 'search') {
        if (this.props.navigation.state.params.cuisineId) {
          cuisineId = this.props.navigation.state.params.cuisineId;
        }
        if (this.props.navigation.state.params.cuisineName) {
          name = this.props.navigation.state.params.cuisineName;
        }
        await this.setState({cuisineId: cuisineId, name: name});
        await this.setState({
          query: `cuisineId=${this.state.cuisineId}&searchType=food`,
        });
        // await this.getFood();
      } else if (this.props.navigation.state.params.from == 'langar') {
        await this.setState({
          isLangar: true,
          name: 'Langar',
          query: `type=langar&searchType=food`,
        });
        // await this.getFood();
      }
      await this.getFood();
      await utility.setItem('lastSearchQuery', this.state.query);
    }
  };

  refersh = async filters => {
    console.log('filters:::::::::::::', filters, this.state.name);
    if (filters) {
      if (filters.type != '' && filters.from == '' && filters.cost == '') {
        await this.setState({
          query: `name=${this.state.name}&type=${filters.type}&searchType=food`,
        });
      } else if (
        filters.type == '' &&
        filters.from != '' &&
        filters.cost == ''
      ) {
        await this.setState({
          query: `name=${this.state.name}&foodCooked=${
            filters.from
          }&searchType=food`,
        });
      } else if (
        filters.type == '' &&
        filters.from == '' &&
        filters.cost != ''
      ) {
        if (filters.cost == 'paid') {
          if (filters.minPrice != '' && filters.maxPrice == '') {
            await this.setState({
              query: `name=${this.state.name}&cost=${filters.cost}&&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          } else if (filters.minPrice == '' && filters.maxPrice != '') {
            await this.setState({
              query: `name=${this.state.name}&cost=${filters.cost}&maxPrice=${
                filters.maxPrice
              }&searchType=food`,
            });
          } else {
            await this.setState({
              query: `name=${this.state.name}&cost=${filters.cost}&maxPrice=${
                filters.maxPrice
              }&minPrice=${filters.minPrice}&searchType=food`,
            });
          }
        } else {
          await this.setState({
            query: `name=${this.state.name}&cost=${
              filters.cost
            }&searchType=food`,
          });
        }
      } else if (
        filters.type != '' &&
        filters.from != '' &&
        filters.cost == ''
      ) {
        await this.setState({
          query: `name=${this.state.name}&type=${filters.type}&foodCooked=${
            filters.from
          }&searchType=food`,
        });
      } else if (
        filters.type == '' &&
        filters.from != '' &&
        filters.cost != ''
      ) {
        if (filters.cost == 'paid') {
          if (filters.minPrice != '' && filters.maxPrice == '') {
            await this.setState({
              query: `name=${this.state.name}&foodCooked=${filters.from}&cost=${
                filters.cost
              }&&minPrice=${filters.minPrice}&searchType=food`,
            });
          } else if (filters.minPrice == '' && filters.maxPrice != '') {
            await this.setState({
              query: `name=${this.state.name}&foodCooked=${filters.from}&cost=${
                filters.cost
              }&maxPrice=${filters.maxPrice}&searchType=food`,
            });
          } else {
            await this.setState({
              query: `name=${this.state.name}&foodCooked=${filters.from}&cost=${
                filters.cost
              }&maxPrice=${filters.maxPrice}&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          }
        } else {
          await this.setState({
            query: `name=${this.state.name}&foodCooked=${filters.from}&cost=${
              filters.cost
            }&searchType=food`,
          });
        }
      } else if (
        filters.type != '' &&
        filters.from == '' &&
        filters.cost != ''
      ) {
        if (filters.cost == 'paid') {
          if (filters.minPrice != '' && filters.maxPrice == '') {
            await this.setState({
              query: `name=${this.state.name}&type=${filters.type}&cost=${
                filters.cost
              }&&minPrice=${filters.minPrice}&searchType=food`,
            });
          } else if (filters.minPrice == '' && filters.maxPrice != '') {
            await this.setState({
              query: `name=${this.state.name}&type=${filters.type}&cost=${
                filters.cost
              }&maxPrice=${filters.maxPrice}&searchType=food`,
            });
          } else {
            await this.setState({
              query: `name=${this.state.name}&type=${filters.type}&cost=${
                filters.cost
              }&maxPrice=${filters.maxPrice}&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          }
        } else {
          await this.setState({
            query: `name=${this.state.name}&type=${filters.type}&cost=${
              filters.cost
            }&searchType=food`,
          });
        }
      } else if (
        filters.type != '' &&
        filters.from != '' &&
        filters.cost != ''
      ) {
        if (filters.cost == 'paid') {
          if (filters.minPrice != '' && filters.maxPrice == '') {
            await this.setState({
              query: `name=${this.state.name}&foodCooked=${filters.from}&type=${
                filters.type
              }&cost=${filters.cost}&&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          } else if (filters.minPrice == '' && filters.maxPrice != '') {
            await this.setState({
              query: `name=${this.state.name}&foodCooked=${filters.from}&type=${
                filters.type
              }&cost=${filters.cost}&maxPrice=${
                filters.maxPrice
              }&searchType=food`,
            });
          } else {
            await this.setState({
              query: `name=${this.state.name}&foodCooked=${filters.from}&type=${
                filters.type
              }&cost=${filters.cost}&maxPrice=${filters.maxPrice}&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          }
        } else {
          await this.setState({
            query: `name=${this.state.name}&foodCooked=${filters.from}&type=${
              filters.type
            }&cost=${filters.cost}&searchType=food`,
          });
        }
      } else {
        await this.setState({
          query: `name=${this.state.name}&searchType=food`,
        });
      }
      await this.getFood();
    }
  };

  onCuisines = async filters => {
    console.log('filters:::::::::::::', filters, this.state.name);
    if (filters) {
      if (filters.type != '' && filters.from == '' && filters.cost == '') {
        await this.setState({
          query: `cuisineId=${this.state.cuisineId}&type=${
            filters.type
          }&searchType=food`,
        });
      } else if (
        filters.type == '' &&
        filters.from != '' &&
        filters.cost == ''
      ) {
        await this.setState({
          query: `cuisineId=${this.state.cuisineId}&foodCooked=${
            filters.from
          }&searchType=food`,
        });
      } else if (
        filters.type == '' &&
        filters.from == '' &&
        filters.cost != ''
      ) {
        if (filters.cost == 'paid') {
          if (filters.minPrice != '' && filters.maxPrice == '') {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&cost=${
                filters.cost
              }&&minPrice=${filters.minPrice}&searchType=food`,
            });
          } else if (filters.minPrice == '' && filters.maxPrice != '') {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&cost=${
                filters.cost
              }&maxPrice=${filters.maxPrice}&searchType=food`,
            });
          } else {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&cost=${
                filters.cost
              }&maxPrice=${filters.maxPrice}&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          }
        } else {
          await this.setState({
            query: `cuisineId=${this.state.cuisineId}&cost=${
              filters.cost
            }&searchType=food`,
          });
        }
      } else if (
        filters.type != '' &&
        filters.from != '' &&
        filters.cost == ''
      ) {
        await this.setState({
          query: `cuisineId=${this.state.cuisineId}&type=${
            filters.type
          }&foodCooked=${filters.from}&searchType=food`,
        });
      } else if (
        filters.type == '' &&
        filters.from != '' &&
        filters.cost != ''
      ) {
        if (filters.cost == 'paid') {
          if (filters.minPrice != '' && filters.maxPrice == '') {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&foodCooked=${
                filters.from
              }&cost=${filters.cost}&&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          } else if (filters.minPrice == '' && filters.maxPrice != '') {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&foodCooked=${
                filters.from
              }&cost=${filters.cost}&maxPrice=${
                filters.maxPrice
              }&searchType=food`,
            });
          } else {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&foodCooked=${
                filters.from
              }&cost=${filters.cost}&maxPrice=${filters.maxPrice}&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          }
        } else {
          await this.setState({
            query: `cuisineId=${this.state.cuisineId}&foodCooked=${
              filters.from
            }&cost=${filters.cost}&searchType=food`,
          });
        }
      } else if (
        filters.type != '' &&
        filters.from == '' &&
        filters.cost != ''
      ) {
        if (filters.cost == 'paid') {
          if (filters.minPrice != '' && filters.maxPrice == '') {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&type=${
                filters.type
              }&cost=${filters.cost}&&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          } else if (filters.minPrice == '' && filters.maxPrice != '') {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&type=${
                filters.type
              }&cost=${filters.cost}&maxPrice=${
                filters.maxPrice
              }&searchType=food`,
            });
          } else {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&type=${
                filters.type
              }&cost=${filters.cost}&maxPrice=${filters.maxPrice}&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          }
        } else {
          await this.setState({
            query: `cuisineId=${this.state.cuisineId}&type=${
              filters.type
            }&cost=${filters.cost}&searchType=food`,
          });
        }
      } else if (
        filters.type != '' &&
        filters.from != '' &&
        filters.cost != ''
      ) {
        if (filters.cost == 'paid') {
          if (filters.minPrice != '' && filters.maxPrice == '') {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&foodCooked=${
                filters.from
              }&type=${filters.type}&cost=${filters.cost}&&minPrice=${
                filters.minPrice
              }&searchType=food`,
            });
          } else if (filters.minPrice == '' && filters.maxPrice != '') {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&foodCooked=${
                filters.from
              }&type=${filters.type}&cost=${filters.cost}&maxPrice=${
                filters.maxPrice
              }&searchType=food`,
            });
          } else {
            await this.setState({
              query: `cuisineId=${this.state.cuisineId}&foodCooked=${
                filters.from
              }&type=${filters.type}&cost=${filters.cost}&maxPrice=${
                filters.maxPrice
              }&minPrice=${filters.minPrice}&searchType=food`,
            });
          }
        } else {
          await this.setState({
            query: `cuisineId=${this.state.cuisineId}&foodCooked=${
              filters.from
            }&type=${filters.type}&cost=${filters.cost}&searchType=food`,
          });
        }
      } else {
        await this.setState({
          query: `cuisineId=${this.state.cuisineId}&searchType=food`,
        });
      }
      await this.getFood();
    }
  };

  onNameChange = async name => {
    if (name == '') {
      await this.setState({products: [], name});
    } else {
      await this.setState({name});
      await this.setState({query: `name=${this.state.name}&searchType=food`});
      await utility.setItem('lastSearchQuery', this.state.query);
      await this.getFood();
    }
  };

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
              this.setState({noDataExist: false});

              let tempProducts = [];
              for (let i = 0; i < res.data.length; i++) {
                let image;
                if (res.data[i].images) {
                  image = res.data[i].images[0].url;
                }
                tempProducts.push({
                  id: res.data[i]._id,
                  type: res.data[i].type,
                  name: res.data[i].name,
                  price: res.data[i].price,
                  time: res.data[i].cookingTime,
                  address: res.data[i].address,
                  image: image,
                  type: res.data[i].type,
                });
              }
              this.setState({products: tempProducts, isVisibleLoading: false});
            } else {
              this.setState({noDataExist: true, isVisibleLoading: false});
            }
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

  onFilter = async () => {
    if (this.state.cuisineId == '') {
      this.props.navigation.navigate('Filter', {
        from: 'name',
        refresh: this.refersh,
      });
    } else {
      this.props.navigation.navigate('Filter', {
        from: 'cuisines',
        onCuisines: this.onCuisines,
      });
    }
  };
  onListItem = async foodId => {
    await this.props.navigation.navigate('FoodDetails', {
      foodId: foodId,
      from: 'search',
    });
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
      centered_text,
      search_icon,
      yellow_color,
      free_text,
      loader,
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
                placeholder="Search food"
                style={search_input}
                onChangeText={name => this.onNameChange(name)}
                value={this.state.name}
              />
            </View>
            <TouchableOpacity
              onPress={!this.state.isLangar ? this.onFilter : () => {}}>
              <Image
                resizeMode="contain"
                source={require('../../assets/filter_yellow.png')}
                style={icons}
              />
            </TouchableOpacity>
          </View>
          {!this.state.noDataExist ? (
            <View style={list_height}>
              <ScrollView>
                {this.state.products.map(value => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => this.onListItem(value.id)}>
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
                                <Text style={product_heading}>
                                  {value.name}
                                </Text>
                              </View>
                              <Text style={address_text}>{value.address}</Text>
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
                        <View style={[column, column_between_spacing]}>
                          <View />
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
