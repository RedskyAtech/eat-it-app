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
    between_spacing: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    around_spacing: {
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    top_container: {
        width: wp(96),
        marginBottom: hp(1.6)
    },
    inner_container: {
        width: wp(96)
    },
    dialog_container: {
        width: wp(92),
        elevation: 6,
        backgroundColor: '#F2F2F2',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius:5
    },
    text_style: {
        fontSize: fonts.FONT_TEXT,
        fontWeight: fonts.FONT_BOLD
    },
    like_icon: {
        height: hp(5.4),
        width: hp(5.4)
    },
    like_container: {
        width: wp(30),
        justifyContent: 'space-between'
    },
    vertical_margin: {
        paddingVertical: hp(2),
        paddingRight: wp(4),
    },
    bottom_margin: {
        marginBottom: hp(2)
    },
    row_centered: {
        alignItems: 'center'
    },
    radio_button_list: {
        justifyContent: 'space-between',
        width: wp(86),
    },
    radio_text_selected: {
        fontSize: 13,
        color: colors.primaryColor,
    },
    radio_text_unselected: {
        fontSize: 13,
        color: colors.greyText
    },
    star_container: {
        justifyContent: 'space-between',
        width: wp(72),
    },
    button_container: {
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        width: wp(60),
    },
    button: {
        height: hp(5.4),
        width: wp(32),
        borderRadius: 20,
        marginTop: hp(2),
        alignSelf: 'flex-end',
        elevation: 4
    },
    button_text: {
        color: 'white'
    },
    centered_text: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancel_style: {
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginTop: hp(2),
        color:colors.primaryColor,
        fontWeight:fonts.FONT_BOLD
    },
}
export default styles