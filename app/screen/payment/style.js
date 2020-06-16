import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';
import {color} from 'react-native-reanimated';

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  inner_container: {
    width: wp(96),
    alignSelf: 'center',
  },
  arrow: {
    height: hp(4.5),
    width: hp(4.5),
  },
  heading_text: {
    fontSize: fonts.FONT_HEADING,
    fontWeight: fonts.FONT_BOLD,
  },
  spacing: {
    marginVertical: hp(2.4),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  between_spacing: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  centered_text: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  list_container: {
    width: wp(96),
    alignSelf: 'center',
  },
  radio_button_list: {
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  inner_list: {
    width: wp(90.8),
    alignSelf: 'center',
    marginBottom: hp(0.8),
  },
  radio_text_selected: {
    fontSize: fonts.FONT_TEXT,
    color: colors.primaryColor,
    fontWeight: fonts.FONT_BOLD,
  },
  radio_text_unselected: {
    fontSize: fonts.FONT_TEXT,
    color: colors.greyText,
    fontWeight: fonts.FONT_BOLD,
  },
  input_container: {
    borderWidth: 1.6,
    borderColor: colors.greyText,
    borderRadius: 3,
    height: hp(4.6),
    backgroundColor: '#ECECEC',
  },
  top_spacing: {
    marginTop: hp(2.2),
  },
  input_box: {
    padding: 0,
    height: hp(2.6),
    width: wp(88),
    alignSelf: 'center',
    fontSize: 13,
  },
  expiration_input_container: {
    padding: 0,
    height: hp(2.6),
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: fonts.FONT_BOLD,
  },
  code_input: {
    width: wp(20),
  },
  month_input: {
    width: wp(16),
  },
  year_input:{
    width: wp(14),
  },
  text_style: {
    fontSize: 12,
    fontWeight: fonts.FONT_BOLD,
    color: colors.greyText,
    marginBottom: hp(0.8),
  },
  button_container: {
    width: wp(86),
    height: hp(5.4),
    borderRadius: 20,
    marginTop: hp(3),
    elevation: 6,
    alignSelf: 'center',
  },
  button_text: {
    color: 'white',
    textAlign: 'center',
  },
  date_year_container: {
    width: wp(26),
  },
  date_container: {
    width: wp(24),
    paddingHorizontal: wp(2),
    marginRight: wp(4),
  },
  year_container: {
    width: wp(22),
    paddingHorizontal: wp(2),
    marginRight: wp(4),
  },
  icon: {
    height: hp(3),
    width: hp(3),
    marginLeft: wp(2),
  },
  down_arrow_icon: {
    height: hp(2),
    width: hp(1.8),
  },
};
export default styles;
