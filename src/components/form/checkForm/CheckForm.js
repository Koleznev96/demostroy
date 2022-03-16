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
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.root}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>
        {data?.data?.map((item, index) => (
            <View style={styles.item}>
                <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>{item.label}</Text>
                <Switch
                    trackColor={{ false: "#767577", true: Colors.ColorIcon }}
                    thumbColor={isEnabled ? Colors.Orange : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        ))}
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
                {data.error}
        </Text> : null}
        </View>
    );
}

