import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utility/index';

const styles = {
  loader: {
    position: 'absolute',
    top: '50%',
    right: 0,
    left: 0,
    elevation: 10,
  },
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
  profile_container: {
    width: wp(90),
    height: hp(12),
    borderRadius: 12,
    marginVertical: hp(1.4),
    padding: 6,
    elevation: 6,
  },
  settings: {
    height: hp(4.6),
    width: hp(4.6),
    alignSelf: 'flex-end',
  },
  menu_container: {
    alignSelf: 'flex-end',
  },
  menu_position: {
    marginTop: hp(5),
  },
  menu_background: {
    backgroundColor: '#ECECEC',
  },
  profile_image: {
    height: 94,
    width: 94,
    borderRadius: 94 / 2,
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 2,
    marginTop: hp(0.6),
    elevation: 4,
    backgroundColor: '#EDEDED',
  },
  profile_style: {},
  profile_temp: {
    height: '100%',
    width: '100%',
    borderRadius: 90 / 2,
  },
  badge_style: {
    borderWidth: 0,
    backgroundColor: colors.primaryColor,
    marginRight: wp(3),
  },
  badge_text_style: {
    fontSize: fonts.FONT_NORMAL,
  },
  user_details: {
    marginTop: hp(6.4),
    marginBottom: hp(2),
    alignItems: 'center',
  },
  spacing: {
    marginVertical: hp(0.6),
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
  },
  capitalize_text: {
    textTransform: 'capitalize',
  },
  colored_text: {
    color: colors.primaryColor,
  },
  heading_color: {
    color: colors.greyText,
  },
  horizontal_line: {
    borderBottomWidth: 1,
    borderColor: '#B5B5B5',
    width: wp(100),
  },
  field_icons: {
    height: hp(2.2),
    width: hp(2.2),
  },
  pic_image_container: {
    height: hp(14.5),
    width: hp(14.5),
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 4,
    marginBottom: hp(2),
  },
  profile_images: {
    height: '100%',
    width: '100%',
    borderRadius: 3,
  },
  edit_container: {
    height: hp(5.8),
    width: hp(5.8),
    backgroundColor: 'white',
    borderRadius: hp(5.8) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(-2),
    marginLeft: wp(-6),
  },
  edit_icon: {
    alignSelf: 'center',
    height: hp(3),
    width: hp(3),
  },
  list_width: {
    width: wp(94),
    alignSelf: 'center',
  },
  list_title: {
    marginLeft: wp(2.6),
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
  },
  menu_list_icons: {
    marginLeft: wp(2),
    height: hp(2.4),
    width: hp(2.4),
  },
  menu_list_title: {
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
  },
  list_item_height: {
    height: hp(5),
    width: wp(52),
  },
  rows_spacing: {
    marginVertical: hp(1.5),
    alignContent: 'center',
  },
  row_centered_text: {
    alignItems: 'center',
  },
  heading_text: {
    fontSize: fonts.FONT_HEADING,
    fontWeight: fonts.FONT_BOLD,
    color: 'white',
    alignSelf: 'center',
    marginVertical: hp(2.4),
  },
  slider_container: {
    width: wp(100),
    height: hp(48),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 6,
  },
  profile_size: {
    // height: hp(48),
    height: hp(67),
  },
  slider_inner_box: {
    width: wp(86),
    alignSelf: 'center',
  },
  animation_style: {
    position: 'absolute',
    elevation: 10,
  },
  fields: {
    borderBottomWidth: 1.4,
    borderBottomColor: 'white',
    marginVertical: hp(1.8),
    paddingVertical: hp(0.6),
  },
  input_field_icons: {
    height: hp(2.4),
    width: hp(2.4),
    marginRight: wp(2.8),
    padding: 0,
  },
  input_box: {
    padding: 0,
    height: hp(2.6),
    width: wp(80),
  },
  button_container: {
    height: hp(5.4),
    borderRadius: 20,
    marginVertical: hp(2),
    backgroundColor: 'white',
    elevation: 6,
  },
  button_text: {
    color: colors.primaryColor,
    textAlign: 'center',
  },
  close_style: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: hp(2),
  },
  update_button_container: {
    height: hp(5.6),
    width: wp(40),
    borderRadius: 20,
    elevation: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top_spacing: {
    marginTop: hp(4.6),
  },
  update_text_style: {
    color: colors.primaryColor,
  },
};
export default styles;
