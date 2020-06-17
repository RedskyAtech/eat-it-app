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

export default class notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleLoading: false,
      notifications: [
        {
          from: 'add',
          name: 'Amrit Sweets',
        },
        {
          from: 'delivered',
          name: '#2398456',
        },
        {
          from: 'received',
          name: '#4534926',
        },
        {
          from: 'confirmed',
          name: '#4534345',
        },
      ],
      //   notifications: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
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
      arrow_icon,
      horizontally_centered,
      bottom_margin,
      name_heading,
      number_style,
      time_style,
      colored_text,
      heading_width,
      head_width
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
            <Text style={heading_text}>Notifications</Text>
            <View>
              <Text> </Text>
            </View>
          </View>

          {!this.state.noDataExist ? (
            <View style={list_height}>
              <ScrollView>
                {this.state.notifications.map(value => {
                  let index = this.state.notifications.indexOf(value);
                  return (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <View style={[row, between_spacing, bottom_margin]}>
                        <View style={[profile_image, centered_text]}>
                          <Text style={number_style}>{index + 1}</Text>
                        </View>
                        {value.from == 'add' ? (
                          <View style={[row, heading_width]}>
                            <Text style={[name_heading]}>
                              New food added by {value.name}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={[row, head_width, {flexWrap: 'wrap'}]}>
                            <Text style={name_heading}>Order no. </Text>
                            <Text style={[name_heading, colored_text]}>
                              {value.name}
                            </Text>
                            <Text style={name_heading}>
                              has been {''}
                              {value.from == 'delivered'
                                ? 'delivered'
                                : value.from == 'confirmed'
                                ? 'confirmed'
                                : 'received'}
                            </Text>
                          </View>
                        )}
                        <View style={[column, between_spacing]}>
                          <Image
                            resizeMode="cover"
                            style={arrow_icon}
                            source={require('../../assets/next_arrow_grey.png')}
                          />
                          <Text style={time_style}>02:00 pm</Text>
                        </View>
                      </View>
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
