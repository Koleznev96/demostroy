import React, {useContext, useCallback, useEffect, useState} from 'react';
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


export const TextForm = ({ data }) => {
    return (
        <View style={styles.root}>
        <TextInput 
        multiline={true}
        maxLength={246} 
        value={data.value} 
        placeholderTextColor={'rgba(255, 255, 255, 0.4)'} 
        placeholder={data.label}
        style={styles.input} 
        onChangeText={(value) => data.change({name: data.name, value}, data.index)} 
        />
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
                {data.error}
        </Text> : null}
        </View>
    );
}

