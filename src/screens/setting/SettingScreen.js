import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {Menu} from "../../components/menu/Menu";
import {HeaderIndex} from "../../components/headerIndex/HeaderIndex";
import {Colors} from "../../utils/Colors";
import {DataLangContext} from "../../context/DataLangContext";
import GlobalStyle from "../../components/GlobalStyle";
import {MenuContext} from "../../context/MenuContext";
import {DataContext} from "../../context/DataContext";
import {SettingDataContext} from "../../context/SettingDataContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';


function SettingScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const dataRoot = useContext(DataContext);
    const dataLang = useContext(DataLangContext);
    const settingDataContext = useContext(SettingDataContext);
    const {loading, request, error, clearError} = useHttp();
    const [isMenu, setIsMenu] = useState(false);
    const [items, setItems] = useState(null);

    const menuHandler = (url, title) => {
        if (isMenu) {

        } else {
            settingDataContext.setTitle(title);
            settingDataContext.setBackTo('setting', {title: title});
            settingDataContext.setUrl(url);
            settingDataContext.newRender()
            navigation.push('Home',
                {status: true, url, title}
            );
        }
    }

    const getItems = async () => {
        const url_set = isMenu ? 'get-menu-setting' : 'get-menu-references';
        try {
            const answer = await request(`${auth.url_str}/mobile/default/${url_set}?token=${auth.token}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setItems(answer);
        } catch (e) {}
    }

    useEffect(() => {
        getItems();
    }, [isMenu]);

    const GetIconsMenu = (nameIcom) => {
        return <Icon style={styles.icon} name={nameIcom?.slice(6, nameIcom.length)} size={18} color={Colors.Orange} />;
    }

    const callback_person = () => {
        navigation.navigate('Profile')
    }

    return (
        <View style={styles.body}>
            <HeaderIndex data={{title: (dataLang?.data ? dataLang?.data['Настройки'] : 'Настройки')}} callback_person={callback_person}/>
            
            <View style={styles.liner_menu}>
                <TouchableOpacity
                style={[styles.button_menu, isMenu ? styles.button_menu_active : null]}
                onPress={() => setIsMenu(true)}
                >
                    <Text
                    style={[
                        GlobalStyle.CustomFontBold,
                        styles.button_menu_label,
                        isMenu ? styles.button_menu_label_active : null
                    ]}
                    >
                        {dataLang?.data ? dataLang?.data['Настройки'] : 'Настройки'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.button_menu, !isMenu ? styles.button_menu_active : null]}
                onPress={() => setIsMenu(false)}
                >
                    <Text
                    style={[
                        GlobalStyle.CustomFontBold,
                        styles.button_menu_label,
                        !isMenu ? styles.button_menu_label_active : null
                    ]}
                    >
                        {dataLang?.data ? dataLang?.data['Справочник'] : 'Справочник'}
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
            <View style={styles.items_menu}>
                <View style={styles.column}>
                {items?.map((item, index) => GetIconsMenu(item.icon))}
                </View>
                <View style={styles.column_button}>
                {items?.map((item, index) => (
                    <>
                    <TouchableOpacity
                    style={styles.button_item}
                    onPress={() => menuHandler(item.url[0], item.label)}
                    >
                        <Text style={[GlobalStyle.CustomFontRegular, styles.item]}>{item.label}</Text>
                        <GlobalSvgSelector id='arrow_right' />

                    </TouchableOpacity>
                    <View style={index !== items?.length - 1 ? styles.hr : null} /> 
                    </>
                ))}
                </View>
            </View>
            <View style={{width: '100%', height: 120,}} />
            </ScrollView>

            <Menu navigation={navigation}/>
        </View>
    );
}

export default SettingScreen;

