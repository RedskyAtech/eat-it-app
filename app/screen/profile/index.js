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

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      top: new Animated.Value(-hp(50)),
      userToken: '',
      userId: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      isVisibleLoading: false,
      profileImage: '',
    };
  }
  componentDidMount = async () => {
    const token = await utility.getToken('token');
    const userId = await utility.getItem('userId');
    await this.setState({userToken: token, userId: userId});
    await this.getUser();
    console.log('token', token);
    console.log('id', userId);
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
              name: res.data.firstName + ' ' + res.data.lastName,
              email: res.data.email,
              phone: res.data.phone,
              profileImage: image,
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
        this.state.password && this.state.newPassword && this.state.oldPassword,
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

  openMenu = () => this.setState({visible: true});

  closeMenu = () => this.setState({visible: false});

  showCard = async () => {
    await this.setState({visible: false});
    Animated.timing(this.state.top, {
      toValue: 0,
      duration: 700,
    }).start();
  };
  hideCard = async () => {
    Animated.timing(this.state.top, {
      toValue: -hp(50),
      duration: 700,
    }).start();
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
      profileImage: '',
    });
    await this.props.navigation.navigate('Login');
    await this.closeMenu();
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
      profile_container,
      capitalize_text,
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
                      <TouchableOpacity onPress={this.openMenu}>
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
                        onPress={() => {}}
                        title="Notifications"
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
                        onPress={this.showCard}
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
                <Image
                  resizeMode="cover"
                  source={
                    this.state.profileImage == ''
                      ? ''
                      : {uri: this.state.profileImage}
                  }
                  style={profile_image}
                />
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
            </View>

            <View style={horizontal_line} />

            <View style={list_width}>
              <View style={[row, between_spacing, rows_spacing]}>
                <View style={[row, row_centered_text]}>
                  <Image
                    source={require('../../assets/customer_care_gray.png')}
                    style={field_icons}
                  />
                  <Text style={[list_title, heading_color]}>Customer care</Text>
                </View>
                <Image
                  source={require('../../assets/next_arrow_grey.png')}
                  style={field_icons}
                />
              </View>

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
            </View>

            {/* change  password card */}
            <Animated.View
              style={{
                top: this.state.top,
                position: 'absolute',
                elevation: 10,
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
                style={slider_container}>
                <View style={[slider_inner_box, column]}>
                  <Text style={heading_text}>Change Password</Text>
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
                      onChangeText={newPassword => this.setState({newPassword})}
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
                  <TouchableOpacity onPress={this.hideCard}>
                    <Text style={close_style}>Close</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Animated.View>
            <View style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
              <ActivityIndicator
                animating={this.state.isVisibleLoading}
                size="large"
                color="#0000ff"
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