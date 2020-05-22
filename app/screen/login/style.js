import * as utlitiy from '../../utility/index';
import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    back_container: {
        margin: 5
    },
    arrow: {
        height: hp(4.5),
        width: hp(4.5),
    },
    logo_container: {
        marginTop: hp(-3),
        width: wp(84),
        alignSelf: 'center'
    },
    logo: {
        height: hp(15),
        width: hp(15),
        alignSelf: 'flex-end'
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
        justifyContent: 'space-around',
        color: 'black',
        marginTop: hp(6),
    },
    text: {
        fontSize: fonts.FONT_HEADING,
        fontWeight: fonts.FONT_BOLD,
    },
    headings_color: {
        color: colors.fieldsColor
    },
    fields_container: {
        marginVertical: hp(5),
        width: wp(86),
        alignSelf: 'center'
    },
    fields: {
        borderBottomWidth: 1.4,
        borderBottomColor: colors.fieldsColor,
        marginVertical: hp(1.8),
        paddingVertical: hp(0.6)
    },

    input_box: {
        padding: 0,
        height: hp(2.6),
        width: wp(80)
    },
    field_icons: {
        height: hp(2.4),
        width: hp(2.4),
        marginRight: wp(2.8),
        padding: 0
    },
    between_spacing: {
        justifyContent: 'space-between',
        marginVertical: hp(1.8),
    },
    colored_text: {
        color: colors.primaryColor,
        fontSize: fonts.FONT_TEXT,
        textDecorationLine: 'underline'
    },
    text_style: {
        color: colors.fieldsColor,
        fontSize: fonts.FONT_TEXT,
    },
    line_container: {
        alignSelf: 'center',
        marginVertical: hp(1.6),
    },
    line: {
        backgroundColor: colors.primaryColor,
        height: 1.5,
        width: utlitiy.widthPercentageToDP(16),
        alignSelf: 'center',
    },
    or_text: {
        paddingHorizontal: wp(4),
        fontSize: fonts.FONT_TEXT,
        fontWeight: fonts.FONT_BOLD
    },
    social_container: {
        alignSelf: 'center',
        width: wp(40)
    },
    social_icons: {
        height: hp(5.8),
        width: hp(5.8),
    },
    bottom_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: wp(86),
        marginBottom: hp(3)
    },
    ckeckbox: {
        marginRight: wp(5),
        marginLeft: wp(-3),
        borderRadius:4
    },
    forward_container: {
        height: hp(7.8),
        width: hp(7.8),
        borderRadius: hp(7.8) / 2,
        backgroundColor: "#FFBA09",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: hp(6)
    },
    profile_container: {
        height: hp(14.5),
        width: hp(14.5),
        borderWidth: 1.5,
        borderColor: colors.fieldsColor,
        borderRadius: 4,
        marginBottom: hp(2),
        padding: 5
    },
    profile_image: {
        height: "100%",
        width: "100%",
        borderRadius: 3,
    },
    edit_container: {
        height: hp(5.8),
        width: hp(5.8),
        backgroundColor: "#FFBA09",
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
    }
}
export default styles