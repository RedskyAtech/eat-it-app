
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Home from '../screen/home';
import Splash from '../screen/splash';
import Login from '../screen/login';
import Header from '../components/header';

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
    Header: {
      screen: Header,
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
  },
  {
    initialRouteName: 'Login',
  },
);

const Routes = createAppContainer(
  createSwitchNavigator({
    App: AppStack
  }),
);
export default Routes;
