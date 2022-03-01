import React, {useState, useContext, useEffect} from "react";
import {AsyncStorage} from 'react-native';
import { ChatContext } from '../context/ChatContext';
import { MenuContext } from '../context/MenuContext';
import { AuthContext } from "../context/authContext";
import {useHttp} from "../hooks/http.hook";


export const ChatProvider = ({children, ...props}) => {
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const [profile, setProfile] = useState(null);
    const [data_chat, setData_chat] = useState(null);
    const [meassages, setMeassages] = useState(null);
    const [render, setRender] = useState(false);
    const {loading, request, error, clearError} = useHttp();
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(0);

    const getMeassages = async (id) => {
        setPage(0);
        setRefresh(true);
        try {
            console.log('444-', `${auth.url_str}/mobile/user-chat/history?user_id=${id ? id : data_chat}&token=${auth.token}&p=0`)
            const data = await request(`${auth.url_str}/mobile/user-chat/history?user_id=${id ? id : data_chat}&token=${auth.token}&p=0`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setMeassages(data?.data);
        } catch (e) {}
        setRefresh(false);
    };

    const paginashion = async () => {
        console.log('8888')
        setRefreshing(true);
        try {
            const data = await request(`${auth.url_str}/mobile/user-chat/history?user_id=${id ? id : data_chat}&token=${auth.token}&p=${page+1}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setPage(page+1);
            setMeassages(data?.data);
        } catch(e) {}
        setRefreshing(false);
    }

    const openChat = (data) => {
        setData_chat(data);
        getMeassages(data.id);
    };

    useEffect(() => {
        
    }, []);

    const exitChat = async () => {
        setPage(0);
        setMeassages(null);
        setData_chat(null);
    };

    const sendMeassage = (text) => {
        let new_meassages = [...meassages];
        new_meassages.unshift({
            id: 97,
            company_id: 2,
            created_at: "2022-02-27 03:02:42",
            user_id: 68,
            text: text,
        });
        setMeassages(new_meassages);
    }

    const addMeassage = (data) => {

    }

    return <ChatContext.Provider
        value={{
            profile,
            data_chat,
            meassages,
            refresh,
            getMeassages,
            openChat,
            exitChat,
            sendMeassage,
            addMeassage,
            paginashion,
        }}
        {...props}
    >
        {children}
    </ChatContext.Provider>
}