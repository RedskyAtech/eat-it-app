import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {Menu, Provider} from 'react-native-paper';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';
import {DatePicker, CheckBox} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import PriceSelection from '../priceSelection';

export default class addFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      cookingDate: new Date(),
      isTimePickerVisible: false,
      cookingTime: '',
      itemValue: '',
      pickupTime: '',
      dishAddress: '',
      description: '',
      isChecked: [],
      selectedLists: [],
      isDeliveryPriceDialogVisible: false,
      isPriceDialogVisible: false,
      deliveryPrice: 0,
      price: 0,
      isLangar: false,
      isVisibleLoading: false,
      images: [],

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
      userToken: '',
    };
    this.setDate = this.setDate.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.ondeliveryPriceChange = this.ondeliveryPriceChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
  }
  componentDidMount = async () => {
    const token = await utility.getToken('token');
    this.setState({userToken: token});
    await this.getCuisions();
    let initialCheck = this.state.cuisions.map(() => false);
    this.setState({isChecked: initialCheck});
    if (
      this.props.navigation.state.params.images &&
      this.props.navigation.state.params.images.length != 0
    ) {
      let images = this.props.navigation.state.params.images;
      console.log('imagessssss:');
      console.log('imagessssss:', images);
      await this.setState({images: images});
    }
  };
  onChecked = async (index, item) => {
    let {isChecked, selectedLists} = this.state;
    isChecked[index] = !isChecked[index];
    this.setState({isChecked: isChecked});
    if (isChecked[index] == true) {
      if (item.name == 'Langar') {
        await this.setState({isLangar: true, price: 0});
      }
      if (selectedLists.length < 3) {
        selectedLists.push({
          id: item.id,
        });
        this.setState({cuision: item.name});
      } else {
        isChecked[index] = !isChecked[index];
        this.setState({isChecked: isChecked});
        alert('You can add only three cuisions');
      }
    } else {
      if (item.name == 'Langar') {
        await this.setState({isLangar: false});
      }
      selectedLists.pop({
        id: item.id,
      });
      if (selectedLists.length == 0) {
        this.setState({cuision: ''});
      }
    }
    console.log('selectedList:::', selectedLists);
  };
  onAddFood = async () => {
    if (
      utility.isFieldEmpty(
        this.state.dishName &&
          this.state.category &&
          this.state.purpose &&
          this.state.from &&
          this.state.cookingDate &&
          this.state.cookingTime &&
          this.state.pickupTime &&
          this.state.homedelivery &&
          this.state.dishAddress &&
          this.state.description &&
          this.state.price,
      )
    ) {
      alert('All fields are required');
      return;
    } else if (
      this.state.selectedLists &&
      this.state.selectedLists.length == 0
    ) {
      alert('Cuisions are required');
    } else {
      let type;
      let foodCooked;
      let price;
      if (this.state.isLangar) {
        price = 0;
      } else {
        price = this.state.price;
      }
      if (this.state.category == 'Non-veg') {
        type = 'nonVeg';
      } else {
        type = 'veg';
      }
      if (this.state.from == 'Restaurant') {
        foodCooked = 'restaurant';
      } else {
        foodCooked = 'homemade';
      }
      this.setState({isVisibleLoading: true});
      let body = {
        name: this.state.dishName,
        youWant: this.state.purpose.toLowerCase(),
        type: type,
        homeDelivery: this.state.homedelivery.toLowerCase(),
        homeDeliveryPrice: this.state.homeDeliveryPrice,
        portion: this.state.portion.toLowerCase(),
        cookingTime: this.state.cookingTime,
        cookingDate: this.state.cookingDate,
        pickupTime: this.state.pickupTime,
        foodCooked: foodCooked,
        price: price,
        address: this.state.dishAddress,
        description: this.state.description,
        cuisine: this.state.selectedLists,
        images: this.state.images,
      };
      console.log('bodyyyyyyyyyy::::', body);
      try {
        let response = Service.postDataApi(
          Url.ADD_FOOD,
          body,
          this.state.userToken,
        );
        response
          .then(res => {
            if (res.data) {
              if (res.isSuccess == true) {
                alert('added successfully');

                this.setState({
                  cuision: '',
                  category: 'Veg',
                  purpose: 'Restaurant',
                  cookingTime: '',
                  cookingDate: '',
                  portion: 'One',
                  pickupTime: '',
                  homedelivery: 'Yes',
                  deliveryPrice: 0,
                  price: 0,
                  isVisibleLoading: false,
                });
                this.props.navigation.navigate('tab1');
              }
            } else {
              this.setState({isVisibleLoading: false});
              alert(res.error);
              console.log('errorrr:', res.error);
            }
          })
          .catch(error => {
            this.setState({isVisibleLoading: false});
            alert(error.error);
            console.log('errorrr:', error.error);
          });
      } catch (err) {
        this.setState({isVisibleLoading: false});
        alert('try:', err);
      }
    }
  };
  setDate(newDate) {
    let date = moment(newDate).format('YYYY-MM-DD');
    this.setState({cookingDate: date});
  }
  showTimePicker = async () => {
    this.setState({isTimePickerVisible: true});
  };
  hideDatePicker = async () => {
    this.setState({isTimePickerVisible: false});
  };
  handleConfirm(date) {
    let time = moment(date).format('hh:mm a');
    this.setState({cookingTime: time, isTimePickerVisible: false});
  }

  onBack = async () => {
    this.props.navigation.navigate('AttatchFoodPhotos');
  };
  onNext = async () => {
    await this.onAddFood();
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
                  name:
                    res.data[i].name.slice(0, 1).toUpperCase() +
                    res.data[i].name.slice(1, res.data[i].name.length),
                });
              }
              this.setState({
                cuisions: tempCuisions,
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
  showDialog = async () => {
    if (this.state.homedelivery == 'Yes') {
      await this.setState({isDeliveryPriceDialogVisible: true});
    } else {
      alert('Home delivery should be enabled');
    }
  };
  closeDialog = async () => {
    this.setState({isDeliveryPriceDialogVisible: false});
  };
  showPriceDialog = async () => {
    await this.setState({isPriceDialogVisible: true});
  };
  closePriceDialog = async () => {
    this.setState({isPriceDialogVisible: false});
  };
  ondeliveryPriceChange(value) {
    let tempValue = value.toFixed(0);
    console.log('loggggggg', value.toFixed(0));
    this.setState({deliveryPrice: tempValue});
  }
  onPriceChange(value) {
    let tempValue = value.toFixed(0);
    console.log('loggggggg', value.toFixed(0));
    this.setState({price: tempValue});
  }

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
      date_picker_text,
      placeholder_text,
      input_box_style,
      ckeckbox,
      checkbox_container,
      checkbox_list,
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
                          {this.state.cuision == '' ? (
                            <Text style={placeholder_text}>Select items</Text>
                          ) : (
                            <Text style={picker_label}>
                              {this.state.cuision}
                            </Text>
                          )}
                          <Image
                            source={require('../../assets/down_arrow.png')}
                            style={picker_icons}
                          />
                        </View>
                      </TouchableOpacity>
                    }>
                    {this.state.cuisions.map(value => {
                      let index = this.state.cuisions.indexOf(value);
                      return (
                        <View style={[row, checkbox_container]}>
                          <CheckBox
                            checked={this.state.isChecked[index]}
                            color="grey"
                            onPress={() => this.onChecked(index, value)}
                            style={ckeckbox}
                          />
                          <Menu.Item
                            titleStyle={[menu_list_title]}
                            style={checkbox_list}
                            onPress={() => {}}
                            title={value.name}
                          />
                        </View>
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
                              purpose: value.name,
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
                              from: value.name,
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
                    <DatePicker
                      locale={'en'}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={'fade'}
                      androidMode={'default'}
                      placeHolderText="Select date"
                      textStyle={date_picker_text}
                      placeHolderTextStyle={placeholder_text}
                      onDateChange={this.setDate}
                      disabled={false}
                    />
                    <Image
                      source={require('../../assets/calender.png')}
                      style={picker_icons}
                    />
                  </View>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Cooking time</Text>
                  <View style={[row, picker_style, between_spacing]}>
                    <DateTimePickerModal
                      isVisible={this.state.isTimePickerVisible}
                      mode="time"
                      placeHolderText="Select Time"
                      is24Hour={false}
                      onConfirm={this.handleConfirm}
                      onCancel={this.hideDatePicker}
                    />
                    <TouchableOpacity onPress={this.showTimePicker}>
                      {this.state.cookingTime == '' ? (
                        <Text style={placeholder_text}>Select time</Text>
                      ) : (
                        <Text style={picker_label}>
                          {this.state.cookingTime}
                        </Text>
                      )}
                    </TouchableOpacity>
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
                    <TextInput
                      placeholder="From-to"
                      style={input_box_style}
                      onChangeText={pickupTime => this.setState({pickupTime})}
                      value={this.state.pickupTime}
                    />
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
                  <TouchableOpacity onPress={this.showDialog}>
                    <View style={[row, picker_style, between_spacing]}>
                      <Text style={picker_label}>
                        Rs {this.state.deliveryPrice}
                      </Text>
                      <Image
                        source={require('../../assets/price_tag.png')}
                        style={picker_icons}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {this.state.isDeliveryPriceDialogVisible ? (
                  <PriceSelection
                    visible={this.state.isDeliveryPriceDialogVisible}
                    closeDialog={this.closeDialog}
                    from={'deliveryPrice'}
                    ondeliveryPriceChange={this.ondeliveryPriceChange}
                  />
                ) : (
                  <View />
                )}

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Price</Text>
                  <TouchableOpacity
                    onPress={
                      !this.state.isLangar ? this.showPriceDialog : () => {}
                    }>
                    <View style={[row, picker_style, between_spacing]}>
                      <Text style={picker_label}>Rs {this.state.price}</Text>
                      <Image
                        source={require('../../assets/price_tag.png')}
                        style={picker_icons}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {this.state.isPriceDialogVisible ? (
                  <PriceSelection
                    visible={this.state.isPriceDialogVisible}
                    closeDialog={this.closePriceDialog}
                    from={'price'}
                    onPriceChange={this.onPriceChange}
                  />
                ) : (
                  <View />
                )}

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
                    onChangeText={dishAddress => this.setState({dishAddress})}
                    value={this.state.dishAddress}
                  />
                </View>
                <View style={[row, fields, fields_between_spacing]}>
                  <Image
                    source={require('../../assets/dish.png')}
                    style={field_icons}
                  />
                  <TextInput
                    placeholder="Dish description"
                    style={input_box}
                    onChangeText={description => this.setState({description})}
                    value={this.state.description}
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
            <View style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
              <ActivityIndicator
                animating={this.state.isVisibleLoading}
                size="large"
                color="#0000ff"
              />
            </View>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}
