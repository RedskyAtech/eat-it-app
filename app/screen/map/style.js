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
  column_between_spaceing: {
    justifyContent: 'space-between',
  },
  around_spacing: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  centered_text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  address_fields_container: {
    width: wp(96),
    alignSelf: 'center',
    marginVertical: hp(1),
  },
  fields: {
    borderBottomWidth: 1.4,
    borderBottomColor: colors.fieldsColor,
    marginVertical: hp(1.8),
    paddingVertical: hp(0.6),
  },
  input_box: {
    padding: 0,
    height: hp(2.6),
    width: wp(80),
  },
  small_input_box: {
    padding: 0,
    height: hp(2.6),
    width: wp(40),
  },
  button_container: {
    height: hp(5.4),
    width: wp(32),
    borderRadius: 20,
    marginTop: hp(2),
    alignSelf: 'center',
    elevation: 4,
  },

  button_text: {
    color: 'white',
  },
};
export default styles;
