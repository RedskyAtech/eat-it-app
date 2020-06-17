import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './style';

export default class followedSellers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleLoading: false,
      sellers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    };
  }
  onBack = async () => {
    await this.props.navigation.navigate('tab5');
  };

  render() {
    const {
      container,
      column,
      list_height,
      row,
      between_spacing,
      centered_text,
      inner_container,
      spacing,
      arrow,
      heading_text,
      profile_image,
      like_icon,
      horizontally_centered,
      bottom_margin,
      name_heading,
    } = styles;
    return (
      <View style={[container, column, between_spacing]}>
        <View>
          <View style={[inner_container, row, between_spacing, spacing]}>
            <TouchableOpacity onPress={this.onBack}>
              <Image
                resizeMode="contain"
                source={require('../../assets/back_arrow.png')}
                style={arrow}
              />
            </TouchableOpacity>
            <Text style={heading_text}>Seller you follow</Text>
            <View>
              <Text> </Text>
            </View>
          </View>

          {!this.state.noDataExist ? (
            <View style={list_height}>
              <ScrollView>
                {this.state.sellers.map(value => {
                  return (
                    <View style={[row, between_spacing, bottom_margin]}>
                      <View style={[row, horizontally_centered]}>
                        <Image
                          resizeMode="cover"
                          source={require('../../assets/picture.jpg')}
                          style={profile_image}
                        />
                        <Text style={name_heading}>Zain Imam</Text>
                      </View>
                      <Image
                        resizeMode="cover"
                        style={like_icon}
                        source={require('../../assets/heart_fill.png')}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View style={[list_height, column, centered_text]}>
              <Text style={{textAlign: 'center'}}>No food found</Text>
            </View>
          )}
          <View style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
            <ActivityIndicator
              animating={this.state.isVisibleLoading}
              size="large"
              color="#0000ff"
            />
          </View>
        </View>
      </View>
    );
  }
}
