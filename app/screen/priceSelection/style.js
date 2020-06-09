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
    width: wp(86),
    elevation: 6,
    backgroundColor: '#ECECEC',
    alignSelf: 'center',
    borderRadius: 5,
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
    marginBottom: hp(1),
  },
  row_centered: {
    alignItems: 'center',
  },
  progress_bar: {
    height: 2.5,
    marginVertical: hp(2.2),
    backgroundColor: '#FFBA09',
    color: '#FFBA09',
  },
  thumb_style: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
  },
  between_spacing: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  km_text: {
    fontSize: fonts.FONT_NORMAL,
  },
  percentage: {
    color: colors.primaryColor,
  },
  button_container: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    width: wp(50),
  },
  button: {
    height: hp(5.4),
    width: wp(32),
    borderRadius: 20,
    marginTop: hp(2),
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
  
  around_spacing: {justifyContent: 'space-around'},
};
export default styles;
