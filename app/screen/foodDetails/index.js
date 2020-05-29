import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from '../../utility/index';
import * as colors from '../../constants/colors';

export default class addPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [
                { source: require('../../assets/food.jpg') },
                { source: require('../../assets/burger.jpg') },
                { source: require('../../assets/food.jpg') },
                { source: require('../../assets/burger.jpg') },
            ]
        }
    }

    onBack = async () => {
        this.props.navigation.navigate('tab1');
    }
    get pagination() {
        const { activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={this.state.images.length}
                activeDotIndex={activeSlide}
                dotStyle={styles.dot_style}
                inactiveDotStyle={styles.inactive_dot_styles}
                inactiveDotScale={0.6}
            />
        );
    }
    _renderItem = ({ item, index }) => {
        return (
            <Image resizeMode='cover'  style={styles.images} source={item.source} />
        );
    }
   
    render() {
        const { inner_container, button_container, content_container_style,
            button_text, centered_text, scroll_container, colored_text, timing_heading_style,
            non_veg_icon, type_text, price, address_style, bottom_spacing,
            like_icon, product_name, detail_container, bottom_container,
            spacing, row, arrow, heading_text, between_spacing, } = styles
        return (
            <View>
                <View style={[inner_container, row, between_spacing, spacing]}>
                    <TouchableOpacity onPress={this.onBack}><Image resizeMode='contain' source={require('../../assets/back_arrow.png')} style={arrow}></Image></TouchableOpacity>
                    <Text style={heading_text}>Food detail</Text>
                    <View><Text>     </Text></View>
                </View>

                <Carousel
                    layout={"default"}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.images}
                    renderItem={this._renderItem}
                    sliderWidth={wp(85)}
                    itemWidth={wp(85)}
                    autoplay={true}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    containerCustomStyle={scroll_container}
                    contentContainerStyle={content_container_style}
                />
                {this.pagination}

                <View style={[detail_container]}>

                    <View style={[row, between_spacing, bottom_spacing]}>
                        <Text style={product_name}>Bolognese Baked Potato</Text>
                        <Image resizeMode='cover' style={like_icon} source={require('../../assets/heart_fill.png')} />
                    </View>

                    <Text style={[address_style, bottom_spacing]}>Amrit Sweets, Phase 5, Mohali</Text>

                    <View style={[row, between_spacing, bottom_spacing]}>
                        <Text style={[price, colored_text]}>Rs 50</Text>
                        <View style={[row, { alignItems: 'center' }]}>
                            <View style={non_veg_icon}></View>
                            <Text style={type_text}>Non-veg</Text>
                        </View>
                    </View>

                    <View style={[row, bottom_spacing]}>
                        <Text style={timing_heading_style}>Cooking time : </Text>
                        <Text style={address_style}>6 pm</Text>
                    </View>
                    <View style={[row, bottom_spacing]}>
                        <Text style={timing_heading_style}>Pickup time : </Text>
                        <Text style={address_style}>6 pm - 10 pm</Text>
                    </View>
                    <View style={[row, bottom_spacing]}>
                        <Text style={timing_heading_style}>Home delivery price : </Text>
                        <Text style={address_style}>Rs 20</Text>
                    </View>
                    <View style={[row, bottom_spacing]}>
                        <Text style={timing_heading_style}>Total payable amount : </Text>
                        <Text style={[address_style, colored_text]}>Rs 70</Text>
                    </View>

                    <View style={[bottom_container, bottom_spacing]}>
                        <Text></Text>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
                                style={[button_container, centered_text]} >
                                <Text style={button_text}>Buy food</Text>
                            </LinearGradient>
                    </View>

                </View>
            </View>
        )
    }
}