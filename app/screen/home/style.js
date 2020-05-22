import * as utlitiy from '../../utility/index';
import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = {
    container: {
        height: "100%",
        width: "100%"
    },
    row: {
        display: "flex",
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'space-between'
    },
    footer_container: {
        marginVertical:hp(2.6),
        width: wp(94),
        height: hp(6.8),
        alignSelf: 'center'
    }
}
export default styles