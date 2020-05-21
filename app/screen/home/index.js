import React, { Component } from "react";
import { View, Text } from 'react-native';
import styles from './style';
import  Header  from "../../components/header";


export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { container } = styles
        return (
            <>
            <Header></Header>
            <View style={container}>
                <Text >Home Screen</Text>
            </View>
            
            </>
        )
    }
}