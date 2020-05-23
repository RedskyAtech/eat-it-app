
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from '../screen/splash';
import Login from '../screen/login';
import ForgotPassword from '../screen/forgotPassword';
import Home from '../screen/home';
import Profile from '../screen/profile';
import Header from '../components/header';
import Footer from '../components/footer';

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
    Header: {
      screen: Header,
      navigationOptions: {
        headerShown: false,
      },
    },
    Footer: {
      screen: Footer,
      navigationOptions: {
        headerShown: false,
      },
    },

  },
  {
    initialRouteName: 'Splash',
  },
);

const Routes = createAppContainer(
  createSwitchNavigator({
    App: AppStack
  }),
);
export default Routes;
