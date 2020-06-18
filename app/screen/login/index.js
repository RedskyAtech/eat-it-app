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
  Settings,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {CheckBox} from 'native-base';
import HandleBack from '../../components/HandleBack';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';
import ImagePicker from 'react-native-image-picker';
import {TextInputMask} from 'react-native-masked-text';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isSkipped: false,
      isVisibleLoading: false,
      isLogin: true,
      checked: false,
      regChecked: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      isImagePicked: false,
      fileUri: '',
      file: {
        uri: '',
        fileName: '',
        type: '',
      },
      image: {
        url: '',
        thumbnail: '',
        resize_url: '',
        resize_thumbnail: '',
      },
    };
  }
  componentDidMount = async () => {};
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
    await this.setState({
      isLogin: true,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      regChecked: false,
      isImagePicked: false,
      fileUri: '',
      file: {
        uri: '',
        fileName: '',
        type: '',
      },
      image: {
        url: '',
        thumbnail: '',
        resize_url: '',
        resize_thumbnail: '',
      },
    });
  };
  onRegister = async () => {
    await this.setState({isLogin: false, email: '', password: ''});
  };
  onForgotPassword = async () => {
    this.props.navigation.navigate('ForgotPassword');
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
  onRegistrationValidations = async () => {
    await this.setState({isVisibleLoading: true});

    let body = {
      loginType: 'app',
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      image: this.state.image,
    };
    try {
      let response = Service.postDataApi(Url.REGISTRATION_URL, body, '');
      response
        .then(res => {
          if (res.data) {
            alert('Registered successfully');
            this.setState({
              isVisibleLoading: false,
              isLogin: true,
              regChecked: false,
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
              isImagePicked: false,
              fileUri: '',
              file: {
                uri: '',
                fileName: '',
                type: '',
              },
              image: {
                url: '',
                thumbnail: '',
                resize_url: '',
                resize_thumbnail: '',
              },
            });
          } else {
            this.setState({isVisibleLoading: false});
            console.log('no data found:', res.error);
            // alert(res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('try-catch error:', error.error);
          if (error.error == 'Error: USER_ALREADY_EXISTS') {
            alert('User already exists');
          } else {
            alert('Something went wrong');
          }
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert('Something went wrong');
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
                  fileUri: file.uri,
                  image: {
                    url: res.data.image.url,
                    thumbnail: res.data.image.thumbnail,
                    resize_url: res.data.image.resize_url,
                    resize_thumbnail: res.data.image.resize_thumbnail,
                  },
                });
                this.onRegistrationValidations();
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
        // this.onUploadImage(response);
      }
    });
  };
  onRegisteration = async () => {
    if (
      utility.isFieldEmpty(
        this.state.firstName ||
          this.state.lastName ||
          this.state.email ||
          this.state.phone ||
          this.state.password ||
          this.state.confirmPassword,
      ) &&
      utility.isBooleanValid(this.state.regChecked || this.state.isImagePicked)
    ) {
      await utility.setItem('isSkipped', true);
      this.props.navigation.navigate('tab1');
    } else if (
      utility.isFieldEmpty(
        this.state.firstName &&
          this.state.lastName &&
          this.state.email &&
          this.state.phone &&
          this.state.password &&
          this.state.confirmPassword,
      ) &&
      utility.isBooleanValid(this.state.regChecked && this.state.isImagePicked)
    ) {
      await utility.setItem('isSkipped', false);
      alert('All fields are required');
      return;
    } else if (utility.isValidEmail(this.state.email)) {
      await utility.setItem('isSkipped', false);
      alert('Please enter valid email address');
      return;
    } else if (
      utility.isValidComparedPassword(
        this.state.password,
        this.state.confirmPassword,
      )
    ) {
      await utility.setItem('isSkipped', false);
      alert('Password and confirm password should be same');
      return;
    } else if (!this.state.regChecked) {
      await utility.setItem('isSkipped', false);
      alert('Please agree with terms and conditions');
      return;
    } else if (!this.state.isImagePicked) {
      await utility.setItem('isSkipped', false);
      alert('Profile picture is required');
      return;
    } else {
      await utility.setItem('isSkipped', false);
      await this.onUploadImage(this.state.file);
    }
  };
  onLoginSubmit = async () => {
    if (utility.isFieldEmpty(this.state.email || this.state.password)) {
      await utility.setItem('isSkipped', true);
      this.props.navigation.navigate('tab1');
    } else if (utility.isFieldEmpty(this.state.email && this.state.password)) {
      await utility.setItem('isSkipped', false);
      alert('All fields are required');
      return;
    } else if (utility.isValidEmail(this.state.email)) {
      await utility.setItem('isSkipped', false);
      alert('Please enter valid email address');
      return;
    } else {
      await utility.setItem('isSkipped', false);
      this.setState({isVisibleLoading: true});

      let body = {
        email: this.state.email,
        password: this.state.password,
      };

      const res = await Service.loginApi(Url.LOGIN_URL, body);
      if (res.data) {
        console.log('dataaaaoooo:', res.data);
        if (this.state.checked) {
          await utility.setItem('rembemberMe', true);
        } else {
          await utility.setItem('rembemberMe', false);
        }
        await utility.setToken('token', res.data.token);
        await utility.setItem('userId', res.data._id);
        await this.setState({
          isVisibleLoading: false,
          email: '',
          password: '',
          checked: false,
        });
        await this.props.navigation.navigate('tab1');
      } else {
        this.setState({isVisibleLoading: false});
        console.log('no data found:', res.error);
        if (res.error == 'Error: USER_NOT_FOUND') {
          alert('User not found');
        } else if (res.error == 'Error: PASSWORD_MISMATCH') {
          alert('Password mismatch');
        } else {
          alert('Something went wrong');
        }
      }
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
              {!this.state.isLogin ? (
                <TouchableOpacity onPress={this.onTopBackButton}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/back_arrow.png')}
                    style={[back_container, arrow]}
                  />
                </TouchableOpacity>
              ) : (
                <View style={[back_container, arrow]} />
              )}
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
                      <TextInput
                        placeholder="Email"
                        style={input_box}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                      />
                    </View>

                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/password.png')}
                        style={field_icons}
                      />
                      <TextInput
                        placeholder="Password"
                        style={input_box}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        secureTextEntry={true}
                      />
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
                      <TextInput
                        placeholder="Firstname"
                        style={input_box}
                        onChangeText={firstName => this.setState({firstName})}
                        value={this.state.firstName}
                      />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/username.png')}
                        style={field_icons}
                      />
                      <TextInput
                        placeholder="Lastname"
                        style={input_box}
                        onChangeText={lastName => this.setState({lastName})}
                        value={this.state.lastName}
                      />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/email.png')}
                        style={field_icons}
                      />
                      <TextInput
                        placeholder="Email"
                        style={input_box}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                      />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/phone.png')}
                        style={field_icons}
                      />
                      {/* <TextInput
                        placeholder="Phone"
                        style={input_box}
                        onChangeText={phone => this.setState({phone})}
                        value={this.state.phone}
                      /> */}
                      <TextInputMask
                        require
                        allowFontScaling={false}
                        require
                        placeholder="Phone"
                        type={'custom'}
                        options={{
                          mask: '9999999999',
                        }}
                        keyboardType="numeric"
                        onChangeText={phone => this.setState({phone})}
                        value={this.state.phone}
                        style={input_box}
                      />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/password.png')}
                        style={field_icons}
                      />
                      <TextInput
                        placeholder="Password"
                        style={input_box}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        secureTextEntry={true}
                      />
                    </View>
                    <View style={[row, fields]}>
                      <Image
                        source={require('../../assets/password.png')}
                        style={field_icons}
                      />
                      <TextInput
                        placeholder="Confirm password"
                        style={input_box}
                        onChangeText={confirmPassword =>
                          this.setState({confirmPassword})
                        }
                        value={this.state.confirmPassword}
                        secureTextEntry={true}
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
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={this.onLaunchCamera}>
                      <View
                        style={[
                          profile_container,
                          this.state.isImagePicked ? '' : {padding: 5},
                        ]}>
                        <Image
                          resizeMode="stretch"
                          source={
                            this.state.isImagePicked
                              ? {uri: this.state.file.uri}
                              : require('../../assets/profile.png')
                          }
                          style={profile_image}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={this.onLaunchCamera}>
                      <View style={edit_container}>
                        <Image
                          resizeMode="stretch"
                          source={require('../../assets/edit.png')}
                          style={edit_icon}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={
                    this.state.isLogin
                      ? this.onLoginSubmit
                      : this.onRegisteration
                  }>
                  <View style={forward_container}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/next_button_arrow.png')}
                      style={arrow}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
                <ActivityIndicator
                  animating={this.state.isVisibleLoading}
                  size="large"
                  color="#0000ff"
                />
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      </HandleBack>
    );
  }
}

