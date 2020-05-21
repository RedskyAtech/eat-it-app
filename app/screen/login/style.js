import * as utlitiy from '../../utility/index';
import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    back_container: {
        margin: 5
    },
    arrow: {
        height: utlitiy.heightPercentageToDP(4.5),
        width: utlitiy.heightPercentageToDP(4.5),
    },
    logo_container: {
        marginTop: -18,
        width: utlitiy.widthPercentageToDP(84),
        alignSelf: 'center'
    },
    logo: {
        height: utlitiy.heightPercentageToDP(15),
        width: utlitiy.heightPercentageToDP(15),
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
        marginTop: 40
    },
    text: {
        fontSize: fonts.FONT_HEADING,
        fontWeight: fonts.FONT_BOLD,
    },
    headings_color:{
     color:colors.fieldsColor
    },
    fields_container: {
        marginVertical: 30,
        width: utlitiy.widthPercentageToDP(88),
        alignSelf: 'center'
    },
    fields: {
        borderBottomWidth: 1.4,
        borderBottomColor: colors.fieldsColor,
        marginVertical: 12,
        paddingVertical: 4
    },

    input_box: {
        padding: 0,
        height: utlitiy.heightPercentageToDP(2.6),
        width: utlitiy.widthPercentageToDP(80)
    },
    field_icons: {
        height: utlitiy.heightPercentageToDP(2.4),
        width: utlitiy.heightPercentageToDP(2.4),
        marginRight: 10,
        padding: 0
    },
    between_spacing: {
        justifyContent: 'space-between',
        marginVertical: 14,
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
        marginVertical: 12
    },
    line: {
        backgroundColor: colors.primaryColor,
        height: 1.5,
        width: utlitiy.widthPercentageToDP(16),
        alignSelf: 'center',
    },
    or_text: {
        paddingHorizontal: 14,
        fontSize: fonts.FONT_TEXT,
        fontWeight: fonts.FONT_BOLD
    },
    social_container: {
        alignSelf: 'center',
        width: utlitiy.widthPercentageToDP(40)
    },
    social_icons: {
        height: utlitiy.heightPercentageToDP(5.8),
        width: utlitiy.heightPercentageToDP(5.8),
    },
    bottom_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: utlitiy.widthPercentageToDP(88),
        marginBottom: 20
    },
    forward_container: {
        height: utlitiy.heightPercentageToDP(7.8),
        width: utlitiy.heightPercentageToDP(7.8),
        borderRadius: utlitiy.heightPercentageToDP(7.8) / 2,
        backgroundColor: "#FFBA09",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'flex-end'
    }
}
export default styles