import React, {useContext} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {MenuContext} from "../../context/MenuContext";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';


export const HeaderBreack = ({ data }) => {
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    return (
        <View style={styles.root}>
            <View>
                {data.callback_back ? (
                <TouchableOpacity
                    style={styles.button_keft}
                    onPress={() => {data.callback_back()}}
                    >
                    <GlobalSvgSelector id='back' />
                </TouchableOpacity>
                ) : null}
            </View>
            <Text
            style={[
                GlobalStyle.CustomFontBold,
                styles.title
            ]}
            >
                {data.title}
            </Text>

            <View>
                {data.callback_menu ? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {data.callback_menu()}}
                    >
                    <GlobalSvgSelector id='items_menu' />
                </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
}

