import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from "../../utils/Colors";

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    block_background: {
        position: 'absolute',
        zIndex: 1200,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.48)',
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.SecondColor,
        // paddingBottom: 100,
    },
    coll: {
        paddingHorizontal: 20,
    },
    header_search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollView: {
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: Colors.SecondColor,
        ...Colors.BoxShadowNew,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1,
    },
    text_input: {
        paddingHorizontal: 6,
        width: width - 106,
        borderRadius: 15,
        backgroundColor: Colors.ColorInput,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        height: 40,
        ...Colors.BoxShadow,
    },
    button: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
});