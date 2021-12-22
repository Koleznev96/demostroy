import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    block_background: {
        position: 'absolute',
        zIndex: 1200,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.48)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popap_block: {
        ...Colors.BoxShadow,
        width: '80%',
        backgroundColor: Colors.SecondColor,
        borderRadius: 20,
    }
});