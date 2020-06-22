import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {Menu, Provider} from 'react-native-paper';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';
import * as colors from '../../constants/colors';
import {DatePicker, CheckBox} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {NavigationActions, StackActions} from 'react-navigation';
// import RNDurationPicker from 'react-native-duration-picker';

export default class addFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      // cookingDate: new Date(),
      isTimePickerVisible: false,
      cookingTime: '',
      isToTimePickerVisible: false,
      toPickupTime: '',
      toPickupDateTime: Date(),
      isFromTimePickerVisible: false,
      fromPickupTime: '',
      fromPickupDateTime: Date(),
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCookingTime: false,

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
      photos: [],
      noHomeDelivery: false,

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
        {
          name: 'Langar',
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
          name: 'Quarter',
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
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  componentDidMount = async () => {
    const token = await utility.getToken('token');
    this.setState({userToken: token});
    await this.getCuisions();
    let initialCheck = this.state.cuisions.map(() => false);
    this.setState({isChecked: initialCheck});
    if (this.props.navigation.state.params) {
      if (
        this.props.navigation.state.params.photos &&
        this.props.navigation.state.params.photos.length != 0
      ) {
        let photos = this.props.navigation.state.params.photos;
        console.log('imagessssss:');
        console.log('imagessssss:', photos);
        await this.setState({photos: photos});
      }
    }
  };
  onChecked = async (index, item) => {
    let {isChecked, selectedLists} = this.state;
    isChecked[index] = !isChecked[index];
    this.setState({isChecked: isChecked});
    if (isChecked[index] == true) {
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
      selectedLists.pop({
        id: item.id,
      });
      if (selectedLists.length == 0) {
        this.setState({cuision: ''});
      }
    }
    console.log('selectedList:::', selectedLists);
  };
  onAddFoodValidations = async () => {
    let type;
    let foodCooked;
    let price;
    let body;

    if (this.state.category == 'Non-veg') {
      type = 'nonVeg';
    } else if (this.state.category == 'Langar') {
      type = 'langar';
    } else {
      type = 'veg';
    }
    if (this.state.from == 'Restaurant') {
      foodCooked = 'restaurant';
    } else {
      foodCooked = 'homemade';
    }
    if (this.state.isLangar) {
      price = 0;
      body = {
        type: type,
        cookingTime: this.state.cookingTime,
        pickupTime: {
          from: this.state.fromPickupTime,
          to: this.state.toPickupTime,
        },
        name: this.state.dishName,
        address: this.state.dishAddress,
        description: this.state.description,
        images: this.state.images,
        price: price,
      };
    } else {
      price = this.state.price;
      body = {
        name: this.state.dishName,
        type: type,
        homeDelivery: this.state.homedelivery.toLowerCase(),
        homeDeliveryPrice: this.state.deliveryPrice,
        portion: this.state.portion.toLowerCase(),
        cookingTime: this.state.cookingTime,
        pickupTime: {
          from: this.state.fromPickupTime,
          to: this.state.toPickupTime,
        },
        foodCooked: foodCooked,
        price: price,
        address: this.state.dishAddress,
        description: this.state.description,
        cuisine: this.state.selectedLists,
        images: this.state.images,
      };
    }
    this.setState({isVisibleLoading: true});

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
              alert('Added successfully');

              this.setState({
                cuision: '',
                category: 'Veg',
                from: 'Restaurant',
                cookingTime: '',
                portion: 'One',
                toPickupDateTime: Date(),
                fromPickupDateTime: Date(),
                homedelivery: 'Yes',
                deliveryPrice: 0,
                price: 0,
                isVisibleLoading: false,
              });
              this.props.navigation.dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: 'BottomTab'}),
                  ],
                }),
              );
              this.props.navigation.navigate('tab1');
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
  onAddFood = async () => {
    if (!this.state.isLangar) {
      if (
        utility.isFieldEmpty(
          this.state.category &&
            this.state.from &&
            this.state.cookingTime &&
            this.state.portion &&
            this.state.fromPickupTime &&
            this.state.toPickupTime &&
            this.state.homedelivery &&
            this.state.dishName &&
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
        return;
      }
    } else {
      if (
        utility.isFieldEmpty(
          this.state.cookingTime &&
            this.state.fromPickupTime &&
            this.state.toPickupTime &&
            this.state.dishName &&
            this.state.dishAddress &&
            this.state.description,
        )
      ) {
        alert('All fields are required');
        return;
      }
    }
    if (this.state.photos && this.state.photos != 0) {
      for (let file of this.state.photos) {
        if (file) {
          await this.onUploadImage(file);
        }
      }
    }
  };
  onUploadImage = async file => {
    await this.setState({isVisibleLoading: true});

    var formData = new FormData();
    let fileData = {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    };
    formData.append('file', fileData);
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };
    try {
      let response = Service.uploadImageApi(
        Url.UPLOAD_IMAGE,
        formData,
        headers,
      );
      response
        .then(res => {
          if (res.data) {
            if (res.data != null) {
              if (res.data.image != null) {
                var joined = this.state.images.concat({
                  url: res.data.image.url,
                  resize_url: res.data.image.resize_url,
                });
                this.setState({images: joined});
              }
              if (this.state.images.length == this.state.photos.length) {
                this.onAddFoodValidations();
              }
            }
            this.setState({isVisibleLoading: false});
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
  showTimePicker = async from => {
    if (from == 'cookingTime') {
      await this.setState({isTimePickerVisible: true});
    }
    if (from == 'fromPickupTime') {
      await this.setState({isFromTimePickerVisible: true});
    }
    if (from == 'toPickupTime') {
      await this.setState({isToTimePickerVisible: true});
    }
  };
  hideTimePicker = async from => {
    if (from == 'cookingTime') {
      await this.setState({isTimePickerVisible: false});
    }
    if (from == 'fromPickupTime') {
      await this.setState({isFromTimePickerVisible: false});
    }
    if (from == 'toPickupTime') {
      await this.setState({isToTimePickerVisible: false});
    }
  };
  handleConfirm = async (date, from) => {
    let time = moment(date).format('hh:mm a');
    if (from == 'cookingTime') {
      await this.setState({cookingTime: time, isTimePickerVisible: false});
    }
    if (from == 'fromPickupTime') {
      await this.setState({
        fromPickupTime: time,
        isFromTimePickerVisible: false,
        fromPickupDateTime: date,
      });
    }
    if (from == 'toPickupTime') {
      await this.setState({
        toPickupTime: time,
        toPickupDateTime: date,
        isToTimePickerVisible: false,
      });
    }
  };
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
  onCategoryChange = async value => {
    console.log('valueeeee:', value);
    if (value.name == 'Langar') {
      await this.setState({isLangar: true});
    } else {
      await this.setState({isLangar: false});
    }
    await this.setState({category: value.name, visibleCategory: false});
  };
  onHomeDeliveryChange = async value => {
    console.log('valueeeee', value);
    if (value.name == 'No') {
      await this.setState({noHomeDelivery: true});
    } else {
      await this.setState({noHomeDelivery: false});
    }
    console.log('noooo:', this.state.noHomeDelivery);
    await this.setState({homedelivery: value.name, visibleHomeDelivery: false});
  };
  // onDuration = async () => {
  //   RNDurationPicker.open({
  //     hour: 3,
  //     minute: 16,
  //     interval: 1,
  //     title: 'Austin',
  //   }).then(result => {
  //     if (result.action === 'setAction') {
  //       const hours = result.hour;
  //       const minutes = result.minute;
  //       const cookingTime =
  //         result.hour + ' ' + 'hours' + ' ' + result.minute + ' ' + 'min';
  //       this.setState({
  //         cookingTime: cookingTime,
  //       });
  //     }
  //   });
  // };
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
      placeholder_text,
      ckeckbox,
      price_input_box_style,
      checkbox_container,
      checkbox_list,
      disabled_color,
      extra_bottom_spacing,
      extra_top_spacing,
      loader,
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
                <Text style={heading_text}>Add food detail</Text>
                <View>
                  <Text> </Text>
                </View>
              </View>
              <View style={fields_container}>
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
                          onPress={() => this.onCategoryChange(value)}
                          title={value.name}
                        />
                      );
                    })}
                  </Menu>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Cusinies</Text>
                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visibleCuisions}
                    onDismiss={this.closeCuisionMenu}
                    anchor={
                      <TouchableOpacity
                        onPress={
                          !this.state.isLangar ? this.openCuisionMenu : () => {}
                        }>
                        <View
                          style={[
                            row,
                            picker_style,
                            between_spacing,
                            !this.state.isLangar ? '' : disabled_color,
                          ]}>
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
                            style={[checkbox_list]}
                            onPress={() => this.onChecked(index, value)}
                            title={value.name}
                          />
                        </View>
                        // </TouchableOpacity>
                      );
                    })}
                  </Menu>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Prepared at</Text>
                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visibleFrom}
                    onDismiss={this.closeFromMenu}
                    anchor={
                      <TouchableOpacity
                        onPress={
                          !this.state.isLangar ? this.openFromMenu : () => {}
                        }>
                        <View
                          style={[
                            row,
                            picker_style,
                            between_spacing,
                            !this.state.isLangar ? '' : disabled_color,
                          ]}>
                          <Text
                            style={
                              !this.state.isLangar
                                ? picker_label
                                : placeholder_text
                            }>
                            {this.state.from}
                          </Text>
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
                  <Text style={field_label}>Cooking time</Text>

                  <TouchableOpacity
                    onPress={() => this.showTimePicker('cookingTime')}
                    // onPress={this.onDuration}
                  >
                    <View style={[row, picker_style, between_spacing]}>
                      <DateTimePickerModal
                        isVisible={this.state.isTimePickerVisible}
                        mode="time"
                        placeHolderText="Select Time"
                        is24Hour={false}
                        onConfirm={date =>
                          this.handleConfirm(date, 'cookingTime')
                        }
                        onCancel={() => this.hideTimePicker('cookingTime')}
                      />

                      {this.state.cookingTime == '' ? (
                        <Text style={placeholder_text}>Select time</Text>
                      ) : (
                        <Text style={picker_label}>
                          {this.state.cookingTime}
                        </Text>
                      )}
                      <Image
                        source={require('../../assets/clock_black.png')}
                        style={picker_icons}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Portions</Text>

                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visiblePortions}
                    onDismiss={this.closePortionMenu}
                    anchor={
                      <TouchableOpacity
                        onPress={
                          !this.state.isLangar ? this.openPortionMenu : () => {}
                        }>
                        <View
                          style={[
                            row,
                            picker_style,
                            between_spacing,
                            !this.state.isLangar ? '' : disabled_color,
                          ]}>
                          <Text
                            style={
                              !this.state.isLangar
                                ? picker_label
                                : placeholder_text
                            }>
                            {this.state.portion}
                          </Text>
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
                  <View style={column}>
                    <TouchableOpacity
                      onPress={() => this.showTimePicker('fromPickupTime')}>
                      <View
                        style={[
                          row,
                          picker_style,
                          between_spacing,
                          extra_bottom_spacing,
                        ]}>
                        <DateTimePickerModal
                          isVisible={this.state.isFromTimePickerVisible}
                          mode="time"
                          placeHolderText="From Time"
                          is24Hour={false}
                          onConfirm={date =>
                            this.handleConfirm(date, 'fromPickupTime')
                          }
                          onCancel={() => this.hideTimePicker('fromPickupTime')}
                        />

                        {this.state.fromPickupTime == '' ? (
                          <Text style={placeholder_text}>From time</Text>
                        ) : (
                          <Text style={picker_label}>
                            {this.state.fromPickupTime}
                          </Text>
                        )}
                        <Image
                          source={require('../../assets/clock_black.png')}
                          style={picker_icons}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.showTimePicker('toPickupTime')}>
                      <View
                        style={[
                          row,
                          picker_style,
                          between_spacing,
                          extra_top_spacing,
                        ]}>
                        <DateTimePickerModal
                          isVisible={this.state.isToTimePickerVisible}
                          mode="time"
                          placeHolderText="To Time"
                          is24Hour={false}
                          onConfirm={date =>
                            this.handleConfirm(date, 'toPickupTime')
                          }
                          onCancel={() => this.hideTimePicker('toPickupTime')}
                        />

                        {this.state.toPickupTime == '' ? (
                          <Text style={placeholder_text}>To time</Text>
                        ) : (
                          <Text style={picker_label}>
                            {this.state.toPickupTime}
                          </Text>
                        )}
                        <Image
                          source={require('../../assets/clock_black.png')}
                          style={picker_icons}
                        />
                      </View>
                    </TouchableOpacity>
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
                      <TouchableOpacity
                        onPress={
                          !this.state.isLangar
                            ? this.openDeliveryMenu
                            : () => {}
                        }>
                        <View
                          style={[
                            row,
                            picker_style,
                            between_spacing,
                            !this.state.isLangar ? '' : disabled_color,
                          ]}>
                          <Text
                            style={
                              !this.state.isLangar
                                ? picker_label
                                : placeholder_text
                            }>
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
                          onPress={() => this.onHomeDeliveryChange(value)}
                          // onPress={{
                          //   this.setState({
                          //     homedelivery: value.name,
                          //     visibleHomeDelivery: false,
                          //   });
                          // }}
                          title={value.name}
                        />
                      );
                    })}
                  </Menu>
                </View>
                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Delivery charges</Text>
                  <TouchableOpacity>
                    <View
                      style={[
                        row,
                        picker_style,
                        between_spacing,
                        !this.state.isLangar
                          ? !this.state.noHomeDelivery
                            ? ''
                            : disabled_color
                          : disabled_color,
                      ]}>
                      <Text
                        style={
                          !this.state.isLangar
                            ? !this.state.noHomeDelivery
                              ? picker_label
                              : placeholder_text
                            : placeholder_text
                        }>
                        Rs
                      </Text>
                      <TextInput
                        placeholder="0"
                        style={price_input_box_style}
                        onChangeText={deliveryPrice =>
                          this.setState({deliveryPrice})
                        }
                        value={this.state.deliveryPrice}
                        editable={
                          !this.state.isLangar
                            ? !this.state.noHomeDelivery
                              ? true
                              : false
                            : false
                        }
                      />
                      <Image
                        source={require('../../assets/price_tag.png')}
                        style={picker_icons}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Price</Text>
                  <TouchableOpacity>
                    <View
                      style={[
                        row,
                        picker_style,
                        between_spacing,
                        !this.state.isLangar ? '' : disabled_color,
                      ]}>
                      <Text
                        style={
                          !this.state.isLangar ? picker_label : placeholder_text
                        }>
                        Rs
                      </Text>
                      <TextInput
                        placeholder="0"
                        style={price_input_box_style}
                        onChangeText={price => this.setState({price})}
                        value={this.state.price}
                        editable={!this.state.isLangar ? true : false}
                      />
                      <Image
                        source={require('../../assets/price_tag.png')}
                        style={picker_icons}
                      />
                    </View>
                  </TouchableOpacity>
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
            <View style={loader}>
              <ActivityIndicator
                animating={this.state.isVisibleLoading}
                size="large"
                color={colors.primaryColor}
              />
            </View>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}

