import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    rootSt: {
        width: '100%',
        height: 80,
        paddingRight: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    block: {
        flexDirection: 'row',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 9,
        backgroundColor: Colors.ColorIcon,
    },
    box: {
        width: width - 205,
    },
    box_l: {
        width: 40,
    },
    label: {
        fontSize: 16,
    },
    value: {
        fontSize: 12,
        color: '#CCCCCC',
    },
    time: {
        width: '100%',
        textAlign: 'right',
        fontSize: 12,
        marginBottom: 6,
        color: Colors.ColorIcon,
    },
    eleven: {
        fontSize: 12,
        minWidth: 18,
        paddingHorizontal: 4,
        height: 18,
        backgroundColor: Colors.Orange,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        textAlign: 'center',
        paddingTop: 0.5,
    },
    liner: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
        marginRight: 10,
    },
});