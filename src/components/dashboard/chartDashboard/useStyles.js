import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
        // backgroundColor: Colors.ColorIcon,
    },
    button_chart_active: {
        // backgroundColor: Colors.Orange,
    },
});