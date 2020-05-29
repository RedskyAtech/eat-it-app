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
    height: hp(50),
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
  row_center_align: {
    alignItems: 'center',
  },
  list_height: {
    height: hp(60),
  },
  inner_container: {
    width: wp(94),
  },
  list_spacing: {
    marginTop: hp(0.8),
    marginBottom: hp(2.6),
  },
  top_down_icon: {
    fontSize: 40,
  },

  inner_list_spacing: {
    marginTop: hp(0.2),
    marginBottom: hp(3),
  },
  list_item_style: {
    height: hp(6.6),
    borderRadius: 4,
    paddingHorizontal: wp(2.6),
  },
  even_color: {
    backgroundColor: colors.primaryColor,
  },
  odd_color: {
    backgroundColor: colors.unselectedFilter,
  },
  list_item_text: {
    fontSize: fonts.FONT_TEXT,
    fontWeight: fonts.FONT_BOLD,
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
};
export default styles;
