import * as utlitiy from '../../utility/index';
import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = {
    container: {
        width: "100%",
        height: "100%"
    },
    inner_container: {
        width: wp(96),
        alignSelf: 'center'
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
        marginBottom: hp(5)
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
    centered_text: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row_list: {
        flexWrap: 'wrap',
        // height:hp(20)
    },
    photo_continer: {
        height: hp(14.6),
        width: wp(27.4),
        borderWidth: 1.4,
        borderRadius: 4,
        borderColor: colors.primaryColor,
        backgroundColor: 'white',
        marginBottom: hp(3.4),
        marginHorizontal: wp(1.3)
    },
    add_style: {
        height: hp(7.4),
        width: hp(7.4)
    },
    photo_style: {
        height: "100%",
        width: "100%",
        borderRadius: 2
    },
    cross_container: {
        height: hp(4.2),
        width: hp(4.2),
        borderRadius: hp(4.2) / 2,
        backgroundColor: colors.primaryColor,
        marginLeft: wp(-6.4),
        marginTop: hp(-1.2),
        elevation:6
    },
    cross_icon: {
        height: hp(2.2),
        width: hp(2.2),
    },
    bottom_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: wp(86),
        marginBottom: hp(3)
    },
    forward_container: {
        height: hp(7.8),
        width: hp(7.8),
        borderRadius: hp(7.8) / 2,
        backgroundColor: "#FFBA09",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: hp(6),
        elevation: 4
    },
}
export default styles