import React, { Component } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './style';
import { Accordion } from "native-base";
import Icon from "react-native-vector-icons/Feather";
import Dialog from '../../screen/dialog';

export default class myFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isDialogVisible: false,
            dataArray: [
                {
                    title: "Food you bought",
                    content: [
                        {
                            heading: 'Lamb Stuffed Sweet Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: false,
                            isVeg: true,
                            time: '06:00 pm',
                            image: require('../../assets/burger.jpg')
                        },
                        {
                            heading: 'Bolognese Baked Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: true,
                            isVeg: false,
                            time: '06:00 pm',
                            image: require('../../assets/food.jpg')
                        }, {
                            heading: 'Lamb Stuffed Sweet Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: true,
                            time: '06:00 pm',
                            isVeg: true,
                            image: require('../../assets/sweet.jpg')
                        }, {
                            heading: 'Lamb Stuffed Sweet Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: 'none',
                            time: '06:00 pm',
                            isVeg: true,
                            image: require('../../assets/food.jpg')
                        }, {
                            heading: 'Merlin Super Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: true,
                            isVeg: false,
                            time: '06:00 pm',
                            image: require('../../assets/burger.jpg')
                        }, {
                            heading: 'Lamb Stuffed Sweet Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: false,
                            time: '06:00 pm',
                            isVeg: true,
                            image: require('../../assets/sweet.jpg')
                        }, {
                            heading: 'Bolognese Baked Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: 'none',
                            isVeg: false,
                            time: '06:00 pm',
                            image: require('../../assets/food.jpg')
                        }, {
                            heading: 'Lamb Stuffed Sweet Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: true,
                            isVeg: true,
                            time: '06:00 pm',
                            image: require('../../assets/burger.jpg')
                        }
                    ]
                },
                {
                    title: "Food you share",
                    content: [
                        {
                            heading: 'Merlin Super Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: 'none',
                            isVeg: false,
                            time: '06:00 pm',
                            image: require('../../assets/burger.jpg')

                        },
                        {
                            heading: 'Bolognese Baked Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: 'none',
                            isVeg: false,
                            time: '06:00 pm',
                            image: require('../../assets/sweet.jpg')
                        }, {
                            heading: 'Merlin Super Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: 'none',
                            time: '06:00 pm',
                            isVeg: true,
                            image: require('../../assets/food.jpg')
                        }, {
                            heading: 'Bolognese Baked Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: 'none',
                            isVeg: true,
                            time: '06:00 pm',
                            image: require('../../assets/sweet.jpg')
                        }, {
                            heading: 'Merlin Super Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: 'none',
                            isVeg: false,
                            time: '06:00 pm',
                            image: require('../../assets/burger.jpg')
                        }, {
                            heading: 'Bolognese Baked Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: 'none',
                            time: '06:00 pm',
                            isVeg: true,
                            image: require('../../assets/food.jpg')
                        }, {
                            heading: 'Lamb Stuffed Sweet Potato',
                            address: 'Amrit Sweets, Phase 5, Mohali',
                            isLiked: 'none',
                            isVeg: true,
                            time: '06:00 pm',
                            image: require('../../assets/burger.jpg')
                        }
                    ]
                },
            ]
        }
    }
    showDialog = () => {
        this.setState({ isDialogVisible: true })
    }
    closeDialog = async () => {
        this.setState({ isDialogVisible: false })
    }
    renderHeader = (item, expanded) => {
        let index
        if (this.state && this.state.dataArray) {
            index = this.state.dataArray.indexOf(item)
        }
        return (
            <View style={[index % 2 == 0 ? styles.even_color : styles.odd_color, styles.row, styles.between_spacing, styles.inner_container, styles.list_item_style, styles.list_spacing]}>
                <Text style={styles.list_item_text}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={styles.top_down_icon} name="chevron-up" />
                    : <Icon style={styles.top_down_icon} name="chevron-down" />}
            </View>
        );
    }
    renderContent = (item) => {
        return (
            <>
                <View style={styles.list_height}>
                    <ScrollView>
                        {item.content.map((value) => {
                            return (
                                <TouchableOpacity onPress={this.showDialog}>
                                    <View style={[styles.row, styles.column_between_spaceing, styles.inner_container, styles.inner_list_spacing]}>

                                        <View style={styles.row}>
                                            <View style={styles.list_image_continer}>
                                                <Image resizeMode='cover' source={value.image} style={styles.list_image} ></Image>
                                            </View>

                                            <View style={[styles.column, styles.column_between_spaceing]}>
                                                <View>
                                                    <View style={[styles.row]}>
                                                        <Text style={styles.product_heading}>{value.heading}</Text>
                                                    </View>
                                                    <Text style={styles.address_text}>{value.address}</Text>
                                                </View>

                                                <View style={[styles.row, styles.between_spacing,]}>
                                                    <View style={[styles.row, styles.row_center_align]}>
                                                        <View style={value.isVeg ? [styles.non_veg_icon, styles.green_color] : [styles.non_veg_icon, styles.red_color]}></View>
                                                        <Text style={styles.text_style}>Non-veg</Text>
                                                    </View>
                                                    <View style={[styles.row, styles.row_center_align]}>
                                                        <Image resizeMode='stretch' source={require('../../assets/clock.png')} style={styles.clock} ></Image>
                                                        <Text style={styles.text_style}>06:00 pm</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[styles.column, styles.column_between_spaceing]}>
                                            {value.isLiked == 'none' ?
                                                <View></View>
                                                : <Image resizeMode='stretch' source={value.isLiked == true ? require('../../assets/like.png') : require('../../assets/dislike.png')} style={[styles.like_dislike_icon, { alignSelf: 'flex-end' }]} ></Image>
                                            }
                                            <Text style={styles.price_text}>Rs 50</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </>
        );
    }
    onBack = async () => {
        this.props.navigation.navigate('tab1');
    }
    render() {
        const { container, inner_container, spacing, centered_text, row, arrow, column, heading_text, between_spacing, } = styles
        return (
            <View style={[container, column, between_spacing]}>
                <View>
                    <View style={[inner_container, row, between_spacing, spacing]}>
                        <TouchableOpacity onPress={this.onBack}><Image resizeMode='contain' source={require('../../assets/back_arrow.png')} style={arrow}></Image></TouchableOpacity>
                        <Text style={heading_text}>My food</Text>
                        <View><Text>     </Text></View>
                    </View>

                    <Accordion style={{ border: 'none' }}
                        dataArray={this.state.dataArray}
                        animation={true}
                        expanded={true}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                    />
                    {this.state.isDialogVisible ?
                        <Dialog visible={this.state.isDialogVisible} closeDialog={this.closeDialog} />
                        :
                        <View></View>
                    }

                </View>
            </View>
        )
    }
}