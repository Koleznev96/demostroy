import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 63,
        // marginTop: Platform.OS === 'ios' ? 35 : 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button_keft: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 3,
        fontSize: 18,
    },
    center_box: {
        alignItems: 'center',
    },
    online: {
        fontSize: 12,
        color: '#CCCCCC',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: '#CCCCCC',
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.ColorIcon,
        opacity: 0.2,
    }
});