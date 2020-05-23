import * as utlitiy from '../../utility/index';
import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = {
    container: {
        height: "100%",
        width: "100%",
        // marginVertical: hp(0.8)
    },
    container_width: {
        width: wp(100),
        paddingHorizontal: wp(1),
        alignSelf: 'center'
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
    search_container: {
        width: wp(70),
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
        width: wp(52),
        padding: 0
    },
    icons: {
        width: wp(8.6),
        height: hp(8.6)
    },
    badge_style: {
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: colors.primaryColor,
        marginTop: hp(-3),
        marginLeft: wp(-4),
    },
    badge_text_style: {
        fontSize: fonts.Font_MIN
    },
    center_align: {
        alignItems: 'center'
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
        marginRight: wp(2.4)
    },
    filter_text: {
        fontSize: 12
    },
    selected_color: {
        backgroundColor: colors.gradientFirstColor
    },
    unselected_color: {
        backgroundColor: colors.unselectedFilter
    },
    top_container: {
        height: "15.2%"
    },
    list_container: {
        height: "75%",
        // width:"100%"
        width:wp(100)
    },
    footer_container: {
        zIndex: 10,
        marginBottom:hp(2.2),
        width: wp(94),
        // height: "6.8%",
        height:54,
        alignSelf: 'center'
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        borderWidth: 1.5,
        borderColor: colors.primaryColor,
        marginTop: hp(1.2),
        marginBottom: hp(0.6),
        marginHorizontal: wp(2.6),
        borderRadius: 4
    },
    heading_container: {
        marginHorizontal: wp(3),
        marginBottom: hp(2.2)
    },

    heading_text: {
        fontSize: fonts.FONT_NORMAL,
        fontWeight: fonts.FONT_BOLD,
        width: wp(28),
        textWrap: 'wrap'
    },
    colored_text: {
        fontSize: 12,
        fontWeight: fonts.FONT_BOLD,
        color: colors.primaryColor
    },
    grey_text: {
        fontSize: fonts.Font_MIN,
        color: colors.fieldsColor
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 8,
    }

}
export default styles