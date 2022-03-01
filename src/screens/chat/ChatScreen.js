import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    BackHandler,
    RefreshControl,
    FlatList
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {Menu} from "../../components/menu/Menu";
import {MenuContext} from "../../context/MenuContext";
import {PopapContext } from "../../context/PopapContext";
import {Colors} from "../../utils/Colors";
import {Popap} from "../../components/popap/Popap";
import {HeaderChat} from "../../components/headerChat/HeaderChat";
import {Search} from "../../components/search/Search";
import { ItemChat } from '../../components/itemChat/ItemChat';
import { ChatContext } from '../../context/ChatContext';


function ChatScreen({ navigation, route }) {
    const popapRoot = useContext(PopapContext);
    const auth = useContext(AuthContext);
    const chatRoot = useContext(ChatContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [strSearch, setStrSearch] = useState('');

    const newSearch = (text) => {
        setStrSearch(text);
    }

    const getData = async (search) => {
        console.log('ffffffffffff')
        search = search ? `&search=${search}` : '';
        setRefreshing(true);
        try {
            console.log('444-', `${auth.url_str}/mobile/user-chat/index?token=${auth.token}&p=0` + search)
            const data = await request(`${auth.url_str}/mobile/user-chat/index?token=${auth.token}&p=0` + search, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setData(data.data);
        } catch(e) {
            // console.log('eerr-', e)
        }
        setRefreshing(false);
    }

    const paginashion = async () => {
        setRefreshing(true);
        try {
            const data = await request(`${auth.url_str}/mobile/user-chat/index?token=${auth.token}&p=${page+1}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setPage(page+1);
            setData(data.data);
        } catch(e) {}
        setRefreshing(false);
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
        if (navigation.getState()['routes'][navigation.getState()['index']].name === "Chat") return true;
        return false;
    });

    useEffect(() => {
        getData();
    }, []);

    const menuHeaderHandler = (data) => {
        switch(data.label) {
            case 'Настройка таблицы':
                return navigation.navigate('SettingTabl')
        }
    }

    const searchHandler = () => {
        getData(strSearch);
    }

    const itemHandler = (item) => {
        navigation.navigate({name: 'Dealog', params: {data: item.item}});
    }

    return (
        <>
        <Popap />
        <View style={styles.body}>
            <View style={styles.coll}>
                <HeaderChat menuHeaderHandler={menuHeaderHandler} />
                <View style={styles.header_search}>
                    <Search value={strSearch} setStrSearch={newSearch} searchHandler={searchHandler}/>
                </View>
            </View>
            <FlatList 
                refreshControl={
                    <RefreshControl
                        refreshing={Refreshing}
                        onRefresh={() => getData()}
                        colors={[Colors.Orange]}
                    />
                }
                style={styles.scrollView} 
                contentContainerStyle={{paddingBottom: 120, paddingLeft: 21}} 
                data={data}
                renderItem={(item, index) => (
                    <>
                        <ItemChat data={item} itemHandler={itemHandler} />
                        {item.index !== data?.length - 1 ? <View style={styles.hr} />: null}
                    </>
                )}
                keyExtractor={item => item.id}
                onEndReached={() => paginashion()}
                onEndReachedThreshold={0.3}
            />
            <Menu navigation={navigation} noActive={true}/>
        </View>
        </>
    );
}

export default ChatScreen;

