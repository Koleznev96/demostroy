import React, {useState, useContext, useEffect} from "react";
import {Vibration} from 'react-native';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from "../context/authContext";
import {useHttp} from "../hooks/http.hook";

import PushNotification from "react-native-push-notification";


export const ChatProvider = ({children, ...props}) => {
    const auth = useContext(AuthContext);
    const [data_chat, setData_chat] = useState(null);
    const [meassages, setMeassages] = useState(null);
    const {loading, request, error, clearError} = useHttp();
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(0);
    const [stopPagination, setStopPagination] = useState(false);
    const [runLoading, setRunLoading] = useState(0);
    const [refNotification, setRefNotification] = useState(null);

    const [Refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(null);
    const [pageRoot, setPageRoot] = useState(0);
    const [strSearch, setStrSearch] = useState('');
    const [stopPaginationRoot, setStopPaginationRoot] = useState(false);
    const [myId, setMyId] = useState(null);

    const newSearch = (text) => {
        setStrSearch(text);
    }
    //https://demostroy.mir-crm.com/mobile/chat/ (https://demostroy.mir-crm.com/mobile/chat/set-token?token=sdasd)get-my-id
    const getMyId = async () => {
        try {
            // console.log('my-id-url- ', `${auth.url_str}/mobile/chat/get-my-id?token=${auth.token}`)
            const data = await request(`${auth.url_str}/mobile/chat/get-my-id?token=${auth.token}`, 'GET', null, {
                "Authorization": auth.token
            });
            // console.log('my-id- ', data)
            setMyId(data);
        } catch(e) {}
    }

    const getDataRoot = async (search) => {
        setPageRoot(0);
        search = search ? search : '';
        if (!search.length) setStrSearch('');
        setRefreshing(true);
        let filter = strSearch ? (strSearch.length ? `&search=${strSearch}`: ""): "";
        try {
            const data = await request(`${auth.url_str}/mobile/chat/index?token=${auth.token}${filter}`, 'POST', {
                "limit": 20,
                "offset": 0,
                "sort": "best",
                "search": search,
            }, {
                "Authorization": auth.token
            });
            setData(data.data);
            if (data.data?.length < 20) setStopPaginationRoot(true);
        } catch(e) {
        }
        setRefreshing(false);
    }

    useEffect(() => {
        console.log('mmmm')
        if (auth.token) {
            getMyId();
            getDataRoot();
        }
    }, [auth.token])

    const paginashionRoot = async () => {
        if (stopPaginationRoot) return;
        setRefreshing(true);
        let filter = strSearch ? (strSearch.length ? `&search=${strSearch}`: ""): "";
        try {
            const answer = await request(`${auth.url_str}/mobile/chat/index?token=${auth.token}${filter}&p=${pageRoot+1}`, 'POST', {
                "limit": 20,
                "offset": pageRoot * 20,
                "sort": "best",
                "search": strSearch,
            }, {
                "Authorization": auth.token
            });
            setPageRoot(pageRoot+1);
            const new_data = data.concat(answer?.data);
            setData(new_data);
            if (answer.data?.length < 20) setStopPaginationRoot(true);
        } catch(e) {}
        setRefreshing(false);
    }



    const getMeassages = async (id) => {
        setPage(0);
        setStopPagination(false);
        setRefresh(true);
        try {
            // console.log('nnn-url- ', `${auth.url_str}/mobile/chat/history?token=${auth.token}&user_id=${id ? id : data_chat.id}`)
            const data = await request(`${auth.url_str}/mobile/chat/history?token=${auth.token}&user_id=${id ? id : data_chat.id}`, 'GET', null, {
                "Authorization": auth.token
            });
            // console.log('nnn-', data)
            setMeassages(data?.data);
            if (data.data?.length < 20) setStopPagination(true);
        } catch (e) {
            // console.log('mmm-', e)
        }
        setRefresh(false);
    };

    const paginashion = async () => {
        if (stopPagination) return;
        // setRefresh(true);
        try {
            // console.log('paginashion-url- ', `${auth.url_str}/mobile/chat/history?token=${auth.token}&user_id=${data_chat.id}&p=${page+1}`)
            const data = await request(`${auth.url_str}/mobile/chat/history?token=${auth.token}&user_id=${data_chat.id}&p=${page+1}`, 'GET', null, {
                "Authorization": auth.token
            });
            // console.log('paginashion-data- ', data);
            setPage(page+1);
            const new_data = meassages.concat(data?.data);
            setMeassages(new_data);
            if (data.data?.length < 20) setStopPagination(true);
        } catch(e) {
            // console.log('paginashion-err- ', e);
        }
    }

    const openChat = (data) => {
        setData_chat({...data});
        getMeassages(data.id);
    }

    const exitChat = async () => {
        setPage(0);
        setMeassages(null);
        setData_chat(null);
    };

    const sendMeassage = async (text) => {
        let new_meassages = [...meassages];
        new_meassages.unshift({
            "id": text,
            "text": text,
            "type": "OUT",
            "profile_id": 23796,
            "project_id": 543,
            "platform": "TELEGRAM",
            "created_at": new Date(),
            "sender_id": myId.result,
        });
        setMeassages(new_meassages);
        try {
            // console.log('send-url- ', `${auth.url_str}/mobile/chat/send`)
            const data = await request(`${auth.url_str}/mobile/chat/send`, 'POST', {
                "token": auth.token,
                "text": text,
                "user_id": data_chat.id
            }, {
                "Authorization": auth.token
            });
            // console.log('send-ok- ', data)
        } catch(e) {
            // console.log('send-err- ', e)
        }
    }

    const addMeassage = (notification) => {
        if (data_chat && notification && notification?.data && String(notification?.data?.profile_id) === String(data_chat?.id)) {
            getMeassages(data_chat?.id);
        } else {
            if (data_chat) {
                // PushNotification.localNotificationSchedule({
                //     //... You can use all the options from localNotifications
                //     title: notification.metitlessage ? notification.title : "Новое сообщение",
                //     message: notification.message ? notification.message : "Новое сообщение", // (required)
                //     date: new Date(), // in 1 secs
                //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
                    
                //     /* Android Only Properties */
                //     repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
                // });
            }
        }
        getDataRoot();
    }

    useEffect(() => {
        console.log('gggggg')
        if (refNotification) addMeassage(refNotification);
    }, [refNotification]);

    return <ChatContext.Provider
        value={{
            data_chat,
            meassages,
            refresh,
            runLoading,
            getMeassages,
            openChat,
            exitChat,
            sendMeassage,
            addMeassage,
            paginashion,
            getDataRoot,
            paginashionRoot,
            strSearch,
            newSearch,
            Refreshing,
            data,
            refNotification,
            setRefNotification,
            setData,
            myId
        }}
        {...props}
    >
        {children}
    </ChatContext.Provider>
}