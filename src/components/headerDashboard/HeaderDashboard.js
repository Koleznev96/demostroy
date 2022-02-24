import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import Icon from 'react-native-vector-icons/FontAwesome';


export const HeaderDashboard = ({value}) => {

    return (
        <View style={styles.root}>
            <Text
            style={[
                GlobalStyle.CustomFontBold,
                styles.text_item_menu
            ]}
            >
                {value}
            </Text>
        </View>
    );
}

