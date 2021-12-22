import React from 'react';
import {StyleSheet, Dimensions, ActivityIndicator, View} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {Colors} from "../../utils/Colors";

export const Loader = () => (
    <ActivityIndicator size={50} color={Colors.Orange} style={styles.loader}/>
);

export const Block = () => {
    <View style={styles.block}/>
}

const styles = StyleSheet.create({
    block: {
        width: 50,
        height: 50,
    },
    loader: {
        width: 50,
        height: 50,

    },
    bold: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1020,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.26)',
    }
});


