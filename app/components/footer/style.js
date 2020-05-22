import * as utlitiy from '../../utility/index';
import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = {
    container: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: 'black',
        elevation: 4,
    },
    icons: {
        height: hp(3.6),
        width: hp(3.6)
    },
    shadow: {
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        elevation: 4,
    },
    share_icon: {
        height: hp(8),
        width: hp(8),
        marginTop: hp(-4),
    }
}
export default styles