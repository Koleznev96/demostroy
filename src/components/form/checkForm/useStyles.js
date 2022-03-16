import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 36,
        paddingHorizontal: -4,
        color: '#fff',
        fontSize: 14,
        // marginTop: -8,
        borderBottomWidth: 1,
        borderColor: 'rgba(203, 217, 255, 0.2)',
        paddingBottom: -8,
    },
    error_text: {
        color: 'red',
        fontSize: 12,
        width: '100%',
        paddingLeft: 4,
        textAlign: 'left',
        marginTop: 4,
    },
    label: {
        fontSize: 14,
        color: Colors.ColorIcon
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item_text: {
        color: '#fff',
        fontSize: 14,
        width: width - 100,
    }
});