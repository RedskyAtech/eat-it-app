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
    height: hp(7.4),
    width: hp(7.4),
    borderRadius: hp(7.4) / 2,
    alignSelf: 'center',
    borderColor: colors.primaryColor,
    borderWidth: 1.4,
    marginRight: hp(3),
    elevation: 4,
    backgroundColor: '#EDEDED',
  },
  like_icon: {
    height: hp(3.6),
    width: hp(3.6),
  },
  horizontally_centered: {
    alignItems: 'center',
  },
  bottom_margin:{
      marginBottom:hp(3.4)
  },
  name_heading:{
      fontSize:fonts.FONT_TEXT,
      fontWeight:fonts.FONT_BOLD
  }
};
export default styles;
