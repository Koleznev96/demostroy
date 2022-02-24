import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
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
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
    },
    list_item_block: {
        width: '40%',
    },
    block_one_label: {
        fontSize: 12,
    },
    block_one_value: {
        fontSize: 24,
        width: 600,
    },
    block_one_value2: {
        fontSize: 12,
        color: '#FFF',
    },
});