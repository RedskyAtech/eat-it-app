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
  back_container: {
    margin: 5,
  },
  arrow: {
    height: hp(4.5),
    width: hp(4.5),
  },

  logo_container: {
    marginTop: hp(-3),
    width: wp(84),
    alignSelf: 'center',
  },
  logo: {
    height: hp(15),
    width: hp(15),
    alignSelf: 'flex-end',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },

  headings: {
    color: 'black',
    marginTop: hp(6),
  },
  text: {
    fontSize: fonts.FONT_HEADING,
    fontWeight: fonts.FONT_BOLD,
  },

  fields_container: {
    marginVertical: hp(13),
    width: wp(86),
    alignSelf: 'center',
  },
  fields: {
    borderBottomWidth: 1.4,
    borderBottomColor: colors.fieldsColor,
    marginVertical: hp(1.8),
    paddingVertical: hp(0.6),
  },
  otp_fields: {
    marginVertical: hp(2.4),
    width: wp(70),
    alignSelf: 'center',
  },
  otp_input_box: {
    padding: 0,
    height: hp(5.4),
    width: hp(5.4),
    borderRadius: 4,
    backgroundColor: '#696969',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  input_box: {
    padding: 0,
    height: hp(2.6),
    width: wp(80),
  },
  field_icons: {
    height: hp(2.4),
    width: hp(2.4),
    marginRight: wp(2.8),
    padding: 0,
  },
  between_spacing: {
    justifyContent: 'space-between',
    marginVertical: hp(1.8),
  },
  centered_text: {
    justifyContent: 'space-around',
  },
  primary_color: {
    color: colors.primaryColor,
  },
  background_theme_color: {
    backgroundColor: colors.primaryColor,
  },
  colored_text: {
    width: wp(70),
    textAlign: 'center',
    fontSize: fonts.FONT_TEXT,
    marginBottom: hp(1),
  },
  button_container: {
    height: hp(5.4),
    borderRadius: 20,
    marginTop: hp(2),
  },
  button_text: {
    color: 'white',
    textAlign: 'center',
  },
};
export default styles;
