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
  fields_container: {
    width: wp(92),
    alignSelf: 'center',
  },
  field_label: {
    fontSize: fonts.FONT_TEXT,
  },
  fields_between_spacing: {
    marginBottom: hp(2.6),
  },
  picker_style: {
    width: wp(38),
    height: hp(3.8),
    borderRadius: 20,
    fontSize: 10,
    paddingHorizontal:wp(3.6),
    backgroundColor: colors.unselectedFilter,
  },
  picker_label:{
   fontSize:13
  },
  fields: {
    borderBottomWidth: 1.4,
    borderBottomColor: colors.fieldsColor,
    marginVertical: hp(0.6),
    paddingVertical: hp(0.6),
  },
  field_icons: {
    height: hp(2.4),
    width: hp(2.4),
    marginRight: wp(2.8),
    padding: 0,
  },
  picker_icons:{
    height: hp(1.8),
    width: hp(1.8),
  },
  input_box: {
    padding: 0,
    height: hp(2.8),
    width: wp(80),
  },
  menu_position: {
    marginTop: hp(5),
  },
  menu_background: {
    backgroundColor: '#ECECEC',
  },
  menu_list_title: {
    fontSize:13,
    fontWeight:fonts.FONT_BOLD,
    color:colors.greyText
  },
  list_item_height: {
    height: hp(4),
    paddingHorizontal:wp(0),
    width: wp(38)
  },
  bottom_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: wp(86),
    marginBottom: hp(3),
  },
  forward_container: {
    height: hp(7.8),
    width: hp(7.8),
    borderRadius: hp(7.8) / 2,
    backgroundColor: '#FFBA09',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: hp(6),
    elevation: 6,
  },
};
export default styles;
