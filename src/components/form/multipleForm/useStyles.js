import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        // paddingHorizontal: 2,
        color: '#fff',
        fontSize: 14,
        marginTop: 6,
        borderBottomWidth: 1,
        borderColor: 'rgba(203, 217, 255, 0.2)',
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
        color: '#fff',
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
    },
    liner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    circle: {
        // width: (width-40)*0.12,
        // height: (width-40)*0.12,
        width: 40,
        height: 40,
        backgroundColor: Colors.Orange,
        borderRadius: 100,
        // borderWidth: 7,
        // borderColor: Colors.FirstColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    button_add: {
        fontSize: 14,
    },
    cont_root: {
        width: '100%',
        padding: 20,
        paddingBottom: 10,
        backgroundColor: Colors.FirstColor,
        borderRadius: 20,
        marginBottom: 5,
    }
});