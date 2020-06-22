import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';

const styles = {
  loader: {position: 'absolute', top: '50%', right: 0, left: 0},
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  around_spacing: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  top_container: {
    width: wp(96),
    marginBottom: hp(1.6),
    // marginVertical:hp(1.6)
  },
  inner_container: {
    width: wp(96),
    alignSelf: 'center',
  },
  list_height: {
    marginTop: hp(2),
    height: hp(82),
  },
  row_list: {
    flexWrap: 'wrap',
  },
  search_container: {
    width: wp(83.2),
    height: hp(5.6),
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 25,
    backgroundColor: '#ECECEC',
    marginTop: hp(1.6),
  },
  photo_continer: {
    height: hp(14.6),
    width: wp(27.4),
    borderWidth: 1.4,
    borderRadius: 4,
    borderColor: colors.primaryColor,
    backgroundColor: 'white',
    marginBottom: hp(1),
    marginHorizontal: wp(2),
  },
  cuision_text: {
    marginBottom: hp(2.6),
    color: colors.gradientFirstColor,
    alignSelf: 'center',
  },
  centered_text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo_style: {
    height: '100%',
    width: '100%',
    borderRadius: 2,
  },
  right_icon: {
    fontSize: 28,
    color: colors.greyText,
    marginRight: wp(0.8),
  },
  down_icon: {
    fontSize: 26,
    color: colors.primaryColor,
    marginRight: wp(0.8),
  },
  search_icon: {
    width: wp(6),
    height: hp(6),
  },
  search_input: {
    width: wp(62),
    padding: 0,
  },
  icons: {
    width: wp(8.6),
    height: hp(8.6),
  },
  list_icons: {
    height: hp(2.2),
    width: hp(2.2),
    marginRight: wp(2),
  },
  list_title: {
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
    color: colors.greyText,
  },
  colored_list_title: {
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
    color: colors.primaryColor,
  },
  inner_text: {
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
  },
  horizontal_line: {
    borderBottomWidth: 1,
    borderColor: '#B5B5B5',
    width: '100%',
  },
  list_spacing: {
    marginTop: hp(0.8),
    marginBottom: hp(0.8),
  },
  inner_list_spacing: {
    marginVertical: hp(0.8),
  },
  accordian_style: {border: 'none'},
};
export default styles;
