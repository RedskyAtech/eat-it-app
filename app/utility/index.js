import {Platform, Alert} from 'react-native';
import {Dimensions, PixelRatio} from 'react-native';
import * as titles from '../constants/title';
export var deviceHeight = Dimensions.get('window').height;
export var deviceWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';
export const getPageLimit = () => {
  return 10;
};

export const isFieldEmpty = text => {
  if (text == '') {
    return true;
  }
  return false;
};
export const isBooleanValid = text => {
  if (text == false) {
    return true;
  }
  return false;
};
export const isObjectEmpty = object => {
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  // null and undefined are "empty"
  if (object == null) return true;

  // Assume if it has a length property with a non-zero value that property is correct.
  if (object.length > 0) return false;
  if (object.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?
  if (typeof object !== 'object') return true;
  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in object) {
    if (hasOwnProperty.call(object, key)) return false;
  }
  return true;
};

export const passwordPattern = password => {
  const reg = /.*[0-9]+.*/i;
  if (reg.test(password) === true) {
    return true;
  }
  return false;
};

export const isValidEmail = email => {
  var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (reg.test(email) != true) {
    return true;
  }
  return false;
};

export let isValidOtp = otp => {
  if (otp.length < 4) {
    return false;
  }
  return true;
};

export const isValidPhoneNumber = phoneNo => {
  if (phoneNo.length < 11) {
    return false;
  }
  return true;
};

export const isValidComparedPassword = (newpassword, confirmPassword) => {
  if (newpassword != confirmPassword) {
    return true;
  }
  return false;
};
export const getOS = () => {
  if (Platform.OS === 'ios') {
    return 'ios';
  }
  return 'android';
};

export const showAlert = message => {
  Alert.alert(
    titles.APP_NAME,
    message,
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: false},
  );
};

export const showAlertWithCallBack = (msg, onOkClick) => {
  Alert.alert(
    '',
    msg,
    [
      {
        text: 'OK',
        onPress: () => {
          console.log(' CLICK CALLED ');
          onOkClick();
        },
      },
    ],
    {
      cancelable: false,
    },
  );
};

export const setToken = async (key, token) => {
  try {
    const res = await AsyncStorage.setItem(key, JSON.stringify(token));
    // console.log('setToken', res);
  } catch (err) {
    console.log('setToken Error', err);
  }
};

export const getToken = async key => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token ? JSON.parse(token) : null;
  } catch (err) {
    console.log('getToken Error', err);
  }
};
export const setItem = async (key, value) => {
  try {
    const res = await AsyncStorage.setItem(key, JSON.stringify(value));
    // console.log('setToken', res);
  } catch (err) {
    console.log('setItem Error', err);
  }
};
export const getItem = async key => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token ? JSON.parse(token) : null;
  } catch (err) {
    console.log('getItem Error', err);
  }
};
export const setInLocalStorge = async (key, token) => {
  try {
    const res = await AsyncStorage.setItem(key, JSON.stringify(token));
    console.log('setInLocalStorge', res);
  } catch (err) {
    console.log('setInLocalStorge Error', err);
  }
};

export const getFromLocalStorge = async key => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token ? JSON.parse(token) : null;
  } catch (err) {
    console.log('getFromLocalStorge Error', err);
  }
};

export const removeAuthKey = async key => {
  try {
    let res = await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log('removeToken Error', err);
  }
};

export const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const AuthToken = async key => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token ? JSON.parse(token) : null;
  } catch (err) {
    console.log('authToken Error', err);
  }
};
