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
import {NavigationActions, StackActions} from 'react-navigation';
import * as colors from '../../constants/colors';

export default class notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleLoading: false,
      from:'',
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
    };
  }
  componentDidMount = async () => {
    if (this.props.navigation.state.params) {
      let from;
      if (this.props.navigation.state.params.from) {
        from = this.props.navigation.state.params.from;
        await this.setState({from: from});
      }
    } else {
      await this.setState({from: ''});
    }
  };
  onBack = async () => {
    if (this.state.from == 'home') {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'BottomTab'})],
        }),
      );
      await this.props.navigation.navigate('tab1');
    }
    if (this.state.from == 'profile') {
      await this.props.navigation.navigate('tab5');
    }
  };
  onNotification = async from => {
    if (from == 'add') {
      await this.props.navigation.navigate('FoodDetails', {
        from: 'notification',
      });
    } else if (from == 'delivered') {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'BottomTab'})],
        }),
      );
      await this.props.navigation.navigate('tab4', {from: 'notification'});
    } else if (from == 'received') {
      await this.props.navigation.navigate('OrderDetails', {
        from: 'receivedNotification',
      });
    } else {
      // await this.props.navigation.navigate('OrderDetails', {
      //   from: 'confirmedNotification',
      // });
    }
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
      icons_style,
      loader,
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
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => this.onNotification(value.from)}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={[row, between_spacing, bottom_margin]}>
                          <View style={[profile_image, centered_text]}>
                            <Image
                              resizeMode="cover"
                              style={icons_style}
                              source={
                                value.from == 'add'
                                  ? require('../../assets/new_food.png')
                                  : value.from == 'delivered'
                                  ? require('../../assets/delivered.png')
                                  : value.from == 'confirmed'
                                  ? require('../../assets/confirmed.png')
                                  : require('../../assets/dish_yellow.png')
                              }
                            />
                          </View>
                          {value.from == 'add' ? (
                            <View style={[row, heading_width]}>
                              <Text style={[name_heading]}>
                                New food added by {value.name}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={[row, heading_width, {flexWrap: 'wrap'}]}>
                              <Text style={name_heading}>
                                Order no.
                                <Text style={colored_text}>#2345678</Text> has
                                been{' '}
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
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View style={[list_height, column, centered_text]}>
              <Text style={{textAlign: 'center'}}>No food found</Text>
            </View>
          )}
          <View style={loader}>
            <ActivityIndicator
              animating={this.state.isVisibleLoading}
              size="large"
              color={colors.primaryColor}
            />
          </View>
        </View>
      </View>
    );
  }
}
