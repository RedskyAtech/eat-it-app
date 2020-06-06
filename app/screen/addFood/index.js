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

export default class addFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
      dishName: '',
      visibleCategory: false,
      category: 'Veg',
      visiblePurpose: false,
      purpose:'Sale',
      visibleFrom:false,
      from:'Restaurant'
    };
  }
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
  closePurposeMenu=async()=>{
    await this.setState({visiblePurpose: false});
  };
  openPurposeMenu = async () => {
    await this.setState({visiblePurpose: true});
  };
  closeFromMenu=async()=>{
    await this.setState({visibleFrom: false});
  };
  openFromMenu = async () => {
    await this.setState({visibleFrom: true});
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
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Veg</Text>
                    <Image
                      source={require('../../assets/down_arrow.png')}
                      style={picker_icons}
                    />
                  </View>
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
                    <Menu.Item
                      titleStyle={[menu_list_title]}
                      style={list_item_height}
                      onPress={() => {
                        this.setState({
                          category: 'Veg',
                          visibleCategory: false,
                        });
                      }}
                      title="Veg"
                    />
                    <Menu.Item
                      titleStyle={[menu_list_title]}
                      style={list_item_height}
                      onPress={() => {
                        this.setState({
                          category: 'Non-veg',
                          visibleCategory: false,
                        });
                      }}
                      title="Non-veg"
                    />
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
                    <Menu.Item
                      titleStyle={[menu_list_title]}
                      style={list_item_height}
                      onPress={() => {
                        this.setState({
                          purpose: 'Sale',
                          visiblePurpose: false,
                        });
                      }}
                      title="Sale"
                    />
                    <Menu.Item
                      titleStyle={[menu_list_title]}
                      style={list_item_height}
                      onPress={() => {
                        this.setState({
                          purpose: 'Share',
                          visiblePurpose: false,
                        });
                      }}
                      title="Share"
                    />
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
                    <Menu.Item
                      titleStyle={[menu_list_title]}
                      style={list_item_height}
                      onPress={() => {
                        this.setState({
                          from: 'Restaurant',
                          visibleFrom: false,
                        });
                      }}
                      title="Restaurant"
                    />
                    <Menu.Item
                      titleStyle={[menu_list_title]}
                      style={list_item_height}
                      onPress={() => {
                        this.setState({
                          from: 'Home made',
                          visibleFrom: false,
                        });
                      }}
                      title="Home made"
                    />
                  </Menu>

                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Cooking date</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Veg</Text>
                    <Image
                      source={require('../../assets/calender.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Cooking time</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Veg</Text>
                    <Image
                      source={require('../../assets/clock_black.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Portions</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Veg</Text>
                    <Image
                      source={require('../../assets/down_arrow.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Pickup time</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Veg</Text>
                    <Image
                      source={require('../../assets/clock_black.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Home delivery</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Veg</Text>
                    <Image
                      source={require('../../assets/down_arrow.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Home delivery price</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Veg</Text>
                    <Image
                      source={require('../../assets/price_tag.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Price</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <Text style={picker_label}>Veg</Text>
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
