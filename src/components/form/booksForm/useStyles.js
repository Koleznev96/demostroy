import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        marginBottom: 20,
    },
    scrollView: {
        maxHeight: 600,
    },
    input: {
        width: '100%',
        // paddingHorizontal: 2,
        color: '#fff',
        fontSize: 14,
        marginTop: 6,
        height: 36,
        
        paddingBottom: -8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    value: {
        fontSize: 14,
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
        marginBottom: 13,
        paddingHorizontal: 25,
    },
    loader: {

    },
    button_item: {
        width: '100%',
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    liner_search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#60687E',
        height: 38,
        margin: 10,
        borderRadius: 12,
    },
    input_search: {
        fontSize: 15,
        height: '100%',
        width: '90%'
    },
    item: {
        fontSize: 14,
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