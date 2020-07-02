import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';
import styles from './style';
import {RadioButton} from 'react-native-paper';
import * as colors from '../../constants/colors';
import {TextInputMask} from 'react-native-masked-text';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationActions, StackActions} from 'react-navigation';

export default class payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      selected: '',
      cardNumber: '',
      code: '',
      year: '',
      month: '',
      showModal: false,
      status: 'pending',
      paypalToken: '',
      paymentId: '',
    };
  }
  onBack = async () => {
    await this.props.navigation.navigate('FoodDetails');
  };
  onPlaceOrder = async () => {
    await this.setState({isVisible: !this.state.isVisible});
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'BottomTab'})],
      }),
    );
    await this.props.navigation.navigate('tab1');
  };
  handelResponse = async data => {
    if (data.title == 'success') {
      await this.setState({showModal: false, status: 'completed'});
    } else if (data.title == 'cancel') {
      await this.setState({showModal: false, status: 'cancelled'});
    } else {
      return;
    }
  };
  onGetToken = async () => {
    try {
      let response = Service.postPaymentDataApi(
        'payments/token',
        '',
        '',
        'token',
      );
      response
        .then(res => {
          if (res.data) {
            if (res.isSuccess == true) {
              console.log('tokennnnnnnnnnn:', res.data.access_token);
              this.setState({paypalToken: res.data.access_token});
              this.onPayment();
            }
          } else {
            console.log('no data found', res.error);
          }
        })
        .catch(error => {
          console.log('error in try-catch', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  onPayment = async () => {
    var body = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://192.168.43.151:6600/payments/success',
        cancel_url: 'http://192.168.43.151:6600/payments/cancel',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'item',
                sku: 'item',
                price: '1.00',
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: '1.00',
          },
          description: 'This is the payment description.',
        },
      ],
    };
    try {
      let response = Service.postPaymentDataApi(
        `payments/payment?access_token=${this.state.paypalToken}`,
        body,
        '',
        'payment',
      );
      response
        .then(res => {
          if (res.data) {
            if (res.isSuccess == true) {
              this.setState({
                paymentId: res.data.id,
                approvalUrl: res.data.href,
                showModal: true,
              });
              console.log('urlllll:', res.data);
            }
          } else {
            console.log('no data found', res.error);
          }
        })
        .catch(error => {
          console.log('error in try-catch', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  // _onNavigationStateChange = async webViewState => {
  //   if (webViewState.url.includes('https://www.sandbox.paypal.com/')) {
  //     await this.setState({approvalUrl: null});
  //     console.log('webbbbbbb"', webViewState.url);
  //     const {PayerID, paymentId} = webViewState.url;
  //     let body = {
  //       paymentId: this.state.paymentId,
  //       PayerID: PayerID,
  //     };
  //     try {
  //       let response = Service.postPaymentDataApi(
  //         `payments/execute?access_token=${this.state.paypalToken}`,
  //         body,
  //         '',
  //         'payment',
  //       );
  //       response
  //         .then(res => {
  //           if (res.data) {
  //             if (res.isSuccess == true) {
  //               console.log('urlllll:', res);
  //             }
  //           } else {
  //             console.log('no data found', res.error);
  //           }
  //         })
  //         .catch(error => {
  //           console.log('error in try-catch', error.error);
  //           alert('Something went wrong');
  //         });
  //     } catch (err) {
  //       console.log('another problem:', err);
  //       alert('Something went wrong');
  //     }
  //   }
  // };
  render() {
    const {
      container,
      column,
      row,
      between_spacing,
      inner_container,
      spacing,
      arrow,
      heading_text,
      radio_text_selected,
      radio_text_unselected,
      radio_button_list,
      list_container,
      input_container,
      input_box,
      inner_list,
      centered_text,
      text_style,
      button_container,
      button_text,
      date_year_container,
      top_spacing,
      icon,
      down_arrow_icon,
      date_container,
      year_container,
      month_input,
      expiration_input_container,
      code_input,
      year_input,
    } = styles;
    return (
      <View style={[container, centered_text]}>
        <View style={[column, centered_text]}>
          {/* <Modal
            visible={this.state.showModal}
            onRequestClose={() => {
              this.setState({showModal: false});
            }}>
            <WebView
              source={{uri: 'http://192.168.43.151:6600'}}
              onNavigationStateChange={data => this.handelResponse(data)}
              injectedJavaScript={`document.f1.submit()`}
            />
          </Modal> */}
          <Modal
            visible={this.state.showModal}
            onRequestClose={() => {
              this.setState({showModal: false});
            }}>
            <WebView
              style={{height: 400, width: 300}}
              source={{uri: this.state.approvalUrl}}
              onNavigationStateChange={data => this.handelResponse(data)}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
              style={{marginTop: 20}}
            />
          </Modal>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: 'orange',
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              margin: 20,
            }}
            onPress={this.onGetToken}
            // onPress={() => {
            //   this.setState({showModal: true});
            // }}
          >
            <Text>Pay with paypal</Text>
          </TouchableOpacity>
          <Text>Status: {this.state.status}</Text>
        </View>
      </View>

      // <View style={[container]}>
      //   <View style={[inner_container, row, between_spacing, spacing]}>
      //     <TouchableOpacity onPress={this.onBack}>
      //       <Image
      //         resizeMode="contain"
      //         source={require('../../assets/back_arrow.png')}
      //         style={arrow}
      //       />
      //     </TouchableOpacity>
      //     <Text style={heading_text}>Payment methods</Text>
      //     <View>
      //       <Text> </Text>
      //     </View>
      //   </View>

      //   <View style={list_container}>
      //     <View style={[row, radio_button_list]}>
      //       <RadioButton
      //         value="Paytm"
      //         color={colors.primaryColor}
      //         uncheckedColor={colors.greyText}
      //         status={this.state.selected === 'Paytm' ? 'checked' : 'unchecked'}
      //         onPress={() => {
      //           this.setState({selected: 'Paytm'});
      //         }}
      //       />
      //       <Text
      //         style={
      //           this.state.selected == 'Paytm'
      //             ? radio_text_selected
      //             : radio_text_unselected
      //         }>
      //         {'Paytm'}
      //       </Text>
      //     </View>
      //     {this.state.selected == 'Paytm' ? (
      //       <View style={[column, inner_list]}>
      //         <Text style={text_style}>Phone number</Text>
      //         <View style={[input_container, centered_text]}>
      //           <TextInputMask
      //             require
      //             allowFontScaling={false}
      //             require
      //             placeholder="Phone"
      //             type={'custom'}
      //             options={{
      //               mask: '9999999999',
      //             }}
      //             keyboardType="numeric"
      //             onChangeText={phone => this.setState({phone})}
      //             value={this.state.phone}
      //             style={input_box}
      //           />
      //         </View>
      //       </View>
      //     ) : (
      //       <View />
      //     )}
      //     <View style={[row, radio_button_list]}>
      //       <RadioButton
      //         value="Debit card"
      //         color={colors.primaryColor}
      //         uncheckedColor={colors.greyText}
      //         status={
      //           this.state.selected === 'Debit card' ? 'checked' : 'unchecked'
      //         }
      //         onPress={() => {
      //           this.setState({selected: 'Debit card'});
      //         }}
      //       />
      //       <Text
      //         style={
      //           this.state.selected == 'Debit card'
      //             ? radio_text_selected
      //             : radio_text_unselected
      //         }>
      //         {'Debit card'}
      //       </Text>
      //     </View>
      //     <View style={[row, radio_button_list]}>
      //       <RadioButton
      //         value="Credit card"
      //         color={colors.primaryColor}
      //         uncheckedColor={colors.greyText}
      //         status={
      //           this.state.selected === 'Credit card' ? 'checked' : 'unchecked'
      //         }
      //         onPress={() => {
      //           this.setState({selected: 'Credit card'});
      //         }}
      //       />
      //       <Text
      //         style={
      //           this.state.selected == 'Credit card'
      //             ? radio_text_selected
      //             : radio_text_unselected
      //         }>
      //         {'Credit card'}
      //       </Text>
      //     </View>
      //     {this.state.selected == 'Credit card' ? (
      //       <View style={[column, inner_list]}>
      //         <Text style={text_style}>Card number</Text>
      //         <View style={[input_container, centered_text]}>
      //           <TextInputMask
      //             require
      //             allowFontScaling={false}
      //             require
      //             placeholder="Card number"
      //             type={'custom'}
      //             options={{
      //               mask: '9999 9999 9999 9999',
      //             }}
      //             keyboardType="numeric"
      //             onChangeText={cardNumber => this.setState({cardNumber})}
      //             value={this.state.cardNumber}
      //             style={input_box}
      //           />
      //         </View>
      //         <View style={[row, between_spacing, top_spacing]}>
      //           <View style={column}>
      //             <Text style={text_style}>Expiration date</Text>
      //             <View style={row}>
      //               <View
      //                 style={[
      //                   row,
      //                   between_spacing,
      //                   input_container,
      //                   date_container,
      //                 ]}>
      //                 <TextInputMask
      //                   require
      //                   allowFontScaling={false}
      //                   require
      //                   placeholder="Month"
      //                   type={'custom'}
      //                   options={{
      //                     mask: '99',
      //                   }}
      //                   keyboardType="numeric"
      //                   onChangeText={month => this.setState({month})}
      //                   value={this.state.month}
      //                   style={[expiration_input_container, month_input]}
      //                 />
      //                 <Image
      //                   resizeMode="contain"
      //                   source={require('../../assets/down_arrow.png')}
      //                   style={down_arrow_icon}
      //                 />
      //               </View>
      //               <View
      //                 style={[
      //                   row,
      //                   between_spacing,
      //                   input_container,
      //                   year_container,
      //                 ]}>
      //                 <TextInputMask
      //                   require
      //                   allowFontScaling={false}
      //                   require
      //                   placeholder="Year"
      //                   type={'custom'}
      //                   options={{
      //                     mask: '9999',
      //                   }}
      //                   keyboardType="numeric"
      //                   onChangeText={year => this.setState({year})}
      //                   value={this.state.year}
      //                   style={[expiration_input_container, year_input]}
      //                 />
      //                 <Image
      //                   resizeMode="contain"
      //                   source={require('../../assets/down_arrow.png')}
      //                   style={down_arrow_icon}
      //                 />
      //               </View>
      //             </View>
      //           </View>
      //           <View style={column}>
      //             <Text style={text_style}>Security code</Text>
      //             <View style={[row, centered_text]}>
      //               <View
      //                 style={[
      //                   input_container,
      //                   date_year_container,
      //                   centered_text,
      //                 ]}>
      //                 <TextInputMask
      //                   require
      //                   allowFontScaling={false}
      //                   require
      //                   placeholder="Three digits"
      //                   type={'custom'}
      //                   options={{
      //                     mask: '999',
      //                   }}
      //                   keyboardType="numeric"
      //                   onChangeText={code => this.setState({code})}
      //                   value={this.state.code}
      //                   style={[expiration_input_container, code_input]}
      //                 />
      //               </View>
      //               <Image
      //                 resizeMode="contain"
      //                 source={require('../../assets/about_eat_it.png')}
      //                 style={icon}
      //               />
      //             </View>
      //           </View>
      //         </View>
      //       </View>
      //     ) : (
      //       <View />
      //     )}

      //     <TouchableOpacity activeOpacity={0.7} onPress={this.onPlaceOrder}>
      //       <LinearGradient
      //         start={{x: 0, y: 0}}
      //         end={{x: 1, y: 0}}
      //         colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
      //         style={[button_container, centered_text]}>
      //         <Text style={button_text}>Place order</Text>
      //       </LinearGradient>
      //     </TouchableOpacity>
      //   </View>
      // </View>
    );
  }
}
