import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    Pressable,
    TextInput
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import {Colors} from "../../utils/Colors";


export const InputFull = ({ data }) => {
    return (
        <>
        <TextInput secureTextEntry={data.secret ? true : false} value={data.value} placeholderTextColor={Colors.Placeholder} style={[styles.input, data?.styles ? data.styles : null ]} placeholder={data.placeholder} onChangeText={(value) => data.change(value)} />
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
                {data.error}
        </Text> : null}
        </>
    );
}

