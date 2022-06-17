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
    const [render, setRender] = useState(false);
    const [prevMenu, setPrevMenu] = useState(null);
    const {loading, request, error, clearError} = useHttp();

    const menuHandler = (item) => {
        setPrevMenu(activeMenu);
        setActiveMenu(item);
    };

    const newRender = () => {
        setRender(!render);
    }

    const getMenu = async (url) => {
        try {
            const data = await request(`${url}/mobile/default/get-menu?token=${auth.token}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            // console.log('000-', `${url}/mobile/default/get-menu?token=${auth.token}`)
            data.items.splice(3, 0, item_setting);
            setListMenu(data.items);
            setActiveMenu(data.items[0]);
        } catch (e) {}
    };

    useEffect(() => {
        if (auth.url_str) {
            getMenu(auth.url_str);
        }
    }, [auth.token, render]);

    return <MenuContext.Provider
        value={{
            listMenu,
            activeMenu,
            menuHandler,
            newRender,
            setPrevMenu,
            prevMenu
        }}
        {...props}
    >
        {children}
    </MenuContext.Provider>
}