// try {
//   let response = Service.postDataApi(Url.LOGIN_URL, body, '');
//   response
//     .then(res => {
//       if (res.data) {
//         if (this.state.checked) {
//           utility.setItem('rembemberMe', true);
//         } else {
//           utility.setItem('rembemberMe', false);
//         }
//         utility.setToken('token', res.data.token);
//         utility.setItem('userId', res.data._id);

//         this.setState({
//           isVisibleLoading: false,
//           email: '',
//           password: '',
//           checked: false,
//         });
//         this.props.navigation.navigate('tab1');
//       } else {
//         this.setState({isVisibleLoading: false});
//         console.log('no data found:', res.error);
//       }
//     })
//     .catch(error => {
//       this.setState({isVisibleLoading: false});
//       console.log('try-catch error:', error.error);
//       if (error.error == 'Error: USER_NOT_FOUND') {
//         alert('User not found');
//       } else if (error.error == 'Error: PASSWORD_MISMATCH') {
//         alert('Password mismatch');
//       } else {
//         alert('Something went wrong');
//       }
//     });
// } catch (err) {
//   this.setState({isVisibleLoading: false});
//   console.log('another problem:', err);
//   alert('Something went wrong');
// }
// else {
//   await this.setState({isVisibleLoading: true});
//   // await this.onUploadImage(this.state.file);

