import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import LinearGradient from 'react-native-linear-gradient';


export default class footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHome: true,
            isSearch: false,
            isAdd: false,
            isMyFood: false,
            isProfile: false
        };
    }
    onHome = async () => {
        await this.setState({
            isHome: true,
            isSearch: false,
            isAdd: false,
            isMyFood: false,
            isProfile: false
        })
        this.props.navigation.navigate('Home');
    }
    onSearch = async () => {
        await this.setState({
            isHome: false,
            isSearch: true,
            isAdd: false,
            isMyFood: false,
            isProfile: false
        })
        await this.props.navigation.navigate('Search');
    }
    onLogin = async () => {
        await this.setState({
            isHome: false,
            isSearch: false,
            isAdd: true,
            isMyFood: false,
            isProfile: false
        })
        this.props.navigation.navigate('Login');
    }
    onMyFood = async () => {
        await this.setState({
            isHome: false,
            isSearch: false,
            isAdd: false,
            isMyFood: true,
            isProfile: false
        })
        // await this.props.navigation.navigate('MyFood');
    }

    onProfile = async () => {
        await this.setState({
            isHome: false,
            isSearch: false,
            isAdd: false,
            isMyFood: false,
            isProfile: true
        })
        this.props.navigation.navigate('Profile');
    }

    render() {
        const { container, icons, share_icon, shadow } = styles
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#F8B614', '#B49579']}
                style={container} >
                <TouchableOpacity onPress={this.onHome}><Image source={this.state.isHome ? require('../../assets/home_selected.png') : require('../../assets/home.png')} style={icons}></Image></TouchableOpacity>
                <TouchableOpacity onPress={this.onSearch}><Image source={this.state.isSearch ? require('../../assets/search_selected.png') : require('../../assets/search.png')} style={icons}></Image></TouchableOpacity>
                <TouchableOpacity onPress={this.onLogin}>
                    <View style={shadow}>
                        <Image source={require('../../assets/share_icon.png')} style={share_icon}></Image>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onMyFood}><Image source={this.state.isMyFood ? require('../../assets/my_food_selected.png') : require('../../assets/my_food.png')} style={icons}></Image></TouchableOpacity>
                <TouchableOpacity onPress={this.onProfile}><Image source={this.state.isProfile ? require('../../assets/profile_selected.png') : require('../../assets/profile.png')} style={icons}></Image></TouchableOpacity>
            </LinearGradient>
        );
    }
}