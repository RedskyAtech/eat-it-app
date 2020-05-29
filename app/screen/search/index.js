import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import { Accordion } from "native-base";
import Icon from "react-native-vector-icons/Feather";


export default class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [
                { title: "Langar", content: [{ item: 'Roti' }, { item: 'Daal', }] },
                { title: "Snakes", content: [{ item: 'Tandoori' }, { item: 'Fry', }, { item: 'Others', }] },
                { title: "Breakfast", content: [{ item: 'Roti' }, { item: 'Daal', }] },
                { title: "Lunch", content: [{ item: 'Tandoori' }, { item: 'Fry', }, { item: 'Other', }] },
                { title: "Dinner", content: [{ item: 'Roti' }, { item: 'Daal', }] },
                { title: "Langar", content: [{ item: 'Roti' }, { item: 'Daal', }] },
                { title: "Snakes", content: [{ item: 'Tandoori' }, { item: 'Fry', }, { item: 'Other', }] }
            ]
        }
    }
    _renderHeader(item, expanded) {
        return (
            <View style={[styles.row, styles.between_spacing, styles.inner_container, styles.list_spacing]}>
                <Text style={expanded ? styles.colored_list_title : styles.list_title}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={styles.down_icon} name="chevron-down" />
                    : <Icon style={styles.right_icon} name="chevron-right" />}
            </View>
        );
    }
    _renderContent(item) {
        return (
            <>
                <View style={styles.horizontal_line}></View>
                {item.content.map((value) => {
                    return (
                        <View style={[styles.row, styles.inner_container, styles.inner_list_spacing]}>
                            <Text style={styles.inner_text}>{" "}{value.item}</Text>
                        </View>
                    )
                })}
                <View style={styles.horizontal_line}></View>
            </>
        );
    }
    onFilter = async () => {
        this.props.navigation.navigate('Filter');
    }
    render() {
        const { container, column, search_container, accordian_style, top_container, row, between_spacing, around_spacing, search_input, icons, search_icon } = styles
        return (
            <View style={[container, column, between_spacing]}>
                <View >
                    <View style={[row, between_spacing, top_container]}>
                        <View style={[search_container, row, around_spacing]}>
                            <Image resizeMode='contain' source={require('../../assets/search.png')} style={search_icon} ></Image>
                            <TextInput placeholder="Search" style={search_input} />
                        </View>
                        <TouchableOpacity onPress={this.onFilter}>
                            <Image resizeMode='contain' source={require('../../assets/filter_yellow.png')} style={icons}></Image>
                        </TouchableOpacity>
                    </View>
                    <Accordion style={accordian_style}
                        dataArray={this.state.dataArray}
                        animation={true}
                        expanded={true}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                    />
                </View>

            </View>
        )
    }
}
