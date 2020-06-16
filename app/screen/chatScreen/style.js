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
  message_list: {
    width: wp(48),
    backgroundColor: colors.unselectedFilter,
    borderRadius: 4,
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    marginVertical: hp(1.2),
    justifyContent: 'space-between',
  },
  triangle: {
    position: 'absolute',
    left: -8,
    top: 9,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 1,
    borderRightWidth: 10,
    borderRightColor: colors.unselectedFilter,
    borderBottomWidth:5,
    borderBottomColor: 'transparent'
  },
  message_style: {
    fontSize: 12,
    width:wp(35)
  },
  time_style: {
    fontSize: fonts.Font_MIN,
    color: colors.greyText,
    alignSelf: 'flex-end',
  },
  right_list: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primaryColor,
  },
  bottom_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: wp(86),
    marginBottom: hp(3),
  },
  bottom_spacing: {
    marginBottom: hp(2.2),
  },
  top_container: {
    width: wp(96),
    marginBottom: hp(1.6),
  },
  search_container: {
    width: wp(80.8),
    height: hp(5.6),
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 25,
    backgroundColor: '#ECECEC',
  },
  around_spacing: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  search_icon: {
    width: wp(6),
    height: hp(6),
  },
  search_input: {
    width: wp(72),
    padding: 0,
  },
  icons: {
    width: wp(6),
    height: hp(6),
  },
  next_arrow_container: {
    height: hp(5.4),
    width: hp(5.4),
    borderRadius: hp(5.4) / 2,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:4
  },
  list_height:{
    height:hp(82)
  }
};
export default styles;
