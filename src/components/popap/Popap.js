import React, {useContext} from 'react';
import {
    View,
    Dimensions,
    Pressable
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {PopapContext} from "../../context/PopapContext";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import {Colors} from "../../utils/Colors";


export const Popap = () => {
    const popapRoot = useContext(PopapContext);

    if (!popapRoot.isOpen) {
        return null;
    }

    return (
        <Pressable style={styles.block_background} onPress={() => popapRoot.exitHandler()}>
            <View style={styles.popap_block}>
                {popapRoot.data}
            </View>
        </Pressable>
    );
}

