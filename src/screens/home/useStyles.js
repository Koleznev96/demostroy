import { StyleSheet, Platform } from 'react-native';
import { Colors } from "../../utils/Colors";

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.SecondColor,
        // paddingBottom: 100,
    },
    coll: {
        zIndex: Platform.OS === 'ios' ? 2500 : 0,
        paddingHorizontal: 20,
    },
    header_search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollView: {
        zIndex: 0,
        width: '100%',
        paddingBottom: 120,
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
    block_dalate: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    label_delete: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        maxWidth: 170,
    },
    button_dalete: {
        marginBottom: 6,
        backgroundColor: Colors.Orange,
        width: '100%',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_clouse: {
        marginBottom: 20,
        backgroundColor: Colors.FirstColor,
        width: '100%',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item_text: {
        fontSize: 16,
    }
});