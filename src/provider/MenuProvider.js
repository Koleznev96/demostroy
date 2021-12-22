import React, {useState, useContext, useEffect} from "react";
import { MenuContext } from '../context/MenuContext';
import { AuthContext } from "../context/authContext";
import {useHttp} from "../hooks/http.hook";


export const item_setting = {
    label:"Настройки ",
    icon:"fa fa-cog",
    status_const: true,
    url:["/setting"]
}

export const MenuProvider = ({children, ...props}) => {
    const auth = useContext(AuthContext);
    const [listMenu, setListMenu] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const {loading, request, error, clearError} = useHttp();

    const menuHandler = (item) => {
        setActiveMenu(item);
    };

    const getMenu = async (url) => {
        try {
            const data = await request(`${url}/mobile/default/get-menu?token=${auth.token}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            data.items.splice(3, 0, item_setting);
            setListMenu(data.items);
            setActiveMenu(data.items[0]);
        } catch (e) {}
    };

    useEffect(() => {
        if (auth.url_str) {
            getMenu(auth.url_str);
        }
    }, [auth.token]);

    return <MenuContext.Provider
        value={{
            listMenu,
            activeMenu,
            menuHandler
        }}
        {...props}
    >
        {children}
    </MenuContext.Provider>
}