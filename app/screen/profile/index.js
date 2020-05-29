import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import {Menu, Provider} from 'react-native-paper';
import {heightPercentageToDP as hp} from '../../utility/index';

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      top: new Animated.Value(-hp(50)),
    };
  }
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
  logOut = async () => {
    await this.props.navigation.navigate('Login');
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
      profile,
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
                        onPress={this.logOut}
                        title="Logout"
                      />
                    </View>
                  </Menu>
                </View>
                <Image
                  resizeMode="cover"
                  source={require('../../assets/pic.jpg')}
                  style={profile_image}
                />
              </LinearGradient>

              <View style={user_details}>
                <Text style={[spacing, heading_color]}>Merry Smith</Text>
                <Text style={[spacing, colored_text]}>
                  merry.smith@gmail.com
                </Text>
                <Text style={[spacing, heading_color]}>8792345678</Text>
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
                    Seller you follows
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
                    source={require('../../assets/customer_care.png')}
                    style={field_icons}
                  />
                  <Text style={[list_title, colored_text]}>Customer care</Text>
                </View>
                <Image
                  source={require('../../assets/next_arrow.png')}
                  style={field_icons}
                />
              </View>

              <View style={[row, between_spacing, rows_spacing]}>
                <View style={[row, row_centered_text]}>
                  <Image
                    source={require('../../assets/about_eat_it.png')}
                    style={field_icons}
                  />
                  <Text style={[list_title, heading_color]}>About Eat it</Text>
                </View>
                <Image
                  source={require('../../assets/next_arrow_grey.png')}
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
                    />
                  </View>

                  <View style={[button_container, around_spacing]}>
                    <Text style={button_text}>Update</Text>
                  </View>

                  <TouchableOpacity onPress={this.hideCard}>
                    <Text style={close_style}>Close</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Animated.View>
          </View>
        </View>
      </Provider>
    );
  }
}