//   let body = {
//     loginType: 'app',
//     firstName: this.state.firstName,
//     lastName: this.state.lastName,
//     email: this.state.email,
//     phone: this.state.phone,
//     password: this.state.password,
//     image: this.state.image,
//   };
//   try {
//     let response = Service.postDataApi(Url.REGISTRATION_URL, body, '');
//     response
//       .then(res => {
//         if (res.data) {
//           alert('Registered successfully');
//           this.setState({
//             isVisibleLoading: false,
//             isLogin: true,
//             regChecked: false,
//             firstName: '',
//             lastName: '',
//             email: '',
//             phone: '',
//             password: '',
//             confirmPassword: '',
//             isImagePicked: false,
//             fileUri: '',
//             image: {
//               url: '',
//               thumbnail: '',
//               resize_url: '',
//               resize_thumbnail: '',
//             },
//           });
//         } else {
//           this.setState({isVisibleLoading: false});
//           console.log('no data found:', res.error);
//           // alert(res.error);
//         }
//       })
//       .catch(error => {
//         this.setState({isVisibleLoading: false});
//         console.log('try-catch error:', error.error);
//         if (error.error == 'Error: USER_ALREADY_EXISTS') {
//           alert('User already exists');
//         } else {
//           alert('Something went wrong');
//         }
//       });
//   } catch (err) {
//     this.setState({isVisibleLoading: false});
//     console.log('another problem:', err);
//     alert('Something went wrong');
//   }
// }
