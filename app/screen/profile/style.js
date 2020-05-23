import * as utlitiy from '../../utility/index';
import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = {
    container: {
        width: "100%",
        height: "100%",
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
    profile_container: {
        width: wp(90),
        height: hp(12),
        borderRadius: 12,
        marginVertical: hp(2),
        padding: 6
    },
    settings: {
        height: hp(4.6),
        width: hp(4.6),
        alignSelf: 'flex-end'
    },
    profile_image: {
        
        height: hp(12),
        width: hp(12),
        borderRadius: hp(12)/2,
        alignSelf: 'center',
        borderColor:'white',
        borderWidth:2
    },
    
    footer_container: {
        zIndex: 10,
        marginBottom: hp(2.2),
        width: wp(94),
        height: "6.8%",
        alignSelf: 'center'
    },
}
export default styles