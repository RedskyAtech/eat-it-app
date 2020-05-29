import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = {
    container: {
        width: "100%",
        height: "100%"
    },
    row: {
        display: "flex",
        flexDirection: 'row',
    },
    column: {
        display: "flex",
        flexDirection: 'column',
    },
    dialog_container: {
        width: wp(74),
        elevation: 6,
        backgroundColor: '#ECECEC',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    text_style: {
        fontSize: fonts.FONT_TEXT,
        fontWeight: fonts.FONT_BOLD,
        textAlign: 'center'
    },
    vertical_margin: {
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
    },
    bottom_margin: {
        marginBottom: hp(6)
    },
    row_centered: {
        alignItems: 'center'
    },
    button_container: {
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        width: wp(50),
    },
    button: {
        height: hp(5.4),
        width: wp(32),
        borderRadius: 20,
        marginTop: hp(2),
        alignSelf: 'flex-end',
        elevation: 4
    },
    centered_text: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancel_style: {
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginTop: hp(2),
        color: colors.primaryColor,
        fontWeight: fonts.FONT_BOLD,
        fontSize: fonts.FONT_TEXT
    },
    forward_container: {
        height: hp(7.6),
        width: hp(7.6),
        borderRadius: hp(7.6) / 2,
        backgroundColor: "#FFBA09",
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        height: hp(4.5),
        width: hp(4.5),
    },
    around_spacing: { justifyContent: 'space-around' }
}
export default styles