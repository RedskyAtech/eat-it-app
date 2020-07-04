import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import styles from './style';
import MapView from 'react-native-maps';
import {heightPercentageToDP} from '../../utility';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';

export default class map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      address: '',
      landmark: '',
    };
  }
  componentDidMount = async () => {};

  render() {
    const {
      container,
      column,
      row,
      between_spacing,
      fields,
      input_box,
      small_input_box,
      address_fields_container,
      centered_text,
      button_container,
      button_text,
    } = styles;
    return (
      <View styles={container}>
        <MapView
          style={{height: heightPercentageToDP(65)}}
          zoomEnabled={true}
          showsUserLocation={true}
          showsMyLocationButton={false}
          region={this.state.region}
        />
        <View style={address_fields_container}>
          <View style={[row, fields]}>
            <TextInput
              placeholder="Address line"
              style={input_box}
              onChangeText={address => this.setState({address})}
              value={this.state.address}
            />
          </View>
          <View style={[row, fields]}>
            <TextInput
              placeholder="Landmark"
              style={input_box}
              onChangeText={landmark => this.setState({landmark})}
              value={this.state.landmark}
            />
          </View>
          <View style={[row, between_spacing]}>
            <View style={[row, fields]}>
              <TextInput
                placeholder="City"
                style={small_input_box}
                onChangeText={city => this.setState({city})}
                value={this.state.city}
              />
            </View>
            <View style={[row, fields]}>
              <TextInput
                placeholder="Pincode"
                style={small_input_box}
                onChangeText={pincode => this.setState({pincode})}
                value={this.state.pincode}
              />
            </View>
          </View>
        </View>
        <View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
            style={[button_container, centered_text]}>
            <Text style={button_text}>Add address</Text>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
