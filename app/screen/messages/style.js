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
  horizontal_line: {
    borderBottomWidth: 1,
    borderColor: '#B5B5B5',
    width: wp(100),
  },
  list_heading:{
      fontSize:fonts.FONT_TEXT,
      fontWeight:fonts.FONT_BOLD
  },
  code_style:{
      color:colors.primaryColor,
      marginRight:wp(1.8)
  },
  message_style:{
      fontSize:12,
      fontWeight:fonts.FONT_BOLD,
      color:colors.greyText
  },
  time_style:{
    fontSize:fonts.FONT_NORMAL,
    color:colors.greyText ,
    marginRight:wp(1.8)
  },
  list_padding:{
      paddingVertical:hp(1.2)
  }
};
export default styles;