// let type;
// let foodCooked;
// let price;
// let body;

// if (this.state.category == 'Non-veg') {
//   type = 'nonVeg';
// } else if (this.state.category == 'Langar') {
//   type = 'langar';
// } else {
//   type = 'veg';
// }
// if (this.state.from == 'Restaurant') {
//   foodCooked = 'restaurant';
// } else {
//   foodCooked = 'homemade';
// }
// if (this.state.isLangar) {
//   price = 0;
//   body = {
//     type: type,
//     cookingTime: this.state.cookingTime,
//     pickupTime: {
//       from: this.state.fromPickupTime,
//       to: this.state.toPickupTime,
//     },
//     name: this.state.dishName,
//     address: this.state.dishAddress,
//     description: this.state.description,
//     images: this.state.images,
//     price: price,
//   };
// } else {
//   price = this.state.price;
//   body = {
//     name: this.state.dishName,
//     type: type,
//     homeDelivery: this.state.homedelivery.toLowerCase(),
//     homeDeliveryPrice: this.state.deliveryPrice,
//     portion: this.state.portion.toLowerCase(),
//     cookingTime: this.state.cookingTime,
//     pickupTime: {
//       from: this.state.fromPickupTime,
//       to: this.state.toPickupTime,
//     },
//     foodCooked: foodCooked,
//     price: price,
//     address: this.state.dishAddress,
//     description: this.state.description,
//     cuisine: this.state.selectedLists,
//     images: this.state.images,
//   };
// }
// this.setState({isVisibleLoading: true});

