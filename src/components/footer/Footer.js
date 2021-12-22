import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    Pressable,
    Keyboard
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import {Colors} from "../../utils/Colors";


export const Footer = ({ data }) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

    return (
        <View style={styles.root}>
            {!isKeyboardVisible ? (
                <Text style={[GlobalStyle.CustomFontMedium, styles.title]}>
                Сделано компанией <Text style={[GlobalStyle.CustomFontMedium, styles.title_org]}>TEO</Text> 
                </Text>
             ) : null}
        </View>
    );
}

