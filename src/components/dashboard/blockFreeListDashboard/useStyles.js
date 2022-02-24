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
        width: '100%',
        marginTop: 5,
        padding: 20,
        paddingBottom: 8,
        backgroundColor: Colors.FirstColor,
        ...Colors.BoxShadow,
        borderRadius: 20,
    },
    liner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
        marginBottom: 12,
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    up_right: {
        fontSize: 16,
    },
    down_left: {
        fontSize: 12,
        color: Colors.Orange,
    },
    down_right: {
        fontSize: 16,
    }
});