import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    panelBorder: {
        position: 'absolute',
        // height: 140,
        padding: 20,
        paddingTop: 50,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1000,
    },
    menu: {
        width: '100%',
        height: 65,
        borderRadius: 20,
        backgroundColor: Colors.ColorInput,
        ...Colors.BoxShadow,
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingRight: 40,

        // justifyContent: 'space-between',
    },
    menu_active: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: Colors.ColorInput,
        ...Colors.BoxShadow,
        flexDirection: 'row',
        // alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        paddingRight: 40,
    },
    lin_item: {
        flexDirection: 'column',
        width: '22%',
        alignItems: 'center',
    },
    lin_item_set: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '35%',
    },
    item_menu: {
        alignItems: 'center',
        width: 60,
        height: 42,
        zIndex: 1100,
    },
    item_menu_active: {
        alignItems: 'center',
        marginBottom: 12,
        width: 60,
        height: 42,
        zIndex: 1100,
    },
    block: {
        width: 60,
    },
    text_item_menu: {
        color: Colors.ColorIcon,
        fontSize: 11,
        textAlign: 'center'
    },
    text_item_menu_active: {
        color: Colors.Orange,
    },
    posit_center: {
        position: 'absolute',
        zIndex: 1040,
        top: -25,
        left: 0,
        right: 0,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    posit_center_bootm: {
        position: 'absolute',
        zIndex: 1040,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    open: {
        width: 50,
        height: 36,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 7,
    },
    box_circle: {
        width: 60,
        height: 60,
        backgroundColor: Colors.FirstColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginBottom: 12,
    },
    circle: {
        // width: (width-40)*0.12,
        // height: (width-40)*0.12,
        width: 44,
        height: 44,
        backgroundColor: Colors.Orange,
        borderRadius: 100,
        // borderWidth: 7,
        // borderColor: Colors.FirstColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle_block: {
        // width: (width-40)*0.12,
        // height: (width-40)*0.12,
        width: 44,
        height: 44,
        backgroundColor: '#A9712E',
        borderRadius: 100,
        // borderWidth: 7,
        // borderColor: Colors.FirstColor,
        justifyContent: 'center',
        alignItems: 'center',
    }
});