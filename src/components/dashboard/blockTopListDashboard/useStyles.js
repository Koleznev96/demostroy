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
        width: '100%',
        marginTop: 13,
        paddingBottom: 10,
        paddingRight: 20,
    },
    liner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingVertical: 0.5,
    },
    list_item_block: {
        width: '50%',
    },
    block_one_label: {
        fontSize: 12,
        width: 500,
        color: 'rgba(256, 256, 256, 0.5)',
    },
    block_one_value: {
        fontSize: 12,
        width: 500,
    },
    block_one_value_color: {
        color: Colors.Orange,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
        marginTop: 12,
    }
});