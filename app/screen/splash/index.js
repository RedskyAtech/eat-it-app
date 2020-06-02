import React, {Component} from 'react';
import {View, Image, ImageBackground} from 'react-native';
import styles from './style';
import * as utility from '../../utility/index';

export default class splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.retrieveData();
    }, 2000);
  }

  retrieveData = async () => {
    try {
      var token = await utility.getToken('token');
      console.log('Splash', token);
      if (token == null || token == '' || token == undefined) {
        this.props.navigation.navigate('Login');
      } else {
        this.props.navigation.navigate('tab1');
      }
    } catch (error) {
      alert(error);
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }
  render() {
    const {container, logo} = styles;
    return (
      <View>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={container}
          resizeMode="cover">
          <Image
            resizeMode="contain"
            source={require('../../assets/eatit_logo.png')}
            style={logo}
          />
        </ImageBackground>
      </View>
    );
  }
}
