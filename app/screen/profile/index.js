import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import {Menu, Provider} from 'react-native-paper';
import {heightPercentageToDP as hp} from '../../utility/index';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';
import Communication from '../communication';
import {NavigationActions, StackActions} from 'react-navigation';
import {Badge} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      top: new Animated.Value(-hp(50)),
      profileTop: new Animated.Value(-hp(67)),
      userToken: '',
      userId: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      isVisibleLoading: false,
      isCardVisible: false,
      isProfile: false,
      isImagePicked: false,
      isDialogVisible: false,
      isSkipped: false,
      file: {
        uri: '',
        fileName: '',
        type: '',
      },
      image: {
        url: '',
        resize_url: '',
        thumbnail: '',
        resize_thumbnail: '',
      },
    };
  }
  componentDidMount = async () => {
    let isSkipped = await utility.getItem('isSkipped');
    await this.setState({isSkipped: isSkipped});

    if (this.state.isSkipped == false) {
      const token = await utility.getToken('token');
      const userId = await utility.getItem('userId');
      await this.setState({userToken: token, userId: userId});
      await this.getUser();
    }
  };
  onOpenDialog = async () => {
    await this.setState({isDialogVisible: true});
  };
  closeDialog = async () => {
    await this.setState({isDialogVisible: false});
  };

  getUser = async () => {
    await this.setState({isVisibleLoading: true});

    try {
      let response = Service.getDataApi(
        `users/${this.state.userId}`,
        this.state.userToken,
      );

      response
        .then(res => {
          if (res.data) {
            let image;
            if (res.data.image) {
              image = res.data.image.resize_url;
            }
            this.setState({
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              name: res.data.firstName + ' ' + res.data.lastName,
              email: res.data.email,
              phone: res.data.phone,
              image: res.data.image,
              // profileImage: image,
            });
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

  changePassword = async () => {
    if (
      utility.isFieldEmpty(
        this.state.password &&
          this.state.newPassword &&
          this.state.confirmPassword,
      )
    ) {
      alert('All fields are required');
      return;
    } else if (
      utility.isValidComparedPassword(
        this.state.newPassword,
        this.state.confirmPassword,
      )
    ) {
      alert('New password and confirm password should be same');
      return;
    } else {
      this.setState({isVisibleLoading: true});

      let body = {
        password: this.state.password,
        newPassword: this.state.newPassword,
      };
      try {
        let response = Service.postDataApi(
          Url.CHANGE_PASSWORD,
          body,
          this.state.userToken,
        );
        response
          .then(res => {
            if (res.data) {
              this.setState({isVisibleLoading: false});
              alert('Password changed successfully');
              this.hideCard();
            } else {
              this.setState({isVisibleLoading: false});
              console.log('no data found', res.error);
            }
          })
          .catch(error => {
            this.setState({isVisibleLoading: false});
            console.log('error in try-catch', error);
            if (error.error == 'Error: OLD_PASSWORD_DID_NOT_MATCH') {
              alert('Old password did not match');
            } else {
              alert('Something went wrong');
            }
          });
      } catch (err) {
        this.setState({isVisibleLoading: false});
        console.log('another problem:', err);
        alert('Something went wrong');
      }
    }
  };
  onUploadImage = async file => {
    console.log('fileeeeeeeeeee:', file);
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
                this.setState({
                  isImagePicked: true,
                  image: {
                    url: res.data.image.url,
                    thumbnail: res.data.image.thumbnail,
                    resize_url: res.data.image.resize_url,
                    resize_thumbnail: res.data.image.resize_thumbnail,
                  },
                });
                this.editProfile();
                this.setState({isVisibleLoading: false});
              }
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
  onLaunchCamera = () => {
    let options = {
      cameraType: 'front',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        let file = {
          uri: response.uri,
          fileName: response.fileName,
          type: response.type,
        };
        console.log('fileee::::::', file);
        this.setState({isImagePicked: true, file: file});
      }
    });
  };
  editProfile = async () => {
    this.setState({isVisibleLoading: true});
    let body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      image: this.state.image,
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
            this.setState({isVisibleLoading: false, isImagePicked: false});
            alert('Profile update successfully');
            this.getUser();
            this.hideCard();
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
  editProfileValidations = async () => {
    if (
      utility.isFieldEmpty(
        this.state.firstName &&
          this.state.lastName &&
          this.state.email &&
          this.state.phone,
      )
    ) {
      alert('All fields are required');
      return;
    } else if (this.state.isImagePicked) {
      await this.onUploadImage(this.state.file);
    } else {
      await this.editProfile();
    }
  };
  openMenu = () => this.setState({visible: true});

  closeMenu = () => this.setState({visible: false});

  showCard = async from => {
    if (from == 'profile') {
      await this.setState({
        isProfile: true,
        isCardVisible: true,
        visible: false,
      });
      Animated.timing(this.state.profileTop, {
        toValue: 0,
        duration: 700,
      }).start();
    } else {
      await this.setState({
        isProfile: false,
        isCardVisible: true,
        visible: false,
      });
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 700,
      }).start();
    }
  };
  hideCard = async () => {
    if (this.state.isProfile) {
      Animated.timing(this.state.profileTop, {
        toValue: -hp(67),
        duration: 700,
      }).start();
    } else {
      Animated.timing(this.state.top, {
        toValue: -hp(50),
        duration: 700,
      }).start();
    }
    await this.setState({isCardVisible: false});
  };

  onLogOutSubmit = async () => {
    await this.setState({isVisibleLoading: true});
    await utility.removeAuthKey('token');
    await utility.removeAuthKey('userId');
    await utility.removeAuthKey('rembemberMe');
    await this.setState({
      isVisibleLoading: false,
      name: '',
      email: '',
      phone: '',
      image: {},
      file: '',
    });
    await this.props.navigation.navigate('Login');
    await this.closeMenu();
  };
  onMessages = async () => {
    await this.props.navigation.navigate('Messages');
  };
  onOrders = async () => {
    await this.props.navigation.navigate('Orders');
  };
  onSellers = async () => {
    await this.props.navigation.navigate('FollowedSellers');
  };
  onMyFood = async () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'BottomTab'})],
      }),
    );
    await this.props.navigation.navigate('tab4', {from: 'profile'});
  };
  onNotification = async () => {
    await this.props.navigation.navigate('Notifications', {from: 'profile'});
    await this.closeMenu();
  };
  onAbout = async () => {
    await this.props.navigation.navigate('About');
  };
  onCustomerCare = async () => {
    await this.props.navigation.navigate('CustomerCare');
  };
  render() {
    const {
      container,
      column,
      row,
      around_spacing,
      close_style,
      heading_text,
      button_container,
      button_text,
      slider_inner_box,
      input_box,
      menu_container,
      fields,
      input_field_icons,
      slider_container,
      menu_position,
      menu_background,
      menu_list_title,
      menu_list_icons,
      list_item_height,
      row_centered_text,
      list_width,
      rows_spacing,
      field_icons,
      list_title,
      horizontal_line,
      heading_color,
      colored_text,
      user_details,
      spacing,
      between_spacing,
      settings,
      profile_image,
      profile_images,
      profile_container,
      capitalize_text,
      pic_image_container,
      edit_container,
      edit_icon,
      profile_size,
      update_button_container,
      update_text_style,
      top_spacing,
      animation_style,
      profile_temp,
      profile_style,
      badge_style,
      badge_text_style,
      loader,
    } = styles;
    return (
      <Provider>
        <View style={[container, column, between_spacing]}>
          <View>
            <View style={[column, around_spacing]}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
                style={profile_container}>
                <View style={menu_container}>
                  <Menu
                    style={menu_position}
                    contentStyle={menu_background}
                    visible={this.state.visible}
                    onDismiss={this.closeMenu}
                    anchor={
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={
                          !this.state.isSkipped ? this.openMenu : () => {}
                        }>
                        <Image
                          resizeMode="stretch"
                          source={require('../../assets/settings.png')}
                          style={settings}
                        />
                      </TouchableOpacity>
                    }>
                    <View style={[row, {alignItems: 'center'}]}>
                      <Image
                        source={require('../../assets/edit_profile.png')}
                        style={menu_list_icons}
                      />
                      <Menu.Item
                        titleStyle={[menu_list_title, colored_text]}
                        style={list_item_height}
                        title="Edit profile"
                        onPress={() => this.showCard('profile')}
                      />
                    </View>
                    <View style={[row, {alignItems: 'center'}]}>
                      <Image
                        source={require('../../assets/notification_grey.png')}
                        style={menu_list_icons}
                      />
                      <Menu.Item
                        titleStyle={[menu_list_title, heading_color]}
                        style={list_item_height}
                        onPress={this.onNotification}
                        title="Notifications"
                      />
                      <Badge
                        value="5"
                        status="success"
                        badgeStyle={badge_style}
                        textStyle={badge_text_style}
                      />
                    </View>
                    <View style={[row, {alignItems: 'center'}]}>
                      <Image
                        source={require('../../assets/change_password.png')}
                        style={menu_list_icons}
                      />
                      <Menu.Item
                        titleStyle={[menu_list_title, colored_text]}
                        style={list_item_height}
                        onPress={() => this.showCard('changePassword')}
                        title="Change password"
                      />
                    </View>
                    <View style={[row, {alignItems: 'center'}]}>
                      <Image
                        source={require('../../assets/logout_grey.png')}
                        style={menu_list_icons}
                      />
                      <Menu.Item
                        titleStyle={[menu_list_title, heading_color]}
                        style={list_item_height}
                        onPress={this.onLogOutSubmit}
                        title="Logout"
                      />
                    </View>
                  </Menu>
                </View>
                <View
                  style={
                    this.state.image.resize_url == ''
                      ? [profile_image, {padding: 3}]
                      : profile_image
                  }>
                  <Image
                    resizeMode="cover"
                    source={
                      this.state.image.resize_url == ''
                        ? require('../../assets/profile.png')
                        : {uri: this.state.image.resize_url}
                    }
                    style={profile_temp}
                  />
                </View>
              </LinearGradient>

              <View style={user_details}>
                <Text style={[spacing, heading_color, capitalize_text]}>
                  {this.state.name}
                </Text>
                <Text style={[spacing, colored_text]}>{this.state.email}</Text>
                <Text style={[spacing, heading_color]}>{this.state.phone}</Text>
              </View>
            </View>

            <View style={horizontal_line} />

            <View style={list_width}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={!this.state.isSkipped ? this.onMessages : () => {}}>
                <View style={[row, between_spacing, rows_spacing]}>
                  <View style={[row, row_centered_text]}>
                    <Image
                      source={require('../../assets/email_yellow.png')}
                      style={field_icons}
                    />
                    <Text style={[list_title, colored_text]}>Messages</Text>
                  </View>
                  <Image
                    source={require('../../assets/next_arrow.png')}
                    style={field_icons}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={!this.state.isSkipped ? this.onMyFood : () => {}}>
                <View style={[row, between_spacing, rows_spacing]}>
                  <View style={[row, row_centered_text]}>
                    <Image
                      source={require('../../assets/my_food.png')}
                      style={field_icons}
                    />
                    <Text style={[list_title, heading_color]}>My food</Text>
                  </View>
                  <Image
                    source={require('../../assets/next_arrow_grey.png')}
                    style={field_icons}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={!this.state.isSkipped ? this.onOpenDialog : () => {}}>
                <View style={[row, between_spacing, rows_spacing]}>
                  <View style={[row, row_centered_text]}>
                    <Image
                      source={require('../../assets/communication.png')}
                      style={field_icons}
                    />
                    <Text style={[list_title, colored_text]}>
                      Mode of communication
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/next_arrow.png')}
                    style={field_icons}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={!this.state.isSkipped ? this.onSellers : () => {}}>
                <View style={[row, between_spacing, rows_spacing]}>
                  <View style={[row, row_centered_text]}>
                    <Image
                      source={require('../../assets/follow.png')}
                      style={field_icons}
                    />
                    <Text style={[list_title, heading_color]}>
                      Seller you follow
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/next_arrow_grey.png')}
                    style={field_icons}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={!this.state.isSkipped ? this.onOrders : () => {}}>
                <View style={[row, between_spacing, rows_spacing]}>
                  <View style={[row, row_centered_text]}>
                    <Image
                      source={require('../../assets/dish_yellow.png')}
                      style={field_icons}
                    />
                    <Text style={[list_title, colored_text]}>
                      Received orders
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/next_arrow.png')}
                    style={field_icons}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={horizontal_line} />

            <View style={list_width}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.onCustomerCare}>
                <View style={[row, between_spacing, rows_spacing]}>
                  <View style={[row, row_centered_text]}>
                    <Image
                      source={require('../../assets/customer_care_gray.png')}
                      style={field_icons}
                    />
                    <Text style={[list_title, heading_color]}>
                      Customer care
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/next_arrow_grey.png')}
                    style={field_icons}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} onPress={this.onAbout}>
                <View style={[row, between_spacing, rows_spacing]}>
                  <View style={[row, row_centered_text]}>
                    <Image
                      source={require('../../assets/about-eat_it_orange.png')}
                      style={field_icons}
                    />
                    <Text style={[list_title, colored_text]}>About Eat it</Text>
                  </View>
                  <Image
                    source={require('../../assets/next_arrow.png')}
                    style={field_icons}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* change  password card */}
            <Animated.View
              style={[
                animation_style,
                this.state.isProfile
                  ? {top: this.state.profileTop}
                  : {top: this.state.top},
              ]}>
              <LinearGradient
                start={this.state.isProfile ? {x: 0, y: 1} : {x: 0, y: 0}}
                end={this.state.isProfile ? {x: 0, y: 0} : {x: 1, y: 0}}
                colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
                style={[
                  slider_container,
                  this.state.isProfile ? profile_size : '',
                ]}>
                <View style={[slider_inner_box, column]}>
                  <Text style={heading_text}>
                    {this.state.isProfile ? 'Edit profile' : 'Change Password'}
                  </Text>
                  {this.state.isProfile ? (
                    <View>
                      <View style={[row, fields]}>
                        <Image
                          source={require('../../assets/username_white.png')}
                          style={input_field_icons}
                        />
                        <TextInput
                          placeholder="Firstname"
                          placeholderTextColor="white"
                          style={input_box}
                          onChangeText={firstName => this.setState({firstName})}
                          value={this.state.firstName}
                        />
                      </View>
                      <View style={[row, fields]}>
                        <Image
                          source={require('../../assets/username_white.png')}
                          style={input_field_icons}
                        />
                        <TextInput
                          placeholder="Lastname"
                          placeholderTextColor="white"
                          style={input_box}
                          onChangeText={lastName => this.setState({lastName})}
                          value={this.state.lastName}
                        />
                      </View>
                      <View style={[row, fields]}>
                        <Image
                          source={require('../../assets/email__white.png')}
                          style={input_field_icons}
                        />
                        <TextInput
                          placeholder="Email"
                          placeholderTextColor="white"
                          style={input_box}
                          onChangeText={email => this.setState({email})}
                          value={this.state.email}
                          editable={false}
                        />
                      </View>
                      <View style={[row, fields]}>
                        <Image
                          source={require('../../assets/phone_white.png')}
                          style={input_field_icons}
                        />
                        <TextInput
                          placeholder="Phone"
                          placeholderTextColor="white"
                          style={input_box}
                          onChangeText={phone => this.setState({phone})}
                          value={this.state.phone}
                        />
                      </View>

                      <View style={[row, between_spacing, top_spacing]}>
                        <View style={row}>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.onLaunchCamera}>
                            <View
                              style={[
                                pic_image_container,
                                this.state.image.resize_url ? '' : {padding: 5},
                              ]}>
                              <Image
                                resizeMode="stretch"
                                source={
                                  this.state.image.resize_url == ''
                                    ? require('../../assets/profile_white.png')
                                    : this.state.isImagePicked
                                    ? {uri: this.state.file.uri}
                                    : {uri: this.state.image.resize_url}
                                }
                                style={profile_images}
                              />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={this.onLaunchCamera}>
                            <View style={edit_container}>
                              <Image
                                resizeMode="stretch"
                                source={require('../../assets/edit_black.png')}
                                style={edit_icon}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={this.editProfileValidations}>
                          <View style={update_button_container}>
                            <Text style={update_text_style}>Update</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={[row, fields]}>
                        <Image
                          source={require('../../assets/password_white.png')}
                          style={input_field_icons}
                        />
                        <TextInput
                          placeholder="Old password"
                          placeholderTextColor="white"
                          style={input_box}
                          onChangeText={password => this.setState({password})}
                          value={this.state.password}
                        />
                      </View>
                      <View style={[row, fields]}>
                        <Image
                          source={require('../../assets/password_white.png')}
                          style={input_field_icons}
                        />
                        <TextInput
                          placeholder="New password"
                          placeholderTextColor="white"
                          style={input_box}
                          onChangeText={newPassword =>
                            this.setState({newPassword})
                          }
                          value={this.state.newPassword}
                          secureTextEntry={true}
                        />
                      </View>
                      <View style={[row, fields]}>
                        <Image
                          source={require('../../assets/password_white.png')}
                          style={input_field_icons}
                        />
                        <TextInput
                          placeholder="Confirm new password"
                          placeholderTextColor="white"
                          style={input_box}
                          onChangeText={confirmPassword =>
                            this.setState({confirmPassword})
                          }
                          value={this.state.confirmPassword}
                          secureTextEntry={true}
                        />
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this.changePassword}>
                        <View style={[button_container, around_spacing]}>
                          <Text style={button_text}>Update</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  <TouchableOpacity onPress={this.hideCard}>
                    <Text style={close_style}>Close</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Animated.View>

            {this.state.isDialogVisible ? (
              <Communication
                visible={this.state.isDialogVisible}
                closeDialog={this.closeDialog}
              />
            ) : (
              <View />
            )}
            <View style={loader}>
              <ActivityIndicator
                animating={this.state.isVisibleLoading}
                size="large"
                color={this.state.isCardVisible ? 'white' : colors.primaryColor}
              />
            </View>
          </View>
        </View>
      </Provider>
    );
  }
}

// onLogOutSubmit = async () => {
//   await this.setState({isVisibleLoading: true});
//   let body = {};
//   try {
//     let response = Service.postDataApi(
//       Url.LOGOUT_URL,
//       body,
//       this.state.userToken,
//     );
//     response
//       .then(res => {
//         if (res.message) {
//           utility.removeAuthKey('token');
//           utility.removeAuthKey('userId');
//           utility.removeAuthKey('rembemberMe');

//           this.setState({
//             isVisibleLoading: false,
//             name: '',
//             email: '',
//             phone: '',
//             profileImage: '',
//           });
//           this.props.navigation.navigate('Login');
//           this.closeMenu();
//         } else {
//           this.setState({isVisibleLoading: false});
//           console.log('no data found', res.error);
//         }
//       })
//       .catch(error => {
//         this.setState({isVisibleLoading: false});
//         this.props.navigation.navigate('Login');
//         console.log('error in try-catch', error);
//         alert(error.error);
//       });
//   } catch (err) {
//     this.setState({isVisibleLoading: false});
//     console.log('another problem:', err);
//     alert('Something went wrong');
//   }
// };