// try {
//   let response = Service.postDataApi(
//     Url.ADD_FOOD,
//     body,
//     this.state.userToken,
//   );
//   response
//     .then(res => {
//       if (res.data) {
//         if (res.isSuccess == true) {
//           alert('Added successfully');

//           this.setState({
//             cuision: '',
//             category: 'Veg',
//             from: 'Restaurant',
//             cookingTime: '',
//             portion: 'One',
//             toPickupDateTime: Date(),
//             fromPickupDateTime: Date(),
//             homedelivery: 'Yes',
//             deliveryPrice: 0,
//             price: 0,
//             isVisibleLoading: false,
//           });
//           this.props.navigation.dispatch(
//             StackActions.reset({
//               index: 0,
//               actions: [
//                 NavigationActions.navigate({routeName: 'BottomTab'}),
//               ],
//             }),
//           );
//           this.props.navigation.navigate('DashBoard');
//           this.props.navigation.navigate('tab1');
//         }
//       } else {
//         this.setState({isVisibleLoading: false});
//         console.log('no data found', res.error);
//       }
//     })
//     .catch(error => {
//       this.setState({isVisibleLoading: false});
//       console.log('error in try-catch', error.error);
//       alert('Something went wrong');
//     });
// } catch (err) {
//   this.setState({isVisibleLoading: false});
//   console.log('another problem:', err);
//   alert('Something went wrong');
// }

