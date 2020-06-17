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
  between_spacing: {
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  around_spacing: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  centered_text: {justifyContent: 'center', alignItems: 'center'},
  top_container: {
    width: wp(96),
    marginBottom: hp(1.6),
  },
  number_style: {
    fontSize: 20,
    color: colors.primaryColor,
    fontWeight: fonts.FONT_BOLD,
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
    marginTop: hp(2.4),
    marginBottom: hp(3.8),
  },

  list_height: {
    height: hp(86),
  },

  column_between_spacing: {
    justifyContent: 'space-between',
  },
  profile_image: {
    height: hp(5.8),
    width: hp(5.8),
    borderRadius: hp(5.8) / 2,
    alignSelf: 'center',
    borderColor: colors.primaryColor,
    borderWidth: 1.4,
    marginRight: hp(5),
    backgroundColor: '#FFFFFF',
  },
  arrow_icon: {
    height: hp(2.2),
    width: hp(2.2),
    alignSelf: 'flex-end',
  },
  horizontally_centered: {
    alignItems: 'center',
  },
  bottom_margin: {
    marginBottom: hp(3.6),
  },
  time_style: {
    color: colors.greyText,
    fontSize: fonts.FONT_NORMAL,
  },
  heading_width: {
    width: wp(61.2),
  },
  head_width:{

  },
  colored_text: {
    color: colors.primaryColor,
  },
  name_heading: {
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
  },
};
export default styles;
