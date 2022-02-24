import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 50,
        marginTop: Platform.OS === 'ios' ? 45 : 26,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 500,
    },
    blur: {
        position: 'absolute',
        zIndex: 5000,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        top: Platform.OS === 'ios' ? 35 : 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: height,
    },
    popup: {
        width: '100%',
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 0,
        backgroundColor: Colors.SecondColor,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        zIndex: 3001,
    },
    button_exit: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu_item: {

    },
    liner: {
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
    },
    menu_item_label: {
        marginLeft: 0,
        fontSize: 16,
        fontWeight: '400',
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 48,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
        marginLeft: 48,
    },
    text_item_menu: {
        fontSize: 28,
    },
    button_menu: {
        width: 30,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});