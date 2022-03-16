import { StyleSheet, Platform } from 'react-native';
import { Colors } from "../../utils/Colors";

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.SecondColor,
    },
    coll: {
        zIndex: Platform.OS === 'ios' ? 2500 : 0,
        paddingHorizontal: 20,
        // marginBottom: 5,
    },
    header_search: {
        marginTop: Platform.OS === 'ios' ? 35 : 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollView: {
        zIndex: 0,
        width: '100%',
        paddingBottom: 120,
        // paddingHorizontal: 20,
    },
    block: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.FirstColor,
        ...Colors.BoxShadow,
        borderRadius: 20,
        marginBottom: 20,
    },
    block_set: {
        width: '100%',
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: Colors.FirstColor,
        ...Colors.BoxShadow,
        borderRadius: 20,
        marginBottom: 20,
    },
    block_opac: {
        width: '100%',
        marginBottom: 20,
    },
    block_local: {
        width: '100%',
        padding: 20,
        paddingLeft: 0,
        backgroundColor: Colors.FirstColor,
        ...Colors.BoxShadow,
        borderRadius: 20,
        marginBottom: 20,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.ColorIcon,
        opacity: 0.2,
    },
});