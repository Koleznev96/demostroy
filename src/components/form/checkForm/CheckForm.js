import React, {useState} from 'react';
import {
    Text,
    View,
    TextInput,
    Switch
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import {Colors} from "../../../utils/Colors";


export const CheckForm = ({ data }) => {
    return (
        <View style={styles.root}>
        <View style={styles.wrapper}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>
        <Switch
            trackColor={{ false: "#767577", true: Colors.ColorIcon }}
            thumbColor={data.value[data.name] === 1 ? Colors.Orange : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => data.change({name: data.name, value: data.value[data.name] === 1 ? 0 : 1}, data.index)}
            value={data.value[data.name] === 1}
        />
        </View>
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
                {data.error}
        </Text> : null}
        </View>
    );
}

