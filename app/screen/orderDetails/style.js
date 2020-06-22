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
    marginBottom: hp(3.2),
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
  centered_text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail_container: {
    width: wp(85),
    alignSelf: 'center',
  },
  scroll_container: {
    borderColor: colors.primaryColor,
    borderWidth: 1.8,
    borderRadius: 8,
    alignSelf: 'center',
    height: hp(30),
  },
  dot_style: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: colors.primaryColor,
    marginTop: hp(-2.1),
  },
  inactive_dot_styles: {
    backgroundColor: '#696969',
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
  },
  images: {
    height: '100%',
    width: '98.8%',
    borderRadius: 6,
    alignSelf: 'center',
    marginLeft: wp(-1),
  },
  product_name: {
    fontSize: 20,
    fontWeight: fonts.FONT_BOLD,
    textTransform: 'capitalize',
  },
  id_heading: {
    fontSize: 21,
    textTransform: 'capitalize',
  },
  like_icon: {
    height: hp(3),
    width: hp(3),
  },
  vertical_spacing: {
    marginVertical: hp(3.6),
  },
  bottom_spacing: {
    marginBottom: hp(2.2),
  },
  price: {
    fontSize: 18,
    fontWeight: fonts.FONT_BOLD,
  },
  colored_text: {
    color: colors.primaryColor,
  },
  type_icon: {
    height: hp(2),
    width: hp(2),
    borderRadius: hp(2) / 2,
    marginRight: hp(1),
  },
  non_veg_icon: {
    backgroundColor: 'red',
  },
  veg_icon: {
    backgroundColor: '#12FF01',
  },
  langar_icon: {
    backgroundColor: '#FED704',
  },
  type_text: {
    color: colors.greyText,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  address_style: {
    fontSize: fonts.FONT_TEXT,
    color: colors.greyText,
  },
  timing_heading_style: {
    fontSize: fonts.FONT_TEXT,
  },
  top_spacing: {
    marginTop: hp(4),
  },
  free_text: {
    color: 'green',
  },
  bottom_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: wp(86),
    marginBottom: hp(3),
  },
  button_container: {
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
  content_container_style: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};
export default styles;
