import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    height: hp(38),
    marginTop: hp(54),
    marginLeft: wp(20),
  },
};
export default styles;
