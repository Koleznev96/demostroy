import { StyleSheet, Platform } from 'react-native';
import { Colors } from "../../utils/Colors";

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.SecondColor,
        paddingHorizontal: 20,
        // paddingBottom: 100,
    },
    body_double: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.SecondColor,
    },
    avatar: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    img: {
        width: 54,
        height: 54,
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    },
    info: {
        marginTop: 40,
        width: '100%',
        backgroundColor: Colors.FirstColor,
        ...Colors.BoxShadow,
        borderRadius: 20,
        paddingLeft: 21,
        paddingVertical: 15,
    },
    info_item: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: Colors.ColorIcon
    },
    block_button: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 6,
    },
    button_exit: {
        width: '100%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coll: {
        paddingHorizontal: 20,
    },
    header_search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollView: {
        marginTop: 10,
        width: '100%',
    },
    block_defoult: {
        height: 20,
    },
    block: {
        height: 100,
        width: '100%',
    },
    test: {
        width: '100%',
        height: 1000,
        backgroundColor: Colors.FirstColor,
    },
    button_buttom: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        
    },
});