import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingLeft: 20,
        width: '100%',
    },
    block_label: {
        fontSize: 18,
        flex: 1,
        lineHeight: 21,
    },
    wrapper_buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 90,
    },
    button: {
        width: 41,
        height: 41,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_chart: {
        backgroundColor: Colors.ColorIcon,
    },
    button_chart_active: {
        backgroundColor: Colors.Orange,
    },
    block_chart: {

    },
    chart_item: {
        marginTop: 15,
        width: '100%',
    },
    chart_item_label: {
        paddingLeft: 20,
        fontSize: 12,
        marginBottom: 6,
    },
    chart_item_liner: {
        height: 34,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    chart_item_value: {
        fontSize: 12,
        color: '#FFF',
    },
});