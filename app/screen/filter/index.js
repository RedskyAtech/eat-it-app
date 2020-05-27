import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './style';
import { Slider } from 'react-native-elements';


export default class filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            free: true,
            paid: false,
            veg: true,
            nonVeg: false,
            homeMade: false,
            restaurant: false,
            value: 10
        }
    }
    onFree = async () => {
        await this.setState({ free: true, paid: false })
    }
    onPaid = async () => {
        await this.setState({ free: false, paid: true })
    }
    onVeg = async () => {
        await this.setState({
            veg: true,
            nonVeg: false,
            homeMade: false,
            restaurant: false
        })
    }
    onNonVeg = async () => {
        await this.setState({
            veg: false,
            nonVeg: true,
            homeMade: false,
            restaurant: false
        })
    }
    onHomeMade = async () => {
        await this.setState({
            veg: false,
            nonVeg: false,
            homeMade: true,
            restaurant: false
        })
    }
    onRestaurant = async () => {
        await this.setState({
            veg: false,
            nonVeg: false,
            homeMade: false,
            restaurant: true
        })
    }
    onBack = async () => {
        this.props.navigation.navigate('tab2');
    }
    render() {
        const { container, inner_container, thumb_style,spacing, bottom_container, input_box, forward_container, km_text, price_container, price_text, percentage, inner_heading, progress_bar, filter_box, row, filter_text, arrow, filter_container, filters, column, selected_color, unselected_color, heading_text, between_spacing } = styles
        return (
            <View style={[container, column, between_spacing]}>
                <View>
                    <View style={[inner_container, row, between_spacing,spacing]}>
                        <TouchableOpacity onPress={this.onBack}><Image resizeMode='contain' source={require('../../assets/back_arrow.png')} style={arrow}></Image></TouchableOpacity>
                        <Text style={heading_text}>Filters</Text>
                        <View><Text>     </Text></View>
                    </View>

                    <View style={[column, filter_box]}>
                        <Text style={inner_heading}>Cost</Text>
                        <View style={[row, filter_container]}>
                            <TouchableOpacity onPress={this.onFree}><View style={this.state.free ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>Free</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={this.onPaid}><View style={this.state.paid ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>Paid</Text></View></TouchableOpacity>
                        </View>
                    </View>

                    <View style={[column, filter_box]}>
                        <Text style={inner_heading}>Food type</Text>
                        <View style={[row, filter_container, { flexWrap: 'wrap' }]}>
                            <TouchableOpacity onPress={this.onVeg}><View style={this.state.veg ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>Veg</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={this.onNonVeg}><View style={this.state.nonVeg ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>Non-veg</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={this.onHomeMade}><View style={this.state.homeMade ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>Home made</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={this.onRestaurant}><View style={this.state.restaurant ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>Restaurant</Text></View></TouchableOpacity>
                        </View>
                    </View>

                    <View style={[column, filter_box]}>
                        <Text style={inner_heading}>Distance</Text>
                        <Slider
                            value={this.state.value}
                            thumbTintColor={'#FFBA09'}
                            maximumTrackTintColor={'grey'}
                            minimumTrackTintColor={'#FFBA09'}
                            minimumValue={0}
                            maximumValue={50}
                            trackStyle={progress_bar}
                            thumbStyle={thumb_style}
                            onValueChange={value => this.setState({value: value})}
                        />
                        <View style={[row, between_spacing,]}>
                            <Text style={km_text}>0 km</Text>
                            <Text style={[km_text, percentage]}>{this.state.value.toFixed(0)} km</Text>
                            <Text style={km_text}>50 km</Text>
                        </View>
                    </View>

                    {this.state.paid ?
                        <View style={[column, filter_box, filter_container]}>
                            <Text style={inner_heading}>Cost</Text>
                            <View style={[row, filter_container]}>
                                <View style={price_container}>
                                    <TextInput keyboardType="numeric" placeholder="Min. cost" placeholderTextColor={'#6A6A6A'} style={input_box} />
                                </View>
                                <View style={price_container}>
                                    <TextInput keyboardType="numeric" placeholder="Max. cost" placeholderTextColor={'#6A6A6A'} style={input_box} />
                                </View>
                            </View>
                        </View>
                        : <View></View>
                    }

                </View>

                <View style={bottom_container}>
                    <Text></Text>
                    {/* <TouchableOpacity> */}
                    <View style={forward_container} >
                        <Image resizeMode='contain' source={require('../../assets/next_button_arrow.png')} style={arrow}></Image>
                    </View>
                    {/* </TouchableOpacity> */}
                </View>
            </View>
        )
    }
}