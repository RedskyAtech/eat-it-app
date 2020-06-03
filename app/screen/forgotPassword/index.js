import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendOtp: false,
      firstDigit: '',
      secondDigit: '',
      thirdDigit: '',
      fourthDigit: '',
      fill: false,
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
      minutes: 0,
      seconds: 10,
    };
  }

  timer = async () => {
    this.myInterval = setInterval(() => {
      const {seconds, minutes} = this.state;

      if (seconds > 0) {
        this.setState(({seconds}) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({minutes}) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  onTopBackButton = async () => {
    if (!this.state.sendOtp) {
      this.props.navigation.navigate('Login');
    } else {
      await this.setState({sendOtp: false, minutes: 0, seconds: 10, email: ''});
    }
  };

  onSendOtp = () => {
    if (utility.isFieldEmpty(this.state.email)) {
      alert('Email is required');
      return;
    } else if (utility.isValidEmail(this.state.email)) {
      alert('Email is not valid');
      return;
    } else {
      let body = {
        email: this.state.email,
      };
      try {
        let response = Service.postDataApi(
          Url.BASE_URL + 'users/forgotPassword',
          body,
          '',
        );
        response
          .then(res => {
            if (res.data) {
              alert(res.data);
              this.setState({
                sendOtp: true,
                minutes: 0,
                seconds: 10,
              });
              this.refs.first.focus();
              this.timer();
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
    }
  };

  onFirstChange = async value => {
    await this.setState({firstDigit: value});
    if (value) {
      this.refs.second.focus();
    }
  };
  onSecondChange = async value => {
    await this.setState({secondDigit: value});
    if (value) {
      this.refs.third.focus();
    }
  };
  onThirdChange = async value => {
    await this.setState({thirdDigit: value});
    if (value) {
      this.refs.fourth.focus();
    }
  };
  onFourthChange = async value => {
    await this.setState({fourthDigit: value});
    if (
      this.state.firstDigit != '' &&
      this.state.secondDigit != '' &&
      this.state.thirdDigit != '' &&
      this.state.fourthDigit != ''
    ) {
      await this.setState({
        fill: true,
        otp:
          this.state.firstDigit +
          this.state.secondDigit +
          this.state.thirdDigit +
          this.state.fourthDigit,
      });
    } else {
      await this.setState({fill: false});
    }
  };

  onSubmitResetPassword = () => {
    if (
      utility.isFieldEmpty(
        this.state.otp && this.state.password && this.state.confirmPassword,
      )
    ) {
      alert('All fields are required');
      return;
    }
    if (
      utility.isValidComparedPassword(
        this.state.password,
        this.state.confirmPassword,
      )
    ) {
      alert('Password and confirm password should be same');
      return;
    } else {
      let body = {
        email: this.state.email,
        otp: this.state.otp,
        newPassword: this.state.password,
      };
      try {
        let response = Service.postDataApi(
          Url.BASE_URL + 'users/resetPassword',
          body,
          '',
        );
        response
          .then(res => {
            if (res.data) {
              alert(res.data);
              this.props.navigation.navigate('Login');
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
    }
  };

  render() {
    const {
      back_container,
      logo_container,
      colored_text,
      otp_fields,
      primary_color,
      otp_input_box,
      background_theme_color,
      button_container,
      button_text,
      centered_text,
      fields,
      row,
      field_icons,
      column,
      container,
      arrow,
      logo,
      headings,
      text,
      fields_container,
      input_box,
    } = styles;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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

          <View style={[headings, row, centered_text]}>
            <Text style={text}>
              {this.state.sendOtp ? 'Set Password' : 'Forgot Password'}
            </Text>
          </View>

          <View style={[column, fields_container]}>
            <View style={[row, centered_text]}>
              <Text style={[colored_text, primary_color]}>
                {this.state.sendOtp
                  ? 'Enter four digit OTP that has been sent to your email/phone'
                  : 'Please enter your email or phone and we will send an OTP'}
              </Text>
            </View>

            {!this.state.sendOtp ? (
              <View>
                <View style={[row, fields]}>
                  <Image
                    source={require('../../assets/email.png')}
                    style={field_icons}
                  />
                  <TextInput
                    placeholder="Enter registered mobile / email"
                    style={input_box}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                  />
                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={this.onSendOtp}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#F8B614', '#B49579']}
                    style={[button_container, centered_text]}>
                    <Text style={button_text}>Send OTP</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View style={[row, otp_fields, centered_text]}>
                  <TextInput
                    style={
                      this.state.firstDigit != ''
                        ? [otp_input_box, background_theme_color]
                        : otp_input_box
                    }
                    maxLength={1}
                    ref="first"
                    keyboardType="numeric"
                    onChangeText={this.onFirstChange}
                  />
                  <TextInput
                    style={
                      this.state.secondDigit != ''
                        ? [otp_input_box, background_theme_color]
                        : otp_input_box
                    }
                    maxLength={1}
                    keyboardType="numeric"
                    ref="second"
                    onChangeText={this.onSecondChange}
                  />
                  <TextInput
                    style={
                      this.state.thirdDigit != ''
                        ? [otp_input_box, background_theme_color]
                        : otp_input_box
                    }
                    maxLength={1}
                    keyboardType="numeric"
                    ref="third"
                    onChangeText={this.onThirdChange}
                  />
                  <TextInput
                    style={
                      this.state.fourthDigit != ''
                        ? [otp_input_box, background_theme_color]
                        : otp_input_box
                    }
                    maxLength={1}
                    keyboardType="numeric"
                    ref="fourth"
                    onChangeText={this.onFourthChange}
                  />
                </View>
                {!this.state.fill ? (
                  <View style={[row, centered_text]}>
                    <View style={row}>
                      {this.state.minutes == 0 && this.state.seconds == 0 ? (
                        <TouchableOpacity onPress={this.onSendOtp}>
                          <Text style={primary_color}>Resend otp?</Text>
                        </TouchableOpacity>
                      ) : (
                        <>
                          <Text>OTP expires in </Text>
                          <Text style={primary_color}>
                            {this.state.minutes < 10
                              ? `0${this.state.minutes}`
                              : this.state.minutes}
                            {':'}
                            {this.state.seconds < 10
                              ? `0${this.state.seconds}`
                              : this.state.seconds}
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/password.png')}
                        style={field_icons}
                      />
                      <TextInput
                        placeholder="New password"
                        style={input_box}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                      />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/password.png')}
                        style={field_icons}
                      />
                      <TextInput
                        placeholder="Confirm new password"
                        style={input_box}
                        onChangeText={confirmPassword =>
                          this.setState({confirmPassword})
                        }
                        value={this.state.confirmPassword}
                      />
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={this.onSubmitResetPassword}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={[
                          colors.gradientFirstColor,
                          colors.gradientSecondColor,
                        ]}
                        style={[button_container, centered_text]}>
                        <Text style={button_text}>Submit</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}
