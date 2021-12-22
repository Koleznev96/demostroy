import { StyleSheet, Platform } from 'react-native';
import { Colors } from "../../utils/Colors";

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
        paddingHorizontal: 20,
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