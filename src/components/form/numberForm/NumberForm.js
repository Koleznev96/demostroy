import React from 'react';
import {
    Text,
    View,
    Image,
    Pressable,
    TextInput
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import {Colors} from "../../../utils/Colors";


export const NumberForm = ({ data }) => {
    return (
        <View style={styles.root}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>
        <TextInput 
        keyboardType='numeric'
        value={data.value[data.name]} 
        placeholderTextColor={Colors.Placeholder} 
        style={[styles.input, data?.styles ? data.styles : null ]} 
        // placeholder={data.placeholder ? data.placeholder : data.label} 
        onChangeText={(value) => data.change({name: data.name, value}, data.index)} 
        />
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
                {data.error}
        </Text> : null}
        </View>
    );
}

