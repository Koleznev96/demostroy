import React from 'react';
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


export const  HeaderRoot = ({ data }) => {
    return (
        <View style={styles.body}>
            <View style={styles.wrapper}>
                {data.img ? <Image style={styles.img} source={data.img} /> : null}
                <Text 
                style={[
                    GlobalStyle.CustomFontRegular,
                    styles.name_screen
                ]}
                >Elsadchess</Text>
            </View>
            {data.info}
        </View>
    );
}

