// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import MapView from 'react-native-maps';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {PermissionsAndroid} from 'react-native';
// import Geocoder from 'react-native-geocoding';
// import Geolocation from '@react-native-community/geolocation';
// import Modal from 'react-native-modal';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// const {width, height} = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.005;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// export default class map extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       region: {
//         latitude: 28.6448,
//         longitude: 77.216721,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       },
//       oldRegion: {
//         description: '',
//       },
//       marker: {
//         latitude: 0,
//         longitude: 0,
//       },
//       description: '',
//       scrollEnabled: true,
//       loaded: false,
//     };

//     Geocoder.init('AIzaSyAr_cT485DGoQBlnD9K2qDhLl2u0CXET2Y');
//   }
//   requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'App location Permission',
//           message: ' App needs access to your location ' + '',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the loc');
//       } else {
//         console.log('loc permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };
//   UNSAFE_componentWillMount = async () => {
//     await this.requestCameraPermission();
//     await this.onRegionChange();
//   };
//   onRegionChange = async () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         console.log('position', position);
//         this.setState({
//           scrollEnabled: true,
//         });
//         this.onUserPinDragEnd(position.coords, '');
//       },
//       error => {
//         this.setState({error: error.message}),
//           console.log('errorrrrrrrrr:', error.message);
//       },
//       {enableHighAccuracy: false, timeout: 200000, maximumAge: 10000},
//       //
//     );
//   };
//   onUserPinDragEnd = async (value, from) => {
//     console.log('test::onUserPinDragEnd::value::from', from);
//     console.log('test::onUserPinDragEnd::valueeeeeeeeeeeeeee', value);

//     // let address = await Geocoder.from({
//     //   latitude: value.latitude,
//     //   longitude: value.longitude,
//     // });
//     // console.log('await Geocoder.fromawait Geocoder.fromawait Geocoder.from');
//     // let pointedAddress = address.results[0].formatted_address;
//     await this.setState({
//       region: {
//         latitude: value.latitude,
//         longitude: value.longitude,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       },
//       // oldRegion: {
//       //   description: pointedAddress,
//       // },
//       // description: pointedAddress,
//       scrollEnabled: true,
//       onPress: false,
//     });
//     // await this.setLocation(pointedAddress);
//     console.log('selected Loction', this.state.description);
//     console.log('regionnnnnnnnnn', this.state.region);

//     // console.log('selected address', address.results[0].formatted_address);
//   };
//   setLocation(text) {
//     this.placesRef && this.placesRef.setAddressText(text);
//   }

//   render() {
//     return (
//       <Modal
//         backdropOpacity={0.95}
//         backdropColor={'#f9f9f9'}
//         isVisible={true}
//         hasBackdrop={true}>
//         <View style={{flexDirection: 'column', marginTop: '2%'}}>
//           <View
//             style={{
//               height: '10%',
//               width: '95%',
//               justifyContent: 'center',
//               alignSelf: 'center',
//             }}>
//             <GooglePlacesAutocomplete
//               ref={ref => {
//                 this.placesRef = ref;
//               }}
//               editable={true}
//               clearButtonMode={true}
//               placeholder="Search"
//               minLength={2}
//               autoFocus={false}
//               returnKeyType={'search'}
//               listViewDisplayed={false}
//               fetchDetails={true}
//               enablePoweredByContainer={false}
//               onPress={(data, details = null) => {
//                 console.log('datadatadatadatadatadatadattadatadata', data);
//                 this.onUserPinDragEnd(
//                   {
//                     latitude: details.geometry.location.lat,
//                     longitude: details.geometry.location.lng,
//                   },
//                   'onPress',
//                 );
//               }}
//               textInputProps={{
//                 onFocus: () => {
//                   console.log('hiiiiiiiiiiiiii.....................onFocus');
//                   this.onUserPinDragEnd(
//                     {
//                       latitude: 0,
//                       longitude: 0,
//                     },
//                     'onFocus',
//                   );
//                 },
//                 onBlur: () => {
//                   console.log(
//                     'hiiiiiiiiiiiiii.jjjjjjjjjjj....................onBlur',
//                   );
//                   this.setState({
//                     scrollEnabled: true,
//                   });
//                 },
//                 // onChangeText: (text) => onChange(text)
//                 onChangeText: text => {
//                   if (text.length === 0) {
//                     console.log(
//                       'onChangeTextonChangeTextonChangeTextonChangeText',
//                     );
//                     this.onUserPinDragEnd(
//                       {
//                         latitude: 0,
//                         longitude: 0,
//                       },
//                       'changeText',
//                     );
//                   }
//                 },
//               }}
//               getDefaultValue={() => {
//                 if (
//                   this.state.region !== null &&
//                   this.state.region !== undefined
//                 ) {
//                   return this.state.description;
//                 } // text input default value
//                 return '';
//               }}
//               query={{
//                 key: 'AIzaSyAr_cT485DGoQBlnD9K2qDhLl2u0CXET2Y',
//                 language: 'en',
//               }}
//               styles={{
//                 containerTop: {
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   alignItems: 'center',
//                   justifyContent: 'flex-start',
//                 },
//                 horizontal: {
//                   flexDirection: 'row',
//                   justifyContent: 'space-around',
//                 },

