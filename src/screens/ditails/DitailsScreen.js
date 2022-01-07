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
import GlobalStyle from "../../components/GlobalStyle";
import {DataLangContext} from "../../context/DataLangContext";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import {HeaderBreack} from "../../components/headerBreack/HeaderBreack";
import {EventItemView} from "../../components/eventItemView/EventItemView";
import {MenuContext} from "../../context/MenuContext";
import {SettingDataContext} from "../../context/SettingDataContext";


function DitailsScreen({ navigation, route }) {
    const {data, form} = route.params;
    const [len, setLen] = useState(0);
    const [lenL, setLenL] = useState(0);
    const dataLang = useContext(DataLangContext);

    useEffect(() => {
        if (data) {
            let new_len = 0;
            Object.entries(data).forEach(item => {
                if (item[1] || item[0] !== 'company_id' || item[0] !== 'id') {
                    new_len++;
                }
            });
            setLen(new_len);
        }
    }, []);

    const backHandler = () => {
        navigation.goBack();
    }

    const menuHandler = () => {

    }

    const viewHandler = () => {
        
    }
    let ppp = 0;

    return (
        <View style={styles.body}>
            <HeaderBreack data={{title: 'Информация', callback_back: backHandler, callback_menu: menuHandler}}/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.block}>
                    {form?.map((item, index) => {
                        if (!data[item.name]) return null;
                        ppp++;
                        return(
                            <>
                                <View style={styles.button_item}>
                                    <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{item.label}</Text>
                                    <Text style={[GlobalStyle.CustomFontRegular, styles.name]}>{data[item.name]}</Text>
                                </View>
                                <View style={styles.hr} />
                            </>
                        )
                    })}
                </View>
            </ScrollView>
            {/* <Menu navigation={navigation}/> */}
        </View>
    );
}

export default DitailsScreen;

