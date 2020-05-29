/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import Routes from './app/navigation/index';

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return <Routes />;
  }
}
