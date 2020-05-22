import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';


export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendOtp: false,
            firstDigit: '',
            secondDigit: '',
            thirdDigit: '',
            fourthDigit: '',
            fill: false
        }
    }
    sendOtp = async () => {
        await this.setState({ sendOtp: true })
    }
    onFirstChange = async (value) => {
        await this.setState({ firstDigit: value })
        if (value) {
            this.refs.second.focus();
        }
    }
    onSecondChange = async (value) => {
        await this.setState({ secondDigit: value })
        if (value) {
            this.refs.third.focus();
        }
    }
    onThirdChange = async (value) => {
        await this.setState({ thirdDigit: value })
        if (value) {
            this.refs.fourth.focus();
        }
    }
    onFourthChange = async (value) => {
        await this.setState({ fourthDigit: value })
        if (this.state.firstDigit != "" && this.state.secondDigit != "" && this.state.thirdDigit != "" && this.state.fourthDigit != "") {
            await this.setState({ fill: true })
        } else {
            await this.setState({ fill: false })
        }
    }
    onSubmit = async () => {
        this.props.navigation.navigate('Login');
    }
    render() {
        const { back_container, logo_container, colored_text, otp_fields, primary_color, otp_input_box, background_theme_color, button_container, button_text, centered_text, fields, row, field_icons, column, container, arrow, logo, headings, text, fields_container, input_box } = styles
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground source={require('../../assets/login_background.png')}
                    style={container} resizeMode="cover">
                    <Image resizeMode='contain' source={require('../../assets/back_arrow.png')} style={[back_container, arrow]}></Image>

                    <View style={logo_container}>
                        <Image resizeMode='stretch' source={require('../../assets/logo.png')} style={logo}></Image>
                    </View>

                    <View style={[headings, row, centered_text]}>
                        <Text style={text}>{this.state.sendOtp ? 'Set Password' : 'Forgot Password'}</Text>
                    </View>

                    <View style={[column, fields_container]}>

                        <View style={[row, centered_text]}>
                            <Text style={[colored_text, primary_color]}> {this.state.sendOtp ? 'Enter four digit OTP that has been sent to your email/phone' : 'Please enter your email or phone and we will send an OTP'}</Text>
                        </View>

                        {!this.state.sendOtp ?
                            <View>
                                <View style={[row, fields]}>
                                    <Image source={require('../../assets/email.png')} style={field_icons}></Image>
                                    <TextInput placeholder="Enter registered mobile / email" style={input_box} />
                                </View>

                                <TouchableOpacity onPress={this.sendOtp}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#F8B614', '#B49579']}
                                        style={[button_container, centered_text]} >
                                        <Text style={button_text}>Send OTP</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View> :
                            <View>
                                <View style={[row, otp_fields, centered_text]}>
                                    <TextInput style={this.state.firstDigit != "" ? [otp_input_box, background_theme_color] : otp_input_box} maxLength={1} keyboardType="numeric" onChangeText={this.onFirstChange} />
                                    <TextInput style={this.state.secondDigit != "" ? [otp_input_box, background_theme_color] : otp_input_box} maxLength={1} keyboardType="numeric" ref="second" onChangeText={this.onSecondChange} />
                                    <TextInput style={this.state.thirdDigit != "" ? [otp_input_box, background_theme_color] : otp_input_box} maxLength={1} keyboardType="numeric" ref="third" onChangeText={this.onThirdChange} />
                                    <TextInput style={this.state.fourthDigit != "" ? [otp_input_box, background_theme_color] : otp_input_box} maxLength={1} keyboardType="numeric" ref="fourth" onChangeText={this.onFourthChange} />
                                </View>
                                {!this.state.fill ?
                                    <View style={[row, centered_text]}>
                                        <Text>OTP expires in <Text style={primary_color}>03:30</Text></Text>
                                    </View>
                                    :
                                    <View>
                                        <View style={[row, fields]}>
                                            <Image source={require('../../assets/password.png')} style={field_icons}></Image>
                                            <TextInput placeholder="New password" style={input_box} />
                                        </View>
                                        <View style={[row, fields]}>
                                            <Image source={require('../../assets/password.png')} style={field_icons}></Image>
                                            <TextInput placeholder="Confirm new password" style={input_box} />
                                        </View>

                                        <TouchableOpacity onPress={this.onSubmit}>
                                            <LinearGradient
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                colors={['#F8B614', '#B49579']}
                                                style={[button_container, centered_text]} >
                                                <Text style={button_text}>Submit</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        }
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
