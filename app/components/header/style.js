import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as colors from '../../constants/colors';

const styles = StyleSheet.create({
  headerView: {backgroundColor: colors.headerColor},
  wrapper: {flex: 1},
  headerBtn: {marginLeft: '8%'},
  HeaderTitle: {
    color: colors.whiteColor,
    fontSize: wp('4%'),
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        marginLeft: 0,
      },
      android: {
        marginLeft: '20%',
      },
    }),
  },
});
export default styles;
