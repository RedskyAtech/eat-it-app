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
        marginBottom: hp(3)
    },
    search_container: {
        width: wp(83.2),
        height: hp(5.6),
        borderWidth: 1,
        borderColor: colors.primaryColor,
        borderRadius: 25,
        backgroundColor: "#ECECEC"
    },

    search_icon: {
        width: wp(6),
        height: hp(6)
    },
    search_input: {
        width: wp(62),
        padding: 0
    },
    icons: {
        width: wp(8.6),
        height: hp(8.6)
    },
    list_icons: {
        height: hp(2.2),
        width: hp(2.2),
        marginRight: wp(2)
    },
    list_title: {
        fontSize: fonts.FONT_TEXT,
        fontWeight: fonts.FONT_BOLD,
        color: colors.greyText
    },
    list_spacing: {
        marginBottom: hp(2.6)
    },
    footer_container: {
        zIndex: 10,
        marginBottom: hp(2.2),
        marginTop: hp(0.4),
        width: wp(94),
        height: 54,
        alignSelf: 'center'
    },

}
export default styles