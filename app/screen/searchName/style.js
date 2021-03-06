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
  centered_text: {justifyContent: 'center', alignItems: 'center'},
  top_container: {
    width: wp(96),
    marginBottom: hp(1.6),
  },
  inner_container: {
    width: wp(96),
  },
  search_container: {
    width: wp(83.2),
    height: hp(5.6),
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 25,
    backgroundColor: '#ECECEC',
  },
  list_height: {
    height: hp(86),
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
  column_between_spacing: {
    justifyContent: 'space-between',
  },

  inner_list_spacing: {
    marginTop: hp(0.2),
    marginBottom: hp(3),
  },
  list_image_continer: {
    height: hp(9.2),
    width: hp(8.8),
    borderWidth: 1.4,
    borderRadius: 5,
    borderColor: colors.primaryColor,
    marginRight: wp(2.4),
  },
  list_image: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
  },
  product_heading: {
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
    textTransform: 'capitalize',
  },
  like_dislike_icon: {
    height: hp(3),
    width: hp(3),
  },
  address_text: {
    fontSize: 12,
    color: colors.greyText,
  },
  non_veg_icon: {
    height: hp(1.4),
    width: hp(1.4),
    borderRadius: hp(1.4) / 2,
    marginRight: hp(1),
  },
  red_color: {
    backgroundColor: 'red',
  },
  green_color: {
    backgroundColor: '#12FF01',
  },
  yellow_color: {
    backgroundColor: '#FED704',
  },
  clock: {
    height: hp(1.4),
    width: hp(1.4),
    marginRight: hp(1),
  },
  text_style: {
    color: colors.greyText,
    fontSize: fonts.FONT_NORMAL,
  },
  price_text: {
    fontSize: 16,
    fontWeight: fonts.FONT_BOLD,
    color: colors.primaryColor,
  },
  free_text: {
    fontSize: 16,
    fontWeight: fonts.FONT_BOLD,
    color: 'green',
  },
  row_center_align: {
    alignItems: 'center',
  },
};
export default styles;
