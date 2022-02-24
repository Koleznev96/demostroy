import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
    },
    block_label: {
        fontSize: 18,
        width: '100%',
        lineHeight: 21,
    },
    list_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 16,
        paddingBottom: 10,
        paddingRight: 20,
    },
    list_item_block: {
        maxWidth: '70%',
    },
    block_one_label: {
        fontSize: 12,
        color: '#CBD9FF',
    },
    block_one_value: {
        fontSize: 24,
        width: 600,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
    }
});