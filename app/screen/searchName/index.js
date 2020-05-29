import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './style';

export default class searchName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          heading: 'Bolognese Baked Potato',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: false,
          isVeg: true,
          time: '06:00 pm',
          image: require('../../assets/food.jpg'),
        },
        {
          heading: 'Lamb Stuffed Sweet Potato',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: true,
          isVeg: false,
          time: '06:00 pm',
          image: require('../../assets/burger.jpg'),
        },
        {
          heading: 'Merlin Super Jumbo',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: true,
          time: '06:00 pm',
          isVeg: true,
          image: require('../../assets/sweet.jpg'),
        },
        {
          heading: 'Lamb Stuffed Sweet Potato',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: 'none',
          time: '06:00 pm',
          isVeg: true,
          image: require('../../assets/food.jpg'),
        },
        {
          heading: 'Merlin Super Jumbo',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: true,
          isVeg: false,
          time: '06:00 pm',
          image: require('../../assets/burger.jpg'),
        },
        {
          heading: 'Bolognese Baked Potato',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: false,
          time: '06:00 pm',
          isVeg: true,
          image: require('../../assets/sweet.jpg'),
        },
        {
          heading: 'Lamb Stuffed Sweet Potato',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: 'none',
          isVeg: false,
          time: '06:00 pm',
          image: require('../../assets/burger.jpg'),
        },
        {
          heading: 'Bolognese Baked Potato',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: true,
          isVeg: true,
          time: '06:00 pm',
          image: require('../../assets/sweet.jpg'),
        },
        {
          heading: 'Bolognese Baked Potato',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: false,
          time: '06:00 pm',
          isVeg: true,
          image: require('../../assets/sweet.jpg'),
        },
        {
          heading: 'Lamb Stuffed Sweet Potato',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: 'none',
          isVeg: false,
          time: '06:00 pm',
          image: require('../../assets/burger.jpg'),
        },
        {
          heading: 'Bolognese Baked Potato',
          address: 'Amrit Sweets, Phase 5, Mohali',
          isLiked: true,
          isVeg: true,
          time: '06:00 pm',
          image: require('../../assets/sweet.jpg'),
        },
      ],
    };
  }

  onFilter = async () => {
    this.props.navigation.navigate('Filter');
  };
  render() {
    const {
      container,
      column,
      search_container,
      list_height,
      top_container,
      price_text,
      address_text,
      text_style,
      column_between_spacing,
      clock,
      non_veg_icon,
      green_color,
      red_color,
      row_center_align,
      product_heading,
      list_image_continer,
      list_image,
      row,
      inner_list_spacing,
      between_spacing,
      around_spacing,
      search_input,
      icons,
      search_icon,
    } = styles;
    return (
      <View style={[container, column, between_spacing]}>
        <View>
          <View style={[row, between_spacing, top_container]}>
            <View style={[search_container, row, around_spacing]}>
              <Image
                resizeMode="contain"
                source={require('../../assets/search.png')}
                style={search_icon}
              />
              <TextInput placeholder="Search" style={search_input} />
            </View>
            <TouchableOpacity onPress={this.onFilter}>
              <Image
                resizeMode="contain"
                source={require('../../assets/filter_yellow.png')}
                style={icons}
              />
            </TouchableOpacity>
          </View>

          <View style={list_height}>
            <ScrollView>
              {this.state.products.map(value => {
                return (
                  <View
                    style={[
                      row,
                      column_between_spacing,
                      top_container,
                      inner_list_spacing,
                    ]}>
                    <View style={row}>
                      <View style={list_image_continer}>
                        <Image
                          resizeMode="cover"
                          source={value.image}
                          style={list_image}
                        />
                      </View>

                      <View style={[column, column_between_spacing]}>
                        <View>
                          <View style={[row]}>
                            <Text style={product_heading}>{value.heading}</Text>
                          </View>
                          <Text style={address_text}>{value.address}</Text>
                        </View>

                        <View style={[row, between_spacing]}>
                          <View style={[row, row_center_align]}>
                            <View
                              style={
                                value.isVeg
                                  ? [non_veg_icon, green_color]
                                  : [non_veg_icon, red_color]
                              }
                            />
                            <Text style={text_style}>Non-veg</Text>
                          </View>
                          <View style={[row, row_center_align]}>
                            <Image
                              resizeMode="stretch"
                              source={require('../../assets/clock.png')}
                              style={clock}
                            />
                            <Text style={text_style}>06:00 pm</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={[column, column_between_spacing]}>
                      <View />
                      <Text style={price_text}>Rs 50</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
