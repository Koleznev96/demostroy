import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    marker: {
        top: -2, 
        bottom: 0, 
        left: 0, 
        right: 0, 
        position: 'absolute', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
});