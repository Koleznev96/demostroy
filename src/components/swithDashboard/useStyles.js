import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        width: '100%',
        // marginBottom: 20,
        // zIndex: 500,
    },
    button_swith: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 32,
    },
    button_swith_text: {
        fontSize: 14,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
    },
    button_item_l: {
        width: '100%',
        paddingVertical: 10,
        paddingLeft: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_l: {
        fontSize: 14,
        marginLeft: 11,
    },
    hr_l: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
    },
    block_defoult_l: {
        width: 12,
    }
});