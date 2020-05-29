import React, { Component } from "react";
import { View, Image, ImageBackground } from 'react-native';
import styles from './style';

export default class splash extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.timeoutHandle = setTimeout(() => {
            this.retrieveData();
        }, 2000);
    }

    retrieveData = async () => {
        this.props.navigation.navigate('Login');
    }
    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }
    render() {
        const { container, logo } = styles
        return (
            <View>
                <ImageBackground source={require('../../assets/background.png')}
                    style={container} resizeMode="cover" >
                    <Image resizeMode='contain'
                        source={require('../../assets/eatit_logo.png')} style={logo} ></Image>
                </ImageBackground>
            </View>
        )
    }
}