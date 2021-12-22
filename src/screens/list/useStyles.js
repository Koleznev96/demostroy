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
        paddingHorizontal: 20,
    },
    header_search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollView: {
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
    }
});