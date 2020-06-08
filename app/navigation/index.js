import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {Image, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../utility/index';
import * as colors from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

import Splash from '../screen/splash';
import Login from '../screen/login';
import ForgotPassword from '../screen/forgotPassword';
import Home from '../screen/home';
import Profile from '../screen/profile';
import Search from '../screen/search';
import Filter from '../screen/filter';
import AttatchFoodPhotos from '../screen/attatchFoodPhotos';
import FoodDetails from '../screen/foodDetails';
import MyFood from '../screen/myFood';
import SearchName from '../screen/searchName';
import LikeDislikeFood from '../screen/likeDislikeFood';
import ShareFood from '../screen/shareFood';
import AddFood from '../screen/addFood';
import Header from '../components/header';

const TabNavigator = createBottomTabNavigator(
  {
    tab1: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: true,
        tabBarLabel: '',
        tabBarIcon: ({focused, tintColor}) => {
          let icon;
          if (navigation.state.routeName === 'tab1') {
            icon = focused
              ? require('../assets/home_selected.png')
              : require('../assets/home.png');
          }
          return (
            <Image
              source={icon}
              style={{
                height: hp(3.6),
                width: hp(3.6),
              }}
            />
          );
        },
      }),
    },
    tab2: {
      screen: Search,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: true,
        tabBarLabel: '',
        tabBarIcon: ({focused, tintColor}) => {
          let icon;
          if (navigation.state.routeName === 'tab2') {
            icon = focused
              ? require('../assets/search_selected.png')
              : require('../assets/search.png');
          }
          return (
            <Image
              source={icon}
              style={{
                height: hp(3.6),
                width: hp(3.6),
              }}
            />
          );
        },
      }),
    },
    tab3: {
      screen: AttatchFoodPhotos,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: true,
        tabBarLabel: '',
        tabBarOnPress: ({navigation}) => {
          if (navigation.state.routeName === 'tab3') {
            navigation.navigate('AttatchFoodPhotos');
          }
        },
        tabBarIcon: ({focused, tintColor}) => {
          let icon;
          if (navigation.state.routeName === 'tab3') {
            icon = require('../assets/share_icon.png');
          }
          return (
            <View
              style={{
                height: hp(8),
                width: hp(8),
                borderRadius: hp(8) / 2,
                elevation: 6,
                borderRadius: hp(8) / 2,
                marginTop: hp(-5),
                // paddingTop: 3,
              }}>
              <Image
                source={icon}
                style={{
                  height: hp(8),
                  width: hp(8),
                  // marginTop: hp(-4.8),
                }}
              />
            </View>
          );
        },
      }),
    },
    tab4: {
      screen: MyFood,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: true,
        tabBarLabel: '',
        tabBarIcon: ({focused, tintColor}) => {
          let icon;
          if (navigation.state.routeName === 'tab4') {
            icon = focused
              ? require('../assets/my_food_selected.png')
              : require('../assets/my_food.png');
          }
          return (
            <Image
              source={icon}
              style={{
                height: hp(3.6),
                width: hp(3.6),
              }}
            />
          );
        },
      }),
    },
    tab5: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: true,
        tabBarLabel: '',
        tabBarIcon: ({focused, tintColor}) => {
          let icon;
          if (navigation.state.routeName === 'tab5') {
            icon = focused
              ? require('../assets/profile_selected.png')
              : require('../assets/profile.png');
          }
          return (
            <Image
              source={icon}
              style={{
                height: hp(3.6),
                width: hp(3.6),
              }}
            />
          );
        },
      }),
    },
  },
  {
    initialRouteName: 'tab1',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarComponent: props => {
      return (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.gradientFirstColor, colors.gradientSecondColor]}
          style={{
            height: 50,
            borderTopColor: 'transparent',
            borderRadius: 40,
            width: wp(94),
            alignSelf: 'center',
            marginVertical: hp(1),
            elevation: 4,
            borderColor: 'red',
          }}>
          <BottomTabBar
            {...props}
            style={{
              backgroundColor: 'transparent',
              borderTopColor: 'transparent',
            }}
          />
        </LinearGradient>
      );
    },
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: '#FFB534',
      activeBackgroundColor: 'FFF',
      inactiveTintColor: '#FFB534',
      showIcon: true,
      showLabel: false,
    },
  },
);

const AppStack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: false,
      },
    },

    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },

    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        headerShown: false,
      },
    },
    Filter: {
      screen: Filter,
      navigationOptions: {
        headerShown: false,
      },
    },
    AttatchFoodPhotos: {
      screen: AttatchFoodPhotos,
      navigationOptions: {
        headerShown: false,
      },
    },
    FoodDetails: {
      screen: FoodDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    MyFood: {
      screen: MyFood,
      navigationOptions: {
        headerShown: false,
      },
    },
    SearchName: {
      screen: SearchName,
      navigationOptions: {
        headerShown: false,
      },
    },
    LikeDislikeFood: {
      screen: LikeDislikeFood,
      navigationOptions: {
        headerShown: false,
      },
    },
    ShareFood: {
      screen: ShareFood,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddFood: {
      screen: AddFood,
      navigationOptions: {
        headerShown: false,
      },
    },
    Header: {
      screen: Header,
      navigationOptions: {
        headerShown: false,
      },
    },
    BottomTab: {
      screen: TabNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    mode: 'modal',
  },
);

const Routes = createAppContainer(
  createSwitchNavigator({
    App: AppStack,
    BottomTab: TabNavigator,
  }),
);

export default Routes;
