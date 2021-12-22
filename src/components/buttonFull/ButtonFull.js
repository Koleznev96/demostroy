import React from 'react';
import {
    Text,
    View,
    Image,
    Pressable,
    TouchableOpacity
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import {Colors} from "../../utils/Colors";


export const ButtonFull = ({ data }) => {
    return (
        <TouchableOpacity
        style={[styles.button, data?.styles ? data.styles : null ]}
        onPress={() => data.change()}
        >
            <Text style={[GlobalStyle.CustomFontMedium, styles.button_text]}>
                {data.value}
            </Text>
        </TouchableOpacity>    
    );
}

