import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../Loader/style';
import * as colors from '../../constants/colors';

class loader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Spinner
        visible={this.props.isLoading}
        // textContent={`Loading\nPlease Wait`}
        textStyle={styles.spinnerTextStyle}
        // animation="slide"
        color={colors.primaryColor}
      />
    );
  }
}

export default loader;
