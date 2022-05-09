import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        // position: 'relative',
        // marginTop: 20,
        // maxHeight: 150,
        // marginBottom: 20,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
    },
    title: {
        fontSize: 18,
    },
    wrapper: {
        flexDirection: 'row',
    },
    box_icon: {
        width: 21,
        height: 21,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 14,
    },
    address: {
        marginBottom: 15,
        fontSize: 14,
        color: '#FFFFFF',
    },
    item_liner: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    item_liner_: {
        flexDirection: 'row',
    },
    item_liner_label: {
        fontSize: 14,
        color: Colors.ColorIcon,
    },
    item_liner_date: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    item_liner_time: {
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft: 10,
    },
    hr: {
        // marginTop: 5,
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)'
    }
});