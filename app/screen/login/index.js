import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import {CheckBox} from 'native-base';
import HandleBack from '../../components/HandleBack';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      checked: false,
      regChecked: false,
    };
  }
  onChecked = async () => {
    if (this.state.checked) {
      await this.setState({checked: false});
    } else {
      await this.setState({checked: true});
    }
  };
  onRegChecked = async () => {
    if (this.state.regChecked) {
      await this.setState({regChecked: false});
    } else {
      await this.setState({regChecked: true});
    }
  };
  onLogin = async () => {
    await this.setState({isLogin: true});
  };
  onRegister = async () => {
    await this.setState({isLogin: false});
  };
  onForgotPassword = async () => {
    this.props.navigation.navigate('ForgotPassword');
  };
  onLoginSubmit = async () => {
    this.props.navigation.navigate('tab1');
  };
  onBack = () => {
    BackHandler.exitApp();
    return true;
  };
  onTopBackButton = async () => {
    if (this.state.isLogin) {
      BackHandler.exitApp();
      return true;
    } else {
      await this.setState({isLogin: true});
    }
  };
  render() {
    const {
      back_container,
      logo_container,
      profile_container,
      profile_image,
      ckeckbox,
      edit_container,
      edit_icon,
      headings_color,
      row,
      column,
      container,
      line_container,
      forward_container,
      bottom_container,
      line,
      or_text,
      social_container,
      social_icons,
      fields,
      box_align,
      field_icons,
      arrow,
      colored_text,
      logo,
      headings,
      text,
      text_style,
      vertical_spacing,
      centered_row,
      fields_container,
      input_box,
      between_spacing,
    } = styles;
    return (
      <HandleBack onBack={this.onBack}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView style={{margin: 0, padding: 0}}>
            <ImageBackground
              source={require('../../assets/login_background.png')}
              style={container}
              resizeMode="cover">
              <TouchableOpacity onPress={this.onTopBackButton}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/back_arrow.png')}
                  style={[back_container, arrow]}
                />
              </TouchableOpacity>
              <View style={logo_container}>
                <Image
                  resizeMode="stretch"
                  source={require('../../assets/eatit_logo.png')}
                  style={logo}
                />
              </View>

              <View style={[headings, row]}>
                <TouchableOpacity onPress={this.onLogin}>
                  <Text
                    style={this.state.isLogin ? text : [text, headings_color]}>
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onRegister}>
                  <Text
                    style={!this.state.isLogin ? text : [text, headings_color]}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[column, fields_container]}>
                <Text style={[text, {marginVertical: 10}]}>Welcome here!</Text>
                {this.state.isLogin ? (
                  <View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/email.png')}
                        style={field_icons}
                      />
                      <TextInput placeholder="Email" style={input_box} />
                    </View>

                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/password.png')}
                        style={field_icons}
                      />
                      <TextInput placeholder="Password" style={input_box} />
                    </View>

                    <View style={[row, between_spacing]}>
                      <View style={[row, centered_row]}>
                        <CheckBox
                          checked={this.state.checked}
                          color="grey"
                          onPress={this.onChecked}
                          style={ckeckbox}
                        />
                        <Text style={text_style}>Rembember me</Text>
                      </View>
                      <Text
                        style={colored_text}
                        onPress={this.onForgotPassword}>
                        Forgot password?
                      </Text>
                    </View>

                    <View style={line_container}>
                      <View style={row}>
                        <View style={line} />
                        <Text style={or_text}>Or</Text>
                        <View style={line} />
                      </View>
                    </View>

                    <View style={social_container}>
                      <View style={[row, between_spacing]}>
                        <Image
                          source={require('../../assets/facebook.png')}
                          style={social_icons}
                        />
                        <Image
                          source={require('../../assets/twitter.png')}
                          style={social_icons}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/username.png')}
                        style={field_icons}
                      />
                      <TextInput placeholder="Firstname" style={input_box} />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/username.png')}
                        style={field_icons}
                      />
                      <TextInput placeholder="Lastname" style={input_box} />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/email.png')}
                        style={field_icons}
                      />
                      <TextInput placeholder="Email" style={input_box} />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/phone.png')}
                        style={field_icons}
                      />
                      <TextInput placeholder="Phone" style={input_box} />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/password.png')}
                        style={field_icons}
                      />
                      <TextInput placeholder="Password" style={input_box} />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/password.png')}
                        style={field_icons}
                      />
                      <TextInput
                        placeholder="Confirm password"
                        style={input_box}
                      />
                    </View>
                    <View style={[row, vertical_spacing, centered_row]}>
                      <CheckBox
                        checked={this.state.regChecked}
                        color="grey"
                        onPress={this.onRegChecked}
                        style={ckeckbox}
                      />
                      <Text style={text_style}>
                        I agree with terms and conditions
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <View style={bottom_container}>
                {this.state.isLogin ? (
                  <Text />
                ) : (
                  <View style={row}>
                    <View style={profile_container}>
                      <Image
                        resizeMode="stretch"
                        source={require('../../assets/profile.png')}
                        style={profile_image}
                      />
                    </View>
                    <View style={edit_container}>
                      <Image
                        resizeMode="stretch"
                        source={require('../../assets/edit.png')}
                        style={edit_icon}
                      />
                    </View>
                  </View>
                )}
                <TouchableOpacity activeOpacity={1}  onPress={this.onLoginSubmit}>
                  <View style={forward_container}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/next_button_arrow.png')}
                      style={arrow}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      </HandleBack>
    );
  }
}


