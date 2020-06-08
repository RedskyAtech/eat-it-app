import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import styles from './style';
import {Menu, Provider} from 'react-native-paper';
import {Slider} from 'react-native-elements';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';

export default class addFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
      dishName: '',
      visibleCategory: false,
      category: 'Veg',
      categories: [
        {
          name: 'Veg',
        },
        {
          name: 'Non-veg',
        },
      ],
      visiblePurpose: false,
      purpose: 'Sale',
      purposes: [
        {
          name: 'Sale',
        },
        {
          name: 'Share',
        },
      ],
      visibleFrom: false,
      from: 'Restaurant',
      cookedFrom: [
        {
          name: 'Restaurant',
        },
        {
          name: 'Home made',
        },
      ],
      visiblePortions: false,
      portion: 'One',
      portions: [
        {
          name: 'One',
        },
        {
          name: 'Half',
        },
        {
          name: 'Quatar',
        },
      ],
      homedelivery: 'Yes',
      visibleHomeDelivery: false,
      homeDelValues: [
        {
          name: 'Yes',
        },
        {
          name: 'No',
        },
      ],
      cuisions: [],
      cuision: '',
      visibleCuisions: false,
    };
  }
  componentDidMount = async () => {
    await this.getCuisions();
  };
  onBack = async () => {
    this.props.navigation.navigate('AttatchFoodPhotos');
  };
  onNext = async () => {
    this.props.navigation.navigate('tab1');
  };
  closeMenu = async () => {
    await this.setState({visibleCategory: false});
  };
  openMenu = async () => {
    await this.setState({visibleCategory: true});
  };
  closePurposeMenu = async () => {
    await this.setState({visiblePurpose: false});
  };
  openPurposeMenu = async () => {
    await this.setState({visiblePurpose: true});
  };
  closeFromMenu = async () => {
    await this.setState({visibleFrom: false});
  };
  openFromMenu = async () => {
    await this.setState({visibleFrom: true});
  };
  closePortionMenu = async () => {
    await this.setState({visiblePortions: false});
  };
  openPortionMenu = async () => {
    await this.setState({visiblePortions: true});
  };
  closeDeliveryMenu = async () => {
    await this.setState({visibleHomeDelivery: false});
  };
  openDeliveryMenu = async () => {
    await this.setState({visibleHomeDelivery: true});
  };
  closeCuisionMenu = async () => {
    await this.setState({visibleCuisions: false});
  };
  openCuisionMenu = async () => {
    await this.setState({visibleCuisions: true});
  };
  getCuisions = async () => {
    this.setState({cuisions: []});
    try {
      let response = Service.getDataApi(Url.GET_CUISIONS, '');
      response
        .then(res => {
          if (res.data) {
            if (res.data.length != 0) {
              let tempCuisions = [];
              for (let i = 0; i < res.data.length; i++) {
                tempCuisions.push({
                  id: res.data[i]._id,
                  name: res.data[i].name,
                });
              }
              this.setState({
                cuisions: tempCuisions,
                cuision: tempCuisions[0].name,
              });
            }
          } else {
            console.log('if no data in response:', res.error);
            alert(res.error);
          }
        })
        .catch(error => {
          console.log('api problem:', error.error);
          alert(error.error);
        });
    } catch (err) {
      console.log('another problem:', err);
      alert(err);
    }
  };
  render() {
    const {
      container,
      column,
      between_spacing,
      bottom_container,
      input_box,
      picker_icons,
      inner_container,
      spacing,
      row,
      arrow,
      heading_text,
      fields_container,
      field_label,
      fields,
      field_icons,
      fields_between_spacing,
      picker_style,
      picker_label,
      forward_container,
      menu_position,
      menu_background,
      menu_list_title,
      list_item_height,
    } = styles;
    return (
      <Provider>
        <ScrollView>
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
                <Text style={heading_text}>Add product detail</Text>
                <View>
                  <Text> </Text>
                </View>
              </View>
              <View style={fields_container}>
                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Cusinies</Text>
                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visibleCuisions}
                    onDismiss={this.closeCuisionMenu}
                    anchor={
                      <TouchableOpacity onPress={this.openCuisionMenu}>
                        <View style={[row, picker_style, between_spacing]}>
                          <Text style={picker_label}>{this.state.cuision}</Text>
                          <Image
                            source={require('../../assets/down_arrow.png')}
                            style={picker_icons}
                          />
                        </View>
                      </TouchableOpacity>
                    }>
                    {this.state.cuisions.map(value => {
                      return (
                        <Menu.Item
                          titleStyle={[menu_list_title]}
                          style={list_item_height}
                          onPress={() => {
                            this.setState({
                              cuision: value.name,
                              visibleCuisions: false,
                            });
                          }}
                          title={value.name}
                        />
                      );
                    })}
                  </Menu>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Category</Text>
                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visibleCategory}
                    onDismiss={this.closeMenu}
                    anchor={
                      <TouchableOpacity onPress={this.openMenu}>
                        <View style={[row, picker_style, between_spacing]}>
                          <Text style={picker_label}>
                            {this.state.category}
                          </Text>
                          <Image
                            source={require('../../assets/down_arrow.png')}
                            style={picker_icons}
                          />
                        </View>
                      </TouchableOpacity>
                    }>
                    {this.state.categories.map(value => {
                      return (
                        <Menu.Item
                          titleStyle={[menu_list_title]}
                          style={list_item_height}
                          onPress={() => {
                            this.setState({
                              category: value.name,
                              visibleCategory: false,
                            });
                          }}
                          title={value.name}
                        />
                      );
                    })}
                  </Menu>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>You want</Text>
                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visiblePurpose}
                    onDismiss={this.closePurposeMenu}
                    anchor={
                      <TouchableOpacity onPress={this.openPurposeMenu}>
                        <View style={[row, picker_style, between_spacing]}>
                          <Text style={picker_label}>{this.state.purpose}</Text>
                          <Image
                            source={require('../../assets/down_arrow.png')}
                            style={picker_icons}
                          />
                        </View>
                      </TouchableOpacity>
                    }>
                    {this.state.purposes.map(value => {
                      return (
                        <Menu.Item
                          titleStyle={[menu_list_title]}
                          style={list_item_height}
                          onPress={() => {
                            this.setState({
                              purpose: 'Sale',
                              visiblePurpose: false,
                            });
                          }}
                          title={value.name}
                        />
                      );
                    })}
                  </Menu>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>From</Text>
                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visibleFrom}
                    onDismiss={this.closeFromMenu}
                    anchor={
                      <TouchableOpacity onPress={this.openFromMenu}>
                        <View style={[row, picker_style, between_spacing]}>
                          <Text style={picker_label}>{this.state.from}</Text>
                          <Image
                            source={require('../../assets/down_arrow.png')}
                            style={picker_icons}
                          />
                        </View>
                      </TouchableOpacity>
                    }>
                    {this.state.cookedFrom.map(value => {
                      return (
                        <Menu.Item
                          titleStyle={[menu_list_title]}
                          style={list_item_height}
                          onPress={() => {
                            this.setState({
                              from: 'Sale',
                              visibleFrom: false,
                            });
                          }}
                          title={value.name}
                        />
                      );
                    })}
                  </Menu>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Cooking date</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>12/12/2012</Text>
                    <Image
                      source={require('../../assets/calender.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Cooking time</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>10:00 am</Text>
                    <Image
                      source={require('../../assets/clock_black.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Portions</Text>

                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visiblePortions}
                    onDismiss={this.closePortionMenu}
                    anchor={
                      <TouchableOpacity onPress={this.openPortionMenu}>
                        <View style={[row, picker_style, between_spacing]}>
                          <Text style={picker_label}>{this.state.portion}</Text>
                          <Image
                            source={require('../../assets/down_arrow.png')}
                            style={picker_icons}
                          />
                        </View>
                      </TouchableOpacity>
                    }>
                    {this.state.portions.map(value => {
                      return (
                        <Menu.Item
                          titleStyle={[menu_list_title]}
                          style={list_item_height}
                          onPress={() => {
                            this.setState({
                              portion: value.name,
                              visiblePortions: false,
                            });
                          }}
                          title={value.name}
                        />
                      );
                    })}
                  </Menu>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Pickup time</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>12:00 pm</Text>
                    <Image
                      source={require('../../assets/clock_black.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Home delivery</Text>
                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visibleHomeDelivery}
                    onDismiss={this.closeDeliveryMenu}
                    anchor={
                      <TouchableOpacity onPress={this.openDeliveryMenu}>
                        <View style={[row, picker_style, between_spacing]}>
                          <Text style={picker_label}>
                            {this.state.homedelivery}
                          </Text>
                          <Image
                            source={require('../../assets/down_arrow.png')}
                            style={picker_icons}
                          />
                        </View>
                      </TouchableOpacity>
                    }>
                    {this.state.homeDelValues.map(value => {
                      return (
                        <Menu.Item
                          titleStyle={[menu_list_title]}
                          style={list_item_height}
                          onPress={() => {
                            this.setState({
                              homedelivery: value.name,
                              visibleHomeDelivery: false,
                            });
                          }}
                          title={value.name}
                        />
                      );
                    })}
                  </Menu>
                </View>
                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Home delivery price</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Rs 10</Text>
                    <Image
                      source={require('../../assets/price_tag.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Price</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Rs 50</Text>
                    <Image
                      source={require('../../assets/price_tag.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, fields, fields_between_spacing]}>
                  <Image
                    source={require('../../assets/dish.png')}
                    style={field_icons}
                  />
                  <TextInput
                    placeholder="Dish name"
                    style={input_box}
                    onChangeText={dishName => this.setState({dishName})}
                    value={this.state.dishName}
                  />
                </View>

                <View style={[row, fields, fields_between_spacing]}>
                  <Image
                    source={require('../../assets/location_grey.png')}
                    style={field_icons}
                  />
                  <TextInput
                    placeholder="Dish address"
                    style={input_box}
                    onChangeText={dishName => this.setState({dishName})}
                    value={this.state.dishName}
                  />
                </View>
              </View>
            </View>

            <View style={bottom_container}>
              <Text />
              <TouchableOpacity activeOpacity={1} onPress={this.onNext}>
                <View style={forward_container}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/next_button_arrow.png')}
                    style={arrow}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}
