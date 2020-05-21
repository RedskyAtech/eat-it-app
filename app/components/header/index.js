import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
} from "react-native";
import styles from "./style";
import { NavigationActions, StackActions } from 'react-navigation';
import { Header, Left, Right, Button, Title, } from 'native-base';


export default class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'products',
            isLoginModalVisible: false,
            isAbortProcessModalVisible: false,
        };
    }

    right = async () => {
        alert('right clicked');
    }
    
    left = async () => {
        alert('left clicked');
    }

    render() {
        return (
            <Header style={styles.headerView}>
                <Left>
                    <Button style={styles.headerBtn} transparent onPress={() => this.left()}>
                        <Text>Left</Text>
                    </Button>
                </Left>
                <Title allowFontScaling={false} style={styles.HeaderTitle}>Home</Title>
                <Right>
                    <Button style={styles.headerBtn} transparent onPress={() => this.right()}>
                        <Text>Right</Text>
                    </Button>
                </Right>
            </Header>
        );
    }
}