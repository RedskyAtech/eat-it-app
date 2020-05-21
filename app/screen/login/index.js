import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';


export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
    }
    onLogin = async () => {
        await this.setState({ isLogin: true })
    }
    onRegister = async () => {
        await this.setState({ isLogin: false })
    }
    render() {
        const { back_container, logo_container, headings_color, row, column, container, line_container, forward_container, bottom_container, line, or_text, social_container, social_icons, fields, box_align, field_icons, arrow, colored_text, logo, headings, text, text_style, fields_container, input_box, between_spacing } = styles
        return (
            <View>
                <ImageBackground source={require('../../assets/login_background.png')}
                    style={container} resizeMode="cover">

                    <Image resizeMode='contain' source={require('../../assets/back_arrow.png')} style={[back_container, arrow]}></Image>

                    <View style={logo_container}>
                        <Image resizeMode='stretch' source={require('../../assets/logo.png')} style={logo}></Image>
                    </View>

                    <View style={[headings, row]}>
                        <TouchableOpacity onPress={this.onLogin}><Text style={this.state.isLogin ? text : [text, headings_color]}>Login</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this.onRegister}><Text style={!this.state.isLogin ? text : [text, headings_color]}>Register</Text></TouchableOpacity>
                    </View>

                        <View style={[column, fields_container]}>

                            <Text style={[text, { marginVertical: 10 }]}>Welcome here!</Text>
                            {this.state.isLogin ?
                            <View>
                            <View style={[row, fields]}>
                                <Image source={require('../../assets/email.png')} style={field_icons}></Image>
                                <TextInput placeholder="Email" style={input_box} />
                            </View>

                            <View style={[row, fields]}>
                                <Image source={require('../../assets/password.png')} style={field_icons}></Image>
                                <TextInput placeholder="Password" style={input_box} />
                            </View>

                            <View style={[row, between_spacing]}>
                                <Text style={text_style}>Rembember me</Text>
                                <Text style={colored_text}>Forgot password?</Text>
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
                                    <Image source={require('../../assets/facebook.png')} style={social_icons}></Image>
                                    <Image source={require('../../assets/twitter.png')} style={social_icons}></Image>
                                </View>
                            </View>
                             </View>
                            :
                            <View>
                            <View style={[row, fields]}>
                                <Image source={require('../../assets/username.png')} style={field_icons}></Image>
                                <TextInput placeholder="Firstname" style={input_box} />
                            </View>
                            <View style={[row, fields]}>
                                <Image source={require('../../assets/username.png')} style={field_icons}></Image>
                                <TextInput placeholder="Lastname" style={input_box} />
                            </View>
                            <View style={[row, fields]}>
                                <Image source={require('../../assets/email.png')} style={field_icons}></Image>
                                <TextInput placeholder="Email" style={input_box} />
                            </View>
                            <View style={[row, fields]}>
                                <Image source={require('../../assets/phone.png')} style={field_icons}></Image>
                                <TextInput placeholder="Phone" style={input_box} />
                            </View>
                            <View style={[row, fields]}>
                                <Image source={require('../../assets/password.png')} style={field_icons}></Image>
                                <TextInput placeholder="Password" style={input_box} />
                            </View>
                            <View style={[row, fields]}>
                                <Image source={require('../../assets/password.png')} style={field_icons}></Image>
                                <TextInput placeholder="Confirm password" style={input_box} />
                            </View>
                           </View>
                           }
                        </View>
                    
                    <View style={bottom_container}>
                        <Text></Text>
                        <View style={forward_container}>
                            <Image resizeMode='contain' source={require('../../assets/next_button_arrow.png')} style={arrow}></Image>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        )
    }
}