import React, { Component } from "react";
import { View, Text, Image, TextInput } from 'react-native';
import styles from './style';
import Footer from '../../components/footer';


export default class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: [{
                name: 'Langar'
            },
            {
                name: 'Snakes'
            },
            {
                name: 'Breakfast'
            }, {
                name: 'Lunch'
            }, {
                name: 'Dinner'
            }, {
                name: 'Deserts'
            }]
        }
    }

    render() {
        const { container, column, search_container, list_title, list_spacing, top_container, list_icons, row, between_spacing, around_spacing, search_input, icons, footer_container, search_icon } = styles
        return (
            <View style={[container, column, between_spacing]}>
                <View >

                    <View style={[row, between_spacing, top_container]}>
                        <View style={[search_container, row, around_spacing]}>
                            <Image resizeMode='contain' source={require('../../assets/search.png')} style={search_icon} ></Image>
                            <TextInput placeholder="Search" style={search_input} />
                        </View>
                        <Image resizeMode='contain' source={require('../../assets/filter_yellow.png')} style={icons}></Image>
                    </View>

                    {/* <View style={[row, between_spacing, top_container, list_spacing]}>
                        <Text style={list_title}>Langar</Text>
                        <Image resizeMode='contain' source={require('../../assets/next_arrow_grey.png')} style={list_icons}></Image>
                    </View>
                    <View style={[row, between_spacing, top_container, list_spacing]}>
                        <Text style={list_title}>Langar</Text>
                        <Image resizeMode='contain' source={require('../../assets/next_arrow_grey.png')} style={list_icons}></Image>
                    </View>
                    <View style={[row, between_spacing, top_container, list_spacing]}>
                        <Text style={list_title}>Langar</Text>
                        <Image resizeMode='contain' source={require('../../assets/next_arrow_grey.png')} style={list_icons}></Image>
                    </View> */}
                    {this.state.searchList.map((item) => {
                        return (
                            <View style={[row, between_spacing, top_container, list_spacing]}>
                                <Text style={list_title}>{item.name}</Text>
                                <Image resizeMode='contain' source={require('../../assets/next_arrow_grey.png')} style={list_icons}></Image>
                            </View>
                        )
                    })}

                </View>

                <View style={footer_container}>
                    <Footer navigation={this.props.navigation}></Footer>
                </View>
            </View>
        )
    }
}