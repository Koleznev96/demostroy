import React, {useState, useContext, useEffect} from "react";
import {AsyncStorage} from 'react-native';
import { DataContext } from '../context/DataContext';
import { MenuContext } from '../context/MenuContext';
import { AuthContext } from "../context/authContext";
import {useHttp} from "../hooks/http.hook";


export const DataProvider = ({children, ...props}) => {
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const [form, setForm] = useState(null);
    const [data, setData] = useState(null);
    const [action, setAction] = useState(null);
    const [render, setRender] = useState(false);
    const {loading, request, error, clearError} = useHttp();
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState(null);
    const [settingTabl, setSettingTabl] = useState(null);
    const [settingActiveTabl, setSettingActiveTabl] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const addFilter = (data_filter) => {
        setFilter(data_filter);
    }

    const newRender = () => {
        setRender(!render);
    }

    const getSettingTabl = async (form) => {
        // await AsyncStorage.removeItem(menuRoot.activeMenu.url[0]);
        const setting = await AsyncStorage.getItem(menuRoot.activeMenu.url[0]);
        if (setting) {
            const data = await JSON.parse(setting);
            setSettingTabl(data);
            let data_active = [];
            for (let i = 0; i < data.length; i++) {
                let new_liner = []
                if (data[i][0].status) {
                    new_liner.push(data[i][0]);
                }
                if (data[i][1] && data[i][1].status) {
                    new_liner.push(data[i][1]);
                }
                if (new_liner.length !== 0)
                data_active.push(new_liner);
                // if (data[i][0].status || (data[i][1] && data[i][1].status)) {
                //     data_active.push(data[i]);
                // }
            }
            setSettingActiveTabl(data_active);
        } else {
            if (menuRoot.activeMenu.url[0] !== '/setting') {
                // Создаем настройки таблицы
                let data = [];
                for (let i = 0; i < form.length; i++) {
                    data.push([{
                        label: form[i].label,
                        name: form[i].name,
                        status: true,
                    }]);
                }
                // const data = form.map(async (item, index) => {
                //     return 
                // });
                setSettingTabl(data);
                setSettingActiveTabl(data);
                const setting = await JSON.stringify(data);
                await AsyncStorage.setItem(menuRoot.activeMenu.url[0], setting);
            }
        }
    }

    const getRoot = async () => {
        // console.log('vvv-111');
        setRefresh(true);
        setForm(null);
        setData(null);
        setAction(null);
        setPage(0);
        let get_filter = '';
        // console.log('vvv-222');
        if (filter) {
            get_filter = '&';
            let main_data = Object.entries(filter);
            for (let i = 0; i < main_data.length; i++) {
                get_filter = get_filter + main_data[i][0] + '=' + main_data[i][1] + ((i !==  main_data.length - 1) ? '&' : '');
            }
        }
        // console.log('vvv-333');
        try {
            console.log('vvv-url:', `${auth.url_str}/mobile${menuRoot.activeMenu.url[0]}/index?token=${auth.token}&p=0` + get_filter);
            const data = await request(`${auth.url_str}/mobile${menuRoot.activeMenu.url[0]}/index?token=${auth.token}&p=0` + get_filter, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            // console.log('vvv-data:', data);
            // console.log('vvv-form:', form);
            setData(data?.data);
            setForm(data?.form);
            setAction({action_left: data?.action_left, action_right: data?.action_right});
            getSettingTabl(data?.form);
        } catch (e) {
            // console.log('vvv-err:', e)
        }
        setRefresh(false);
    };

    const editSettingTabl = async (data) => {
        const setting = await JSON.stringify(data);
        await AsyncStorage.setItem(menuRoot.activeMenu.url[0], setting);
        setSettingTabl(data);
        let data_active = [];
        for (let i = 0; i < data.length; i++) {
            let new_liner = []
            if (data[i][0].status) {
                new_liner.push(data[i][0]);
            }
            if (data[i][1] && data[i][1].status) {
                new_liner.push(data[i][1]);
            }
            if (new_liner.length !== 0)
            data_active.push(new_liner);
            // if (data[i][0].status || (data[i][1] && data[i][1].status)) {
            //     data_active.push(data[i]);
            // }
        }
        setSettingActiveTabl(data_active);
    };

    useEffect(() => {
        // console.log('----', menuRoot.activeMenu, render, filter)
        getRoot();
        // getSettingTabl();
    }, [menuRoot.activeMenu, render, filter]);

    const paginashion = async (lol) => {
        if (lol === true) {
            setRefresh(true);
            setPage(0);
        } else {
            setPage(page+1);
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
            const answer = await request(`${auth.url_str}/mobile${menuRoot.activeMenu.url[0]}/index?token=${auth.token}&p=${lol ? 0 : (page+1)}` + get_filter, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            if (lol) {
                setData(answer.data);
            } else {
                const new_data = data.concat(answer.data)
                setData(new_data);
            }
            setForm(answer?.form);
            setAction({action_left: answer?.action_left, action_right: answer?.action_right});
            getSettingTabl(answer.form);
        } catch (e) {}
        setRefresh(false);
    };

    const editActiob = (def) => {
        setAction(editActiob);
    }

    return <DataContext.Provider
        value={{
            refresh,
            form,
            data,
            action,
            filter,
            settingTabl,
            settingActiveTabl,
            editSettingTabl,
            addFilter,
            getRoot,
            newRender,
            paginashion,
            editActiob,
        }}
        {...props}
    >
        {children}
    </DataContext.Provider>
}