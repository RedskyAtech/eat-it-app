import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import Modal from "react-native-modal";

export default class shareFoodDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
    }
    componentDidMount = async () => {
        // await this.setState({ isVisible: this.props.visible })
    }

    close = async () => {
        this.props.closeDialog()
    }
    forward = async () => {
        this.props.onAddPhotos();
    }

    render() {
        const { container, column, row, arrow, forward_container, cancel_style, button_container, bottom_margin, vertical_margin, dialog_container, text_style } = styles
        return (
            <Modal backdropOpacity={1} backdropColor={'grey'} isVisible={true}
                hasBackdrop={false}>

                <View style={[container, column, { justifyContent: 'space-around' }]}>

                    <View style={[dialog_container, vertical_margin, column]}>

                        <Text style={[text_style, bottom_margin]}>Want to Sale your food or helps other, who needs food.</Text>

                        <View style={[row, button_container]}>
                            <TouchableOpacity onPress={() => this.close()}>
                                <Text style={cancel_style}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.forward()}>
                                <View style={forward_container} >
                                    <Image resizeMode='contain' source={require('../../assets/next_button_arrow.png')} style={arrow}></Image>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View >
            </Modal>

        )
    }
}
