import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import { RadioButton } from 'react-native-paper';
import * as colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";

export default class dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: 'Yummy',
            like: false,
            dislike: false,
            isVisible: false,
            starOne: false,
            starTwo: false,
            starThree: false,
            starFour: false,
            starFive: false,
        }
    }
    componentDidMount = async () => {
        await this.setState({ isVisible: this.props.visible })
    }
    onLike = async () => {
        await this.setState({ like: !this.state.like, dislike: false })
    }
    onDisLike = async () => {
        await this.setState({ dislike: !this.state.dislike, like: false });
        setTimeout(() => {
            this.props.closeDialog()
        }, 1000);
    }
    close = async () => {
        this.props.closeDialog()
    }
    onFirst = async () => {
        await this.setState({ starOne: !this.state.starOne });
    }
    onSecond = async () => {
        await this.setState({ starTwo: !this.state.starTwo });
    }
    onThird = async () => {
        await this.setState({ starThree: !this.state.starThree });
    }
    onFourth = async () => {
        await this.setState({ starFour: !this.state.starFour });
    }
    onFifth = async () => {
        await this.setState({ starFive: !this.state.starFive });
    }
    render() {
        const { container, column, row, like_container, button, centered_text, cancel_style, button_container, button_text, radio_button_list, star_container, radio_text_selected, radio_text_unselected, row_centered, bottom_margin, vertical_margin, between_spacing, like_icon, dialog_container, text_style } = styles
        return (
            <Modal backdropOpacity={1} backdropColor={'grey'} isVisible={this.props.visible}
                hasBackdrop={false}>

                <View style={[container, column, { justifyContent: 'space-around' }]}>

                    <View style={[dialog_container, vertical_margin, column]}>

                        <Text style={[text_style, bottom_margin]}>Want to like or dislike food ?</Text>

                        <View style={[row, like_container, bottom_margin]}>
                            <TouchableOpacity onPress={this.onLike}><Image resizeMode='stretch' source={this.state.like ? require('../../assets/like.png') : require('../../assets/like_blank.png')} style={like_icon} ></Image></TouchableOpacity>
                            <TouchableOpacity onPress={this.onDisLike}><Image resizeMode='stretch' source={this.state.dislike ? require('../../assets/dislike.png') : require('../../assets/dislike_blank.png')} style={like_icon} ></Image></TouchableOpacity>
                        </View>
                        {this.state.like == true ?
                            < >
                                <View style={[row, bottom_margin, radio_button_list]}>
                                    <View style={[row, row_centered]}>
                                        <RadioButton value="Yummy" color={colors.primaryColor} uncheckedColor={colors.greyText}
                                            status={this.state.checked === 'Yummy' ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ checked: 'Yummy' }); }}
                                        /><Text style={this.state.checked == "Yummy" ? radio_text_selected : radio_text_unselected}>Yummy</Text>
                                    </View>
                                    <View style={[row, row_centered]}>
                                        <RadioButton value="Delicious" color={colors.primaryColor} uncheckedColor={colors.greyText}
                                            status={this.state.checked === 'Delicious' ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ checked: 'Delicious' }); }}
                                        /><Text style={this.state.checked == "Delicious" ? radio_text_selected : radio_text_unselected}>Delicious</Text>
                                    </View>
                                    <View style={[row, row_centered]}>
                                        <RadioButton value="Tasty" color={colors.primaryColor} uncheckedColor={colors.greyText}
                                            status={this.state.checked === 'Tasty' ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ checked: 'Tasty' }); }}
                                        /><Text style={this.state.checked == "Tasty" ? radio_text_selected : radio_text_unselected}>Tasty</Text>
                                    </View>
                                </View>

                                <View style={[row, bottom_margin, star_container]}>
                                    <TouchableOpacity onPress={this.onFirst}><Image resizeMode='stretch' source={this.state.starOne ? require('../../assets/star.png') : require('../../assets/star_unselected.png')} style={like_icon} ></Image></TouchableOpacity>
                                    <TouchableOpacity onPress={this.onSecond}><Image resizeMode='stretch' source={this.state.starTwo ? require('../../assets/star.png') : require('../../assets/star_unselected.png')} style={like_icon} ></Image></TouchableOpacity>
                                    <TouchableOpacity onPress={this.onThird}><Image resizeMode='stretch' source={this.state.starThree ? require('../../assets/star.png') : require('../../assets/star_unselected.png')} style={like_icon} ></Image></TouchableOpacity>
                                    <TouchableOpacity onPress={this.onFourth}><Image resizeMode='stretch' source={this.state.starFour ? require('../../assets/star.png') : require('../../assets/star_unselected.png')} style={like_icon} ></Image></TouchableOpacity>
                                    <TouchableOpacity onPress={this.onFifth}><Image resizeMode='stretch' source={this.state.starFive ? require('../../assets/star.png') : require('../../assets/star_unselected.png')} style={like_icon} ></Image></TouchableOpacity>
                                </View>

                                <View style={[row, bottom_margin, button_container, { alignItems: 'center' }]}>
                                    <TouchableOpacity onPress={() => this.close()}>
                                        <Text style={cancel_style}>Cancel</Text>
                                    </TouchableOpacity>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#F8B614', '#B49579']}
                                        style={[button, centered_text]} >
                                        <TouchableOpacity onPress={() => this.close()}><Text style={button_text}>Done</Text></TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </>
                            : <View></View>}
                    </View>

                </View >
            </Modal>

        )
    }
}