// visiblePurpose: false,
// purpose: 'Sale',
// purposes: [
//   {
//     name: 'Sale',
//   },
//   {
//     name: 'Share',
//   },
// ],

// this.ondeliveryPriceChange = this.ondeliveryPriceChange.bind(this);
// this.onPriceChange = this.onPriceChange.bind(this);
// this.setDate = this.setDate.bind(this);

// setDate(newDate) {
//   let date = moment(newDate).format('YYYY-MM-DD');
//   this.setState({cookingDate: date});
// }

// closePurposeMenu = async () => {
//   await this.setState({visiblePurpose: false});
// };
// openPurposeMenu = async () => {
//   await this.setState({visiblePurpose: true});
// };

// showPriceDialog = async () => {
//   await this.setState({isPriceDialogVisible: true});
// };
// closePriceDialog = async () => {
//   this.setState({isPriceDialogVisible: false});
// };
// ondeliveryPriceChange(value) {
//   let tempValue = value.toFixed(0);
//   console.log('loggggggg', value.toFixed(0));
//   this.setState({deliveryPrice: tempValue});
// }
// onPriceChange(value) {
//   let tempValue = value.toFixed(0);
//   console.log('loggggggg', value.toFixed(0));
//   this.setState({price: tempValue});
// }
{
  /* {this.state.isDeliveryPriceDialogVisible ? (
                  <PriceSelection
                    visible={this.state.isDeliveryPriceDialogVisible}
                    closeDialog={this.closeDialog}
                    from={'deliveryPrice'}
                    ondeliveryPriceChange={this.ondeliveryPriceChange}
                  />
                ) : (
                  <View />
                )} */
}

{
  /* {this.state.isPriceDialogVisible ? (
                  <PriceSelection
                    visible={this.state.isPriceDialogVisible}
                    closeDialog={this.closePriceDialog}
                    from={'price'}
                    onPriceChange={this.onPriceChange}
                  />
                ) : (
                  <View />
                )} */
}

{
  /* <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>You want</Text>
                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visiblePurpose}
                    onDismiss={this.closePurposeMenu}
                    anchor={
                      <TouchableOpacity onPress={!this.state.isLangar?this.openPurposeMenu:()=>{}}>
                        <View style={[row, picker_style, between_spacing,!this.state.isLangar?'':disabled_color]}>
                          <Text style={!this.state.isLangar?picker_label:placeholder_text}>{this.state.purpose}</Text>
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
                </View> */
}

{
  /* <View style={[row, between_spacing, fields_between_spacing]}>
                  <Text style={field_label}>Cooking date</Text>
                  <View style={[row, picker_style, between_spacing,!this.state.isLangar?'':disabled_color]}>
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
                      disabled={!this.state.isLangar?false:true}
                    />
                    <Image
                      source={require('../../assets/calender.png')}
                      style={picker_icons}
                    />
                  </View>
                </View> */
}
