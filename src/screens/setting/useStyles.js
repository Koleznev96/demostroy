import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors } from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.SecondColor,
        paddingHorizontal: 20,
    },
    items_menu: {
        ...Colors.BoxShadow,
        width: '100%',
        backgroundColor: Colors.FirstColor,
        borderRadius: 20,
        
        flexDirection: 'row',
        paddingLeft: 20,
    },
    column: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    column_button: {
        marginLeft: 10,
        width: width - 93,
    },
    wrapper: {
        flexDirection: 'row',
    },
    icon: {
        width: '100%',
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    button_item: {
        width: '100%',
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    item: {
        fontSize: 14,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
    },
    scrollView: {
        width: '100%',
        marginTop: 20,
    },
    liner_menu: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.ColorInput,
        padding: 3,
        ...Colors.BoxShadow,
        borderRadius: 15,
        marginTop: 5,
        zIndex: 500,
        
    },
    button_menu: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 34,
        borderRadius: 13,
        ...Colors.BoxShadow,
        backgroundColor: Colors.ColorInput,
    },
    button_menu_active: {
        backgroundColor: Colors.SecondColor,
    },
    button_menu_label: {
        color: Colors.Placeholder,
        fontSize: 14,
        
    },
    button_menu_label_active: {
        color: '#fff',
        
    }
});