import React, {useState, useContext, useEffect} from "react";
import { SettingDataContext } from '../context/SettingDataContext';
import { AuthContext } from "../context/authContext";
import {useHttp} from "../hooks/http.hook";


export const SettingDataProvider = ({children, ...props}) => {
    const auth = useContext(AuthContext);
    const [url, set_url] = useState(null);
    const [form, setForm] = useState(null);
    const [data, setData] = useState(null);
    const [action, setAction] = useState(null);
    const [render, setRender] = useState(false);
    const [backTo, set_backTo] = useState(null);
    const [data_dop, set_data_dop] = useState(null);
    const [backTo_r, set_backTo_r] = useState(null);
    const [data_dop_r, set_data_dop_r] = useState(null);
    const [title, setTitle] = useState(null);
    const [type, set_type] = useState(false);
    const {loading, request, error, clearError} = useHttp();
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState(null);
    const [vilkt, setVilkt] = useState(0);

    const addFilter = (data_filter) => {
    }

    const setBackTo = (str, data_set) => {
        set_backTo(str);
        if (data_set) {
            set_data_dop(data_set);
        }
    }

    const setBackTo_r = (str, data_set) => {
        set_backTo_r(str);
        if (data_set) {
            set_data_dop_r(data_set);
        }
    }

    const newRender = () => {
        setRender(!render);
    }

    const setUrl = (url, type) => {
        if (type) {
            set_type(true);
        } else {
            set_type(false);
        }
        set_url(url);
    }

    const getRoot = async () => {
        setForm(null);
        setData(null);
        setAction(null);
        setPage(0);
        let get_filter = '';
        if (filter) {
            get_filter = '&';
            let main_data = Object.entries(filter);
            for (let i = 0; i < main_data.length; i++) {
                get_filter = get_filter + main_data[i][0] + '=' + main_data[i][1] + ((i !==  main_data.length - 1) ? '&' : '');
            }
        }
        try {
            let answer;
            if (type)
                answer = await request(`${auth.url_str}/mobile${url}&token=${auth.token}&p=0` + get_filter, 'GET', null, {
                    "Api-Language": auth.lenguage.value
                });
            else
                answer = await request(`${auth.url_str}/mobile${url}?token=${auth.token}&p=0` + get_filter, 'GET', null, {
                    "Api-Language": auth.lenguage.value
                });
            setData([...answer.data]);
            setForm(answer.form);
            setAction({action_left: answer.action_left, action_right: answer.action_right});
        } catch (e) {}
    }

    useEffect(() => {
        getRoot();
    }, [render, url, filter]);

    const paginashion = async (lol) => {
        if (!lol) {
            setPage(page+1);
        } else {
            setPage(0);
        }

        let get_filter = '';
        if (filter) {
            get_filter = '&';
            let main_data = Object.entries(filter);
            for (let i = 0; i < main_data.length; i++) {
                get_filter = get_filter + main_data[i][0] + '=' + main_data[i][1] + ((i !==  main_data.length - 1) ? '&' : '');
            }
        }

        try {
            let answer;
            if (type)
                answer = await request(`${auth.url_str}/mobile${url}&token=${auth.token}&p=${lol ? 0 : (page+1)}` + get_filter, 'GET', null, {
                    "Api-Language": auth.lenguage.value
                });
            else
                answer = await request(`${auth.url_str}/mobile${url}?token=${auth.token}&p=${lol ? 0 : (page+1)}` + get_filter, 'GET', null, {
                    "Api-Language": auth.lenguage.value
                });
            if (lol) {
                setData(answer.data);
            } else {
                const new_data = data.concat(answer.data)
                setData(new_data);
            }
        } catch (e) {}
    };

    const clearData = () => {
        setData(null);
        setForm(null);
        setAction(null);
    }

    return <SettingDataContext.Provider
        value={{
            form,
            data,
            action,
            url,
            backTo,
            data_dop,
            title,
            filter,
            backTo_r,
            data_dop_r,
            vilkt, 
            setVilkt,
            setBackTo_r,
            addFilter,
            setTitle,
            setUrl,
            getRoot,
            newRender,
            clearData,
            setBackTo,
            paginashion,
            setData,
        }}
        {...props}
    >
        {children}
    </SettingDataContext.Provider>
}