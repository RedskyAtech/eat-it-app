import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { ProgressBar, Colors } from 'react-native-paper';



export default class filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            free: true,
            paid: false,
            veg: true,
            nonVeg: false,
            homeMade: false,
            restaurant: false
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
        const { container, inner_container, bottom_container, forward_container, km_text, price_container, price_text, percentage, inner_heading, progress_bar, filter_box, row, filter_text, arrow, filter_container, filters, column, selected_color, unselected_color, heading_text, between_spacing } = styles
        return (
            <View style={[container, column, between_spacing]}>
                <View>
                    <View style={[inner_container, row, between_spacing]}>
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
                        <ProgressBar progress={0.4} color={'#FFBA09'} style={progress_bar} />
                        <View style={[row, between_spacing,]}>
                            <Text style={km_text}>0 km</Text>
                            <Text style={[km_text, percentage]}>10 km</Text>
                            <Text style={km_text}>50 km</Text>
                        </View>
                    </View>

                    {this.state.paid ?
                        <View style={[column, filter_box, filter_container]}>
                            <Text style={inner_heading}>Cost</Text>
                            <View style={[row, filter_container]}>
                                <View style={price_container}>
                                    <Text style={price_text}>Min. cost</Text>
                                </View>
                                <View style={price_container}>
                                    <Text style={price_text}>Max. cost</Text>
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