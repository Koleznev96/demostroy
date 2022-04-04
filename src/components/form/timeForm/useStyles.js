import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        marginBottom: 20,
    },
    button: {
        width: '100%',
    },
    input: {
        marginLeft: 3,
        width: '100%',
        color: '#fff',
        fontSize: 14,
        paddingTop: 8,
        paddingBottom: 5,
    },
    input_def: {
        marginLeft: 3,
        width: '100%',
        color: '#B9B9B9',
        fontSize: 14,
        paddingTop: 8,
        paddingBottom: 5,
    },
    hr_g: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
    },
    icon: {
        marginTop: 8,
    },
    value: {
        fontSize: 14,
    },
    value_no: {
        color: 'rgba(255, 255, 255, 0.4)',
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
    block_items: {
        position: 'absolute',
        zIndex: 1300,
    },
    button_item: {
        width: '100%',
        paddingVertical: 10,
        paddingLeft: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        fontSize: 14,
        marginLeft: 11,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
    },
    block_defoult: {
        width: 12,
    }
});