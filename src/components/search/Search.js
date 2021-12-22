import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Keyboard,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {AuthContext} from "../../context/authContext";
import {MenuContext} from "../../context/MenuContext";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import {Colors} from "../../utils/Colors";
import LinearGradient from 'react-native-linear-gradient';
import {MenuSvgSelector} from "../../assets/MenuSvgSelector";
import FontAwesome, { parseIconFromClassName, parseIconName, SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import { TextInput } from 'react-native-gesture-handler';


export const Search = ({ data, searchHandler, filterHandler }) => {

    const [str_search, set_str_search] = useState('');

    return (
        <View style={styles.root}>
            <View style={styles.input}>
                <TextInput
                placeholder='Поиск'
                placeholderTextColor={Colors.Placeholder}
                onChangeText={(value) => set_str_search(value)}
                style={styles.text_input}
                />

                <TouchableOpacity
                style={styles.button_search}
                onPress={() => searchHandler(str_search)}
                >
                <GlobalSvgSelector id='search' />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button_filter}
                onPress={() => filterHandler()}
                >
                <GlobalSvgSelector id='filter' />
            </TouchableOpacity>
        </View>
    );
}

