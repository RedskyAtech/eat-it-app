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
        marginTop: hp(2.4),
        marginBottom: hp(3.8)
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
    inner_heading: {
        fontSize: 16
    },
    filter_box: {
        width: wp(90),
        alignSelf: 'center',
    },
    filter_container: {
        marginVertical: hp(2),
    },
    filters: {
        height: hp(3.8),
        width: 'auto',
        borderRadius: 15,
        paddingVertical: hp(1.8),
        paddingHorizontal: wp(6.5),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(3),
        marginBottom: hp(1.4)
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
    progress_bar: {
        height: 2.6,
        marginVertical: hp(2.2),
        backgroundColor: colors.greyText
    },
    km_text: {
        fontSize: fonts.FONT_NORMAL
    },
    percentage: {
        color: colors.primaryColor
    },
    price_container: {
      borderWidth:1,
      borderColor:colors.greyText,
      backgroundColor:"#ECECEC",
      paddingVertical:hp(1),
      paddingHorizontal:wp(2),
      width:wp(26),
      marginRight:wp(6),
      borderRadius:3
    },
    price_text:{
        color:colors.greyText,
        fontSize:12,
        fontWeight:fonts.FONT_BOLD
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
        elevation:4
    },
}
export default styles