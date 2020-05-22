import React, { Component } from "react";
import { View, Text, Image, } from "react-native";
import styles from "./style";
import Footer from '../../components/footer';

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { container,row, footer_container } = styles
        return (
            <View style={[container, row]}>
                <View>
                    <Text>home</Text>
                </View>
                <View style={footer_container}>
                    <Footer></Footer>
                </View>
            </View>
        );
    }
}