//                 listView: {
//                   zIndex: 1000,
//                   backgroundColor: '#ffffff',
//                   color: 'black', //To see where exactly the list is
//                   position: 'absolute',
//                 },
//                 textInputContainer: {
//                   zIndex: 2000,
//                   backgroundColor: '#b61925',
//                 },
//                 description: {
//                   fontWeight: 'bold',
//                 },
//                 predefinedPlacesDescription: {
//                   color: '#FFF',
//                 },
//               }}
//               currentLocation={false}
//               // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//               debounce={100}
//             />
//           </View>

//           <View style={styles.container}>
//             <Icon
//               name="map-marker"
//               style={{
//                 zIndex: 1,
//                 position: 'absolute',
//                 marginTop: -37,
//                 marginLeft: -11,
//                 left: '50%',
//                 top: '50%',
//               }}
//               size={40}
//               color="#f00"
//             />
//             <MapView
//               style={styles.mapView}
//               showsUserLocation={true}
//               scrollEnabled={this.state.scrollEnabled}
//               followsUserLocation={true}
//               zoomEnabled={true}
//               onRegionChangeComplete={value => {
//                 console.log(
//                   'onRegionChangeCompleteonRegion',
//                   value,
//                 );
//                 this.onUserPinDragEnd(value, 'regionChange');
//               }}
//               initialRegion={this.state.region}
//               region={this.state.region}
//               showsIndoors={true}
//               zoom={20}
//             />
//           </View>
//           <View>
//             <TouchableOpacity
//               style={[styles.LoginBtn, styles.AJ]}
//               onPress={() => {}}>
//               <Text allowFontScaling={false} style={styles.LoginBtnTxt}>
//                 SUBMIT
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '70%',
//     width: '100%',
//     marginTop: '2%',
//     zIndex: -1,
//   },
//   mapView: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: -1,
//   },
//   fullWidthContainer: {
//     position: 'absolute',
//     width: '100%',
//     top: 80,
//     alignItems: 'center',
//   },
//   input: {
//     width: '80%',
//     padding: 5,
//   },
//   currentLocBtn: {
//     backgroundColor: '#000',
//     padding: 5,
//     borderRadius: 5,
//     position: 'absolute',
//     bottom: 70,
//     right: 10,
//   },
//   actionButton: {
//     backgroundColor: '#000',
//     height: 50,
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     right: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   actionText: {
//     color: 'white',
//     fontSize: 23,
//   },
//   LoginBtn: {
//     height: 50,
//     backgroundColor: '#fff',
//     marginTop: 10,
//     borderRadius: 60,
//     borderColor: 'blue',
//     shadowOpacity: 0.7,
//     elevation: 10,
//     marginLeft: 50,
//     marginRight: 50,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//   },
//   AJ: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   LoginBtnTxt: {
//     color: 'red',
//     fontSize: wp('7%'),
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// });

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput,Dimensions} from 'react-native';
import styles from './style';
import MapView from 'react-native-maps';
import {heightPercentageToDP} from '../../utility';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 29.0552648,
        longitude: 75.725159,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
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
