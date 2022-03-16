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


function ViewScreen({ navigation, route }) {
    const {data, url, title, dataRoot} = route.params;
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const settingDataContext = useContext(SettingDataContext);
    const {loading, request, error, clearError} = useHttp();
    const [event, setEvent] = useState(null);
    const [titile_s, set_titile_s] = useState(title);

    const backHandler = () => {
        if (settingDataContext.vilkt === 1) {
            settingDataContext.setUrl(settingDataContext.data_dop_r.url);
        }
        settingDataContext.setVilkt(0);
        // console.log('****', route.params.type)
        // if (route.params.type) {
        //     console.log('aaaaaaaaaaaaaaaaa')
        //     if (settingDataContext.vilkt === 0) {
        //         console.log('bbbbbbbbbbbbbbbbb')
        //         navigation.navigate({
        //             name: 'Home',
        //             params: {status: true}
        //         });
        //     } else {
        //         console.log('cccccccccccccccccc', route.params, route.params.status)
        //         console.log('settingDataContext.data_dop_r', settingDataContext.data_dop_r.url)
        //         settingDataContext.setUrl(settingDataContext.data_dop_r.url, false);
        //         navigation.navigate({
        //             name: 'Home',
        //             params: {status: settingDataContext.data_dop_r.let_rout ? false : true, ...settingDataContext.data_dop_r}
        //         });
        //     }
            
        // } else {
        //     console.log('dddddddddddddddddd')
        //     // if (settingDataContext.vilkt === 0) {
        //     //     navigation.goBack();
        //     // } else {
        //     //     navigation.navigate({
        //     //         name: 'Home',
        //     //         params: {status: true, ...settingDataContext.data_dop_r}
        //     //     });
        //     // }
        //     navigation.goBack();
        // } 
        navigation.goBack();
    }

    const menuHandler = () => {

    }

    const getView = async () => {
        try {
            // console.log('View-url:', `${auth.url_str}/mobile${url}/view?token=${auth.token}&id=${data.id}`)
            const answer = await request(`${auth.url_str}/mobile${url}/view?token=${auth.token}&id=${data.id}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            // console.log('answer-', answer)
            setEvent(answer);
        } catch (e) {
            // console.log('err-', e)
        }
    }

    useEffect(() => {
        getView();
    }, [url, data?.id, title]);

    const itemHandler = (url_set, title_p) => {
        // console.log('iiiooo-', url_set)
        settingDataContext.setTitle(title_p);
        settingDataContext.setVilkt(1);
        // settingDataContext.setBackTo_r('view', {data, url, type: true, title: title, let_rout: route.params?.let_rout});
        // console.log('setup-', settingDataContext.url, url_set)
        settingDataContext.setUrl(url_set, true);
        // settingDataContext.newRender();
        // navigation.navigate({
        //     name: 'Home',
        //     params: {status: true, url: url_set, title: title_p}
        // });
        settingDataContext.setBackTo_r('view', {url});
        navigation.push('Home',
            {status: true, url: url_set, title: title_p}
        );
    }

    const viewHandler = () => {
        navigation.navigate({
            name: 'Ditails',
            params: {data: event?.data, form: event?.form}
        })
    }

    let ppp = 0;

    return (
        <View style={styles.body}>
            <View style={styles.coll}>
            <HeaderBreack data={{title: titile_s, callback_back: backHandler, callback_menu: menuHandler}}/>
            </View>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <EventItemView item={event?.data} viewHandler={viewHandler} dataRoot={dataRoot} form={event?.form}/>
                {event?.mini_menu?.items?.length ? (
                <View style={styles.container}>
                    <View style={styles.items_menu}>
                    {
                    event?.mini_menu?.items?.map((item, index) => {
                        // console.log('pppp-', item)
                    return (
                        <>
                        <TouchableOpacity
                        style={styles.button_item}
                        onPress={() => itemHandler(item.url[0], item.label)}
                        >
                            <Text style={[GlobalStyle.CustomFontRegular, styles.item]}>{item.label}</Text>
                            <GlobalSvgSelector id='arrow_right' />
                        </TouchableOpacity>
                        <View style={index !== event?.mini_menu?.items?.length - 1 ? styles.hr : null} />
                        </>
                    )})}
                    </View>
                </View>
                ) : (
                    <View style={styles.container}>
                    <View style={styles.block_l}>
                        {event?.form?.map((item, index) => {
                            if (!event?.data[item.name]) return null;
                            ppp++;
                            return(
                                <>
                                    <View style={styles.button_item_l}>
                                        <Text style={[GlobalStyle.CustomFontRegular, styles.label_l]}>{item.label}</Text>
                                        <Text style={[GlobalStyle.CustomFontRegular, styles.name_l]}>{event?.data[item.name]}</Text>
                                    </View>
                                    <View style={styles.hr_l} />
                                </>
                            )
                        })}
                    </View>
                    </View>
                )}
                <View style={styles.block_defoult} />
            </ScrollView>
            {/* <Menu navigation={navigation}/> */}
        </View>
    );
}

export default ViewScreen;

