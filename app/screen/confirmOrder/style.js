import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialog_container: {
    width: wp(88),
    elevation: 6,
    backgroundColor: '#ECECEC',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  colored_text: {
    color: colors.primaryColor,
  },
  text_style: {
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
    textAlign: 'center',
  },
  vertical_margin: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  bottom_margin: {
    marginBottom: hp(4),
  },
  row_centered: {
    alignItems: 'center',
  },
  button_container: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    width: wp(60),
    alignItems:'center'
  },
  button: {
    height: hp(5.4),
    width: wp(32),
    borderRadius: 20,
    alignSelf: 'flex-end',
    elevation: 4,
  },
  button_text: {
    color: 'white',
  },
  centered_text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel_style: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    color: colors.primaryColor,
    fontWeight: fonts.FONT_BOLD,
    fontSize: fonts.FONT_TEXT,
  },

  around_spacing: {justifyContent: 'space-around'},
};
export default styles;
