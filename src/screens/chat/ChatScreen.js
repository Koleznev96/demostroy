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
import { localNotificationService } from '../../LocalNotificationService';
import PushNotification from 'react-native-push-notification';


function ChatScreen({ navigation, route }) {
    const popapRoot = useContext(PopapContext);
    const auth = useContext(AuthContext);
    const chatRoot = useContext(ChatContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);

    const newSearch = (text) => {
        setStrSearch(text);
    }

    // PushNotification.configure({
    //     onRegister: function(token) {
    //         // setFcm_token(token.token, auth.token)
    //         console.log('7777777-', token.token)
    //         // if (!auth.fcmToken) auth.addToken(token.token, auth.token);
    //     }
    // });

    // const getData = async (search) => {
    //     setPage(0);
    //     search = search ? `&search=${search}` : '';
    //     if (!search.length) setStrSearch('');
    //     setRefreshing(true);
    //     try {
    //         console.log('444-', `${auth.url_str}/mobile/user-chat/index?token=${auth.token}&p=0` + search)
    //         const data = await request(`${auth.url_str}/mobile/user-chat/index?token=${auth.token}&p=0` + search, 'GET', null, {
    //             "Api-Language": auth.lenguage.value
    //         });
    //         setData(data.data);
    //         if (data.data?.length < 20) setStopPagination(true);
    //     } catch(e) {
    //         // console.log('eerr-', e)
    //     }
    //     setRefreshing(false);
    // }

    // const paginashion = async () => {
    //     if (stopPagination) return;
    //     setRefreshing(true);
    //     let search = strSearch ? `&search=${strSearch}` : '';
    //     try {
    //         const answer = await request(`${auth.url_str}/mobile/user-chat/index?token=${auth.token}&p=${page+1}` + search, 'GET', null, {
    //             "Api-Language": auth.lenguage.value
    //         });
    //         setPage(page+1);
    //         const new_data = data.concat(answer?.data);
    //         setData(new_data);
    //         if (answer.data?.length < 20) setStopPagination(true);
    //     } catch(e) {}
    //     setRefreshing(false);
    // }

    BackHandler.addEventListener('hardwareBackPress', () => {
        console.log('111111')
        if (navigation.getState()['routes'][navigation.getState()['index']].name === "Chat") return true;
        return false;
    });

    // useEffect(() => {
    //     getData();
    // }, []);

    const menuHeaderHandler = (data) => {
        switch(data.label) {
            case 'Настройка таблицы':
                return navigation.navigate('SettingTabl')
        }
    }

    const searchHandler = () => {
        console.log('22222')
        chatRoot.getDataRoot(chatRoot.strSearch);
    }

    const itemHandler = (item) => {
        console.log('33333')
        let new_data = [...chatRoot.data];
        new_data[item.index].count_new_messages = 0;
        chatRoot.setData(new_data)
        navigation.navigate({name: 'Dealog', params: {data: item.item, index: item.index}});
    }



    const newChangeNotification = async(notify) => {
        console.log('444444')
        // addMeassage(notify);
        // console.log('6666-------------------', chatRoot.data_chat)
        chatRoot.setRefNotification(notify);
        // chatRoot.addMeassage(notify, chatRoot.data_chat);
    }
    
      // const newNotification = (notification) => {
      //   console.log('ttttttttttttt')
      //   chatRoot.addMeassage(notification);
      // }
    
    useEffect(() => {
        console.log('555555')
        localNotificationService.configure(newChangeNotification);
    }, []); 

    return (
        <>
        <Popap />
        <View style={styles.body}>
            <View style={styles.coll}>
                {/* <HeaderChat menuHeaderHandler={menuHeaderHandler} /> */}
                <View style={styles.header_search}>
                    <Search value={chatRoot.strSearch} setStrSearch={chatRoot.newSearch} searchHandler={searchHandler}/>
                </View>
            </View>
            <FlatList 
                refreshControl={
                    <RefreshControl
                        refreshing={chatRoot.Refreshing}
                        onRefresh={() => chatRoot.getDataRoot()}
                        colors={[Colors.Orange]}
                    />
                }
                style={styles.scrollView} 
                contentContainerStyle={{paddingBottom: 120, paddingLeft: 21, paddingTop: 5,}} 
                data={chatRoot.data}
                renderItem={(item, index) => (
                    <>
                        <ItemChat data={item} itemHandler={itemHandler} />
                        {item.index !== chatRoot.data?.length - 1 ? <View style={styles.hr} />: null}
                    </>
                )}
                keyExtractor={item => item.id}
                // onEndReached={() => chatRoot.paginashionRoot()}
                // onEndReachedThreshold={0.3}
            />
            <Menu navigation={navigation} noActive={true}/>
        </View>
        </>
    );
}

export default ChatScreen;

