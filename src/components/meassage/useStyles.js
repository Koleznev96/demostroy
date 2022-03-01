import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    liner_my: {
        marginBottom: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    liner_you: {
        marginBottom: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    root_my: {
        maxWidth: '90%',
        minWidth: 110,
        paddingTop: 8,
        paddingBottom: 11,
        paddingLeft: 11,
        paddingRight: 15,
        backgroundColor: Colors.FirstColor,
        borderRadius: 11,
        position: 'relative',
    },
    root_you: {
        maxWidth: '90%',
        minWidth: 110,
        paddingTop: 8,
        paddingBottom: 11,
        paddingLeft: 11,
        paddingRight: 15,
        backgroundColor: Colors.ColorInput,
        borderRadius: 11,
        position: 'relative',
    },
    meassage: {
        fontSize: 14,
        marginRight: 22,
    },
    date: {
        position: 'absolute',
        color: Colors.TextBlack,
        fontSize: 10,
        bottom: 3,
        right: 6,
    },
});