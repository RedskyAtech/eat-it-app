import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import LinearGradient from 'react-native-linear-gradient';


export default class footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onHome = async () => {
       await this.props.navigation.navigate('Home');
    }
    onLogin = async () => {
        await this.props.navigation.navigate('Login');
    }
    onProfile = async () => {
        await this.props.navigation.navigate('Profile');
    }

    render() {
        const { container, icons, share_icon, shadow } = styles
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#F8B614', '#B49579']}
                style={container} >
                <TouchableOpacity onPress={this.onHome}><Image source={require('../../assets/home.png')} style={icons}></Image></TouchableOpacity>
                <Image source={require('../../assets/search.png')} style={icons}></Image>
                <TouchableOpacity onPress={this.onLogin}>
                    <View style={shadow}>
                        <Image source={require('../../assets/share_icon.png')} style={share_icon}></Image>
                    </View>
                </TouchableOpacity>
                <Image source={require('../../assets/my_food.png')} style={icons}></Image>
                <TouchableOpacity onPress={this.onProfile}><Image source={require('../../assets/profile.png')} style={icons}></Image></TouchableOpacity>
            </LinearGradient>
        );
    }
}