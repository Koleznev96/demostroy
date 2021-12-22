import { StyleSheet, Platform } from 'react-native';
import { Colors } from "../../utils/Colors";

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.SecondColor,
        paddingHorizontal: 20,
    },
    scrollView: {
        marginTop: 5,
        width: '100%',
    },
    block_defoult: {
        height: 20,
    },
    container: {
        paddingHorizontal: 20,
    },
    items_menu: {
        ...Colors.BoxShadow,
        width: '100%',
        backgroundColor: Colors.FirstColor,
        borderRadius: 20,
        paddingLeft: 20,
        marginTop: 15,
    },
    button_item: {
        width: '100%',
        paddingRight: 20,
        paddingVertical: 10,
    },
    label: {
        color: Colors.ColorIcon,
        fontSize: 14,
    },
    name: {
        color: '#fff',
        fontSize: 14,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
    },
    block: {
        backgroundColor: Colors.FirstColor,
        borderRadius: 20,
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 20,
    }
});