import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import Footer from '../../components/footer';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import { color } from "react-native-reanimated";



export default class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { container, column, row, between_spacing, settings, profile_image, profile_container, profile, footer_container } = styles
        return (
            <View style={[container, column, between_spacing]}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
                    style={profile_container} >
                    <Image resizeMode='stretch' source={require('../../assets/settings.png')} style={settings}></Image>
                    <Image resizeMode='cover' source={require('../../assets/profile1.png')} style={profile_image}></Image>
                </LinearGradient>
            
                <View style={footer_container}>
                    <Footer></Footer>
                </View>
            </View>
        )
    }
}














