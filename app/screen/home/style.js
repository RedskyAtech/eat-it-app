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
  },

  container: {
    height: '100%',
    width: '100%',
  },
  container_width: {
    width: wp(100),
    paddingHorizontal: wp(1),
    alignSelf: 'center',
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
  search_container: {
    width: wp(70),
    height: hp(5.6),
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 25,
    backgroundColor: '#ECECEC',
  },
  search_icon: {
    width: wp(6),
    height: hp(6),
  },
  search_input: {
    width: wp(52),
    padding: 0,
  },
  icons: {
    width: wp(8.6),
    height: hp(8.6),
  },
  badge_style: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: colors.primaryColor,
    marginTop: hp(-3),
    marginLeft: wp(-4),
  },
  badge_text_style: {
    fontSize: fonts.Font_MIN,
  },
  center_align: {
    alignItems: 'center',
  },
  filter_container: {
    marginVertical: hp(1.6),
    paddingHorizontal: wp(2),
  },
  filters: {
    height: hp(3.8),
    width: 'auto',
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: wp(1.2),/
    marginHorizontal: wp(0.7),
  },
  filter_text: {
    fontSize: 12,
  },
  selected_color: {
    backgroundColor: colors.gradientFirstColor,
  },
  unselected_color: {
    backgroundColor: colors.unselectedFilter,
  },
  top_container: {
    height: hp(15),
  },
  list_container: {
    height: hp(78),
    width: wp(100),
    paddingBottom: hp(4),
  },

  containerGridLeft: {
    justifyContent: 'space-around',
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.primaryColor,
    marginTop: hp(1.2),
    marginBottom: hp(0.6),
    marginHorizontal: wp(2.6),
    borderRadius: 4,
  },
  heading_container: {
    marginHorizontal: wp(3),
    marginBottom: hp(2.2),
  },

  heading_text: {
    fontSize: fonts.FONT_NORMAL,
    fontWeight: fonts.FONT_BOLD,
    width: wp(28),
    textWrap: 'wrap',
    textTransform: 'capitalize',
  },
  centered_text: {justifyContent: 'center', alignItems: 'center'},
  colored_text: {
    fontSize: 12,
    fontWeight: fonts.FONT_BOLD,
    color: colors.primaryColor,
  },
  yellow_color: {
    fontSize: 12,
    fontWeight: fonts.FONT_BOLD,
    color: '#FED704',
  },
  free_text: {
    fontSize: 12,
    fontWeight: fonts.FONT_BOLD,
    color: 'green',
  },
  grey_text: {
    fontSize: fonts.Font_MIN,
    color: colors.fieldsColor,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
};
export default styles;
