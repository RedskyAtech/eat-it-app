import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions,BackHandler } from "react-native";
import styles from "./style";
import Footer from '../../components/footer';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { Badge } from 'react-native-elements';
import HandleBack from "../../components/HandleBack";


const ViewTypes = {
    HALF_LEFT: 1,
    HALF_BETWEEN: 2,
    HALF_RIGHT: 3
};

class CellContainer extends React.Component {
    constructor(args) {
        super(args);
        this.state = {}
    }
    render() {
        const { heading_text, row, heading_container, column, between_spacing, colored_text, grey_text, image } = styles
        return (
            <>
                <View {...this.props}>
                    <Image resizeMode='stretch' source={this.props.data.image} style={image} ></Image>
                </View>
                <View style={[heading_container, column]}>
                    <Text style={heading_text} numberOfLines={1}>{this.props.data.name}</Text>
                    <View style={[row, between_spacing]}>
                        <Text style={colored_text}>Rs {this.props.data.price}</Text>
                        <Text style={grey_text}>{this.props.data.time}</Text>
                    </View>
                    <Text style={grey_text} numberOfLines={1}>{this.props.data.address}</Text>
                </View>
            </>
        )
    }
}

export default class home extends Component {
    constructor(props) {
        super(props);
        let { width } = Dimensions.get("window");
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        this._layoutProvider = new LayoutProvider(
            index => {
                if (index % 2 === 1) {
                    return ViewTypes.HALF_LEFT;
                } else if (index % 2 === 2) {
                    return ViewTypes.HALF_BETWEEN;
                } else {
                    return ViewTypes.HALF_RIGHT;
                }
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.HALF_LEFT:
                        dim.width = width / 3.02;
                        dim.height = 170;
                        break;
                    case ViewTypes.HALF_BETWEEN:
                        dim.width = width / 3.02;
                        dim.height = 170;
                        break;
                    case ViewTypes.HALF_RIGHT:
                        dim.width = width / 3.02;
                        dim.height = 170;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);
        this.products = [{
            id: 1,
            name: 'Vision Resort',
            price: '50',
            time: '06:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/food.jpg')
        }, {
            id: 2,
            name: 'Vision Resort',
            price: '50',
            time: '06:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/burger.jpg')

        }, {
            id: 3,
            name: 'Vision Resort',
            price: '50',
            time: '07:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/sweet.jpg')

        }, {
            id: 4,
            name: 'Vision Resort',
            price: '50',
            time: '06:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/burger.jpg')

        }, {
            id: 5,
            name: 'Vision Resort',
            price: '50',
            time: '08:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/sweet.jpg')

        }, {
            id: 6,
            name: 'Vision Resort',
            price: '50',
            time: '09:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/food.jpg')

        }, {
            id: 7,
            name: 'Vision Resort',
            price: '50',
            time: '10:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/food.jpg')

        }, {
            id: 8,
            name: 'Vision Resort',
            price: '50',
            time: '06:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/sweet.jpg')

        }, {
            id: 9,
            name: 'Vision Resort',
            price: '50',
            time: '06:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/burger.jpg')

        }, {
            id: 10,
            name: 'Vision Resort',
            price: '50',
            time: '06:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/food.jpg')

        }, {
            id: 11,
            name: 'Vision Resort',
            price: '50',
            time: '06:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/sweet.jpg')

        }, {
            id: 11,
            name: 'Vision Resort',
            price: '50',
            time: '06:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/burger.jpg')

        }, {
            id: 12,
            name: 'Vision Resort',
            price: '50',
            time: '06:00 pm',
            address: 'Amrit Sweets, Phase 5, Mohali',
            image: require('../../assets/food.jpg')

        },];
        this.state = {
            forYou: true,
            lastSearch: false,
            nearYou: false,
            follow: false,
            dataProvider: dataProvider.cloneWithRows(this._generateArray(this.products)),
        };
    }
    _generateArray(array) {
        let n = array.length
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = array[i];
        }
        return arr;
    }

    _rowRenderer(type, data) {

        switch (type) {
            case ViewTypes.HALF_LEFT:
                return (
                    <CellContainer style={styles.containerGridLeft} data={data}>
                    </CellContainer>
                );
            case ViewTypes.HALF_BETWEEN:
                return (
                    <CellContainer style={styles.containerGridLeft} data={data}>
                    </CellContainer>
                );
            case ViewTypes.HALF_RIGHT:
                return (
                    <CellContainer style={styles.containerGridLeft} data={data}>
                    </CellContainer>
                );

            default:
                return null;
        }
    }
    onForYou = async () => {
        await this.setState({ forYou: true, lastSearch: false, nearYou: false, follow: false })
    }
    onLastSearch = async () => {
        await this.setState({ forYou: false, lastSearch: true, nearYou: false, follow: false })
    }
    onNearYou = async () => {
        await this.setState({ forYou: false, lastSearch: false, nearYou: true, follow: false })
    }
    onFollow = async () => {
        await this.setState({ forYou: false, lastSearch: false, nearYou: false, follow: true })
    }
    onBack = async () => {
        BackHandler.exitApp()
        return true;
    }

    render() {
        const { container, container_width, top_container, row, list_container, icons, center_align, badge_style, selected_color, badge_text_style, filter_text, filter_container, unselected_color, filters, column, between_spacing, around_spacing, search_icon, search_input, search_container, footer_container } = styles
        return (
            <HandleBack onBack={this.onBack}>
                <View style={[container, column, between_spacing]}>

                    <View style={top_container}>
                        <View >
                            <View style={[row, between_spacing, container_width]}>
                                <Image resizeMode='contain' source={require('../../assets/location.png')} style={icons}></Image>
                                <View style={[search_container, row, around_spacing]}>
                                    <Image resizeMode='contain' source={require('../../assets/search.png')} style={search_icon} ></Image>
                                    <TextInput placeholder="Search" style={search_input} />
                                </View>
                                <View style={[row, center_align]}>
                                    <Image resizeMode='contain' source={require('../../assets/notification_solid_yellow.png')} style={icons} ></Image>
                                    <Badge value="1" status="success" badgeStyle={badge_style} textStyle={badge_text_style} />
                                </View>
                            </View>

                            <View style={[row, filter_container]}>
                                <TouchableOpacity onPress={this.onForYou}><View style={this.state.forYou ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>For you</Text></View></TouchableOpacity>
                                <TouchableOpacity onPress={this.onLastSearch}><View style={this.state.lastSearch ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>Last search</Text></View></TouchableOpacity>
                                <TouchableOpacity onPress={this.onNearYou}><View style={this.state.nearYou ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>Near you</Text></View></TouchableOpacity>
                                <TouchableOpacity onPress={this.onFollow}><View style={this.state.follow ? [filters, selected_color] : [filters, unselected_color]}><Text style={filter_text}>Follow</Text></View></TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={list_container}>
                        <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />
                    </View>

                    <View style={footer_container}>
                        <Footer></Footer>
                    </View>

                </View>
            </HandleBack>
        );
    }
}