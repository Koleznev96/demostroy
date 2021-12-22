import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    rootSt: {
        marginBottom: 5,
        width: '100%',
        position: 'relative',
        paddingHorizontal: 20,
    },
    block_one: {
        position: 'absolute',
        zIndex: 500,
        left: 20,
        right: 20,
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bod: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    gipol: {
        zIndex: 1000,
    },
    root: {
        width: '100%',
        backgroundColor: Colors.FirstColor,
        borderRadius: 15,
        ...Colors.BoxShadow,
        zIndex: 1000,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 12,
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        width: 46,
        height: 46,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    edit: {
        backgroundColor: '#4B78BC',
        marginRight: 10,
    },
    setting: {
        backgroundColor: '#4BB5BC',
        marginRight: 10,
    },
    delete: {
        backgroundColor: '#BC4B4B',
        marginRight: 10,
    },
    messange: {
        backgroundColor: '#54BC4B',
    },
    line: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    line_dop: {
        flexDirection: 'row',
    },
    circl: {
        backgroundColor: '#54BC4B',
        width: 10,
        height: 10,
        borderRadius: 100,
        marginRight: 10,
    },
    bling: {
        marginTop: -4,
    },
    title: {
        fontSize: 14,
    },
    name: {
        color: 'rgba(235, 157, 64, 0.7)',
        fontSize: 12,
    },
    wrapper_l: {

    },
    price: {
        width: '100%',
        textAlign: 'right',
        fontSize: 18,
        marginTop: -3,
    },
    data_date: {
        flexDirection: 'row',
        marginTop: 6,
    },
    date: {
        width: '100%',
        textAlign: 'right',
        marginTop: 16,
        color: Colors.TextBlack,
        fontSize: 12,
    },
    st: {
        marginRight: 5,
    },
});