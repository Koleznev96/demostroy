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
        marginTop: 15,
        paddingRight: 20,
    },
    liner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 13,
    },
    liner_label: {
        fontSize: 16,
        marginLeft: 10,
    },
    wrapper_column: {
        width: '50%',
    },
    up_text: {
        fontSize: 11,
        marginBottom: 1,
    },
    down_text: {
        fontSize: 20,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
        marginTop: 15,
    }
});