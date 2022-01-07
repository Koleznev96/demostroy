import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    BackHandler,
    RefreshControl
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {Menu} from "../../components/menu/Menu";
import {HeaderIndex} from "../../components/headerIndex/HeaderIndex";
import {DataLangContext} from "../../context/DataLangContext";
import {HeaderBreack} from "../../components/headerBreack/HeaderBreack";
import {Search} from "../../components/search/Search";
import {EventItem} from "../../components/eventItem/EventItem";
import {ListItem} from "../../components/listItem/ListItem";
import {MenuContext} from "../../context/MenuContext";
import {DataContext} from "../../context/DataContext";
import {PopapContext } from "../../context/PopapContext";
import {SettingDataContext} from "../../context/SettingDataContext";
import GlobalStyle from "../../components/GlobalStyle";
import {Popap} from "../../components/popap/Popap";
import {Colors, InputStyle} from "../../utils/Colors";


function HomeScreen({ navigation, route }) {
    const popapRoot = useContext(PopapContext);
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const dataRoot = useContext(DataContext);
    const settingDataRoot = useContext(SettingDataContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [stipoglot, setStipoglot] = useState(-1);
    const [stipoglot_l, setStipoglot_l] = useState(-1);

    const create = () => {
        navigation.navigate('Create');
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
        popapRoot.exitHandler();
        // settingDataRoot.clearData();
        if (route?.params?.status && navigation.getState().index === 0) {
            return false;
        }
        if (navigation.getState().index === 0) {
            return true;
        } else {
            if (navigation.getState()['routes'][navigation.getState()['index']].name === 'Setting') {
                return true;
            }
        }

        if (navigation.getState()['routes'][navigation.getState()['index']].name === 'View') {
            if (settingDataRoot.vilkt === 1) {
                settingDataRoot.setUrl(settingDataRoot.data_dop_r.url);
            }
            settingDataRoot.setVilkt(0);
            navigation.goBack();
            return true;
        }
        
        return false;
    });

    // BackHandler.addEventListener('hardwareBackPress', () => {
    //     popapRoot.exitHandler();
    //     // settingDataRoot.clearData();
    //     if (route?.params?.status && navigation.getState().index === 0) {
    //         if (settingDataRoot.vilkt === 0){
    //             if (settingDataRoot.backTo === 'setting') {
    //                 console.log('aaaa-11111');
    //                 navigation.replace('Setting');
    //                 return true;
    //             } else {
    //                 console.log('aaaa-22222');
    //                 navigation.replace({name: 'View', params: settingDataRoot.data_dop});
    //                 return true;
    //             }
    //         } else {
    //             if (settingDataRoot.backTo_r === 'setting') {
    //                 console.log('aaaa-333333');
    //                 navigation.replace('Setting');
    //                 return true;
    //             } else {
    //                 console.log('aaaa-44444');
    //                 navigation.replace({name: 'View', params: settingDataRoot.data_dop_r});
    //                 return true;
    //             }
    //         }
    //     }
    //     if (navigation.getState().index !== 0 && (navigation.getState()['routes'][navigation.getState()['index']].name === 'Edit' ||
    //     navigation.getState()['routes'][navigation.getState()['index']].name === 'Filter')) {
    //         // navigation.goBack();
    //         navigation.replace({name: 'Home', params: {status: false}});
    //     }
    //     if (navigation.getState().index !== 0 && (navigation.getState()['routes'][navigation.getState()['index']].name === 'DirectoriesCreate' ||
    //     navigation.getState()['routes'][navigation.getState()['index']].name === 'DirectoriesEdit')) {
    //         // navigation.goBack();
    //         navigation.replace({name: 'Home', params: {status: true}});
    //     }
    //     if (navigation.getState().index !== 0 && (
    //     // navigation.getState()['routes'][navigation.getState()['index']].name === 'DirectoriesEdit' ||
    //     navigation.getState()['routes'][navigation.getState()['index']].name === 'View' ||
    //     navigation.getState()['routes'][navigation.getState()['index']].name === 'Create' || 
    //     navigation.getState()['routes'][navigation.getState()['index']].name === 'SettingTabl' || 
    //     navigation.getState()['routes'][navigation.getState()['index']].name === 'Profile' ||
    //     navigation.getState()['routes'][navigation.getState()['index']].name === 'Ditails')) {
    //         console.log('iiiiiiiiiiiooooooooo-', settingDataRoot.data_dop)
    //         navigation.goBack();
    //     }
    //     return true;
    // });

    const backHandler = () => {
        navigation.goBack();
        // settingDataRoot.clearData();
        // console.log('l;;;;', settingDataRoot.backTo)
        // if (route?.params?.status) {
        //     if (settingDataRoot.vilkt === 0){
        //         if (settingDataRoot.backTo === 'setting')
        //             navigation.navigate('Setting');
        //         else {
        //             console.log('view111111')
        //             navigation.navigate({name: 'View', params: settingDataRoot?.data_dop});
        //         }
        //     } else {
        //         if (settingDataRoot.backTo_r === 'setting')
        //             navigation.navigate('Setting');
        //         else {
        //             console.log('view22222')
        //             navigation.navigate({name: 'View', params: settingDataRoot?.data_dop_r});
        //         }
        //     }
            
        // }
    }

    const menuHandler = () => {

    }

    const viewHandler = (data) => {
        // navigation.navigate({
        //     name: 'View',
        //     params: {data, url: settingDataRoot.url, type: false, title: route?.params?.title, let_rout: false, dataRoot: settingDataRoot}
        // });
        if (route?.params?.status)
            navigation.navigate({
                name: 'View',
                params: {data, url: settingDataRoot.url, type: false, title: route?.params?.title, let_rout: false, dataRoot: settingDataRoot}
            });
        else 
            navigation.navigate({
                name: 'View',
                params: {data, url: menuRoot.activeMenu.url[0], type: false, title: menuRoot.activeMenu.label, let_rout: true, dataRoot}
            });
    }

    const redationHandler = (data) => {
        if (route?.params?.status)
            navigation.navigate({name: 'DirectoriesEdit', params: {url: settingDataRoot.url, data}});
        else    
            navigation.navigate({name: 'Edit', params: {url: menuRoot.activeMenu.url[0], title: menuRoot.activeMenu.label, data}});
    }

    const setDeleteHandler = async (id) => {
        popapRoot.exitHandler();
        let new_url;
        if (route?.params?.status)
            new_url = settingDataRoot.url;
        else
            new_url = menuRoot.activeMenu.url[0];
        try {
            const answer = await request(`${auth.url_str}/mobile${new_url}/delete?id=${id}&token=${auth.token}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
        } catch (e) {}
        if (route?.params?.status)
            settingDataRoot.newRender();
        else
            dataRoot.newRender();
        
    }

    const clouseDeleteHandler = () => {
        popapRoot.exitHandler();
    }

    const DataPopap = (id, name) =>(
        <View style={styles.block_dalate}>
            <Text style={[GlobalStyle.CustomFontRegular, styles.label_delete]}>Подтвердите удаление {name}</Text>

            <TouchableOpacity
            style={styles.button_dalete}
            onPress={() => setDeleteHandler(id)}
            >
                <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>Удалить</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.button_clouse}
            onPress={() => clouseDeleteHandler()}
            >
                <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>Оставить</Text>
            </TouchableOpacity>
        </View>
    );

    const deleteHandler = (data) => {
        popapRoot.dataChange(DataPopap(data.id, data.name));
        popapRoot.openHandler();
    }

    const viewItemsHandler = (data) => {
        navigation.navigate({
            name: 'View',
            params: {data, url: menuRoot.activeMenu.url[0], status: true}
        });
    }

    const searchHandler = (str_search) => {

    }

    const filterHandler = () => {
        navigation.navigate({
            name: 'Filter',
            params: {status: route?.params?.status}
        })
    }

    const menuHeaderHandler = (data) => {
        switch(data.label) {
            case 'Настройка таблицы':
                return navigation.navigate('SettingTabl')
        }
    }

    const callback_person = () => {
        navigation.navigate('Profile')
    }

    const itemHandler = (index) => {
        if (index === stipoglot) {
            setStipoglot(-1);
        } else {
            setStipoglot(index);
        }
    }

    const itemHandler_l = (index) => {
        if (index === stipoglot_l) {
            setStipoglot_l(-1);
        } else {
            setStipoglot_l(index);
        }
    }

    return (
        <>
        <Popap />

        <View style={styles.body}>
            {route?.params?.status ? (
                <>
                <View style={styles.coll}>
                    <HeaderBreack data={{title: route?.params?.title, callback_back: backHandler, callback_menu: menuHandler}}/>
                </View>
                <FlatList 
                    refreshControl={
                        <RefreshControl
                            refreshing={Refreshing}
                            onRefresh={() => settingDataRoot.paginashion(true)}
                            colors={[Colors.Orange]}
                        />
                    }
                    contentContainerStyle={styles.scrollView}
                    data={settingDataRoot.data}
                    renderItem={(item, index) => ListItem(item, viewHandler, redationHandler, deleteHandler, settingDataRoot, stipoglot_l, itemHandler_l)}
                    keyExtractor={item => item.id}
                    onEndReached={settingDataRoot.paginashion}
                    onEndReachedThreshold={0.3}
                />
                <Menu navigation={navigation} status={true}/>
                </>
            ) : (
                <>
                <View style={styles.coll}>
                    <HeaderIndex menuHeaderHandler={menuHeaderHandler} callback_person={callback_person}/>
                    <View style={styles.header_search}>
                        <Search data={null} searchHandler={searchHandler} filterHandler={filterHandler}/>
                    </View>
                </View>
                <FlatList 
                    refreshControl={
                        <RefreshControl
                            refreshing={Refreshing}
                            onRefresh={() => dataRoot.paginashion(true)}
                            colors={[Colors.Orange]}
                        />
                    }
                    contentContainerStyle={styles.scrollView}
                    data={dataRoot.data}
                    renderItem={(item, index) => EventItem(item, viewHandler, redationHandler, deleteHandler, dataRoot, stipoglot, itemHandler)}
                    keyExtractor={item => item.id}
                    onEndReached={dataRoot.paginashion}
                    onEndReachedThreshold={0.3}
                    
                />
                <Menu navigation={navigation}/>
                </>
            )}
        </View>
        </>
    );
}

export default HomeScreen;

