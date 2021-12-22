import {useState, useCallback, useEffect, useContext} from 'react';
import {AsyncStorage} from 'react-native';
import {useHttp} from "./http.hook";
import { MenuContext } from '../context/MenuContext';

const storageName = 'JWT';

export const useAuth = () => {
    const menuRoot = useContext(MenuContext);
    const [token, setToken] = useState(null);
    const [url_str, set_url_str] = useState(null);
    const [ready, setReady] = useState(false);
    const {loading, request, error, clearError} = useHttp();
    const [lenguage, setLenguage] = useState({});

    const updateLenguage = (data) => {
        const setting = JSON.stringify(data);
        AsyncStorage.setItem("LANG", setting);
        setLenguage(data);
    }

    const login = useCallback((jwtToken) => {
        setToken(jwtToken);
        AsyncStorage.setItem("JWT", jwtToken);
    }, []);

    const logUrl = useCallback((url, status) => {
        if (!status) {
            for (let i = 0; i < menuRoot.listMenu?.length; i++) {
                AsyncStorage.removeItem(menuRoot.listMenu[i]?.url[0]);
            }
        }
        set_url_str(url);
        AsyncStorage.setItem("URL", url);
    }, []);

    const logout = useCallback(async()=> {
        setToken(null);
        await AsyncStorage.removeItem("JWT");
    }, []);

    const fullLogout = useCallback(async()=> {
        for (let i = 0; i < menuRoot.listMenu?.length; i++) {
            await AsyncStorage.removeItem(menuRoot.listMenu[i]?.url[0]);
        }
        
        setToken(null);
        set_url_str(null);
        await AsyncStorage.removeItem("JWT");
        await AsyncStorage.removeItem("URL");
    }, []);

    useEffect( async () => {
        const jwt = await AsyncStorage.getItem("JWT");
        const url = await AsyncStorage.getItem("URL");
        // await AsyncStorage.removeItem("LANG");
        const lang = await AsyncStorage.getItem("LANG");
        if (lang) {
            const data = await JSON.parse(lang);
            setLenguage(data);
        } else {
            updateLenguage({
                label: "Русский",
                value: "ru"
            });
        }
        if (url) {
            logUrl(url, true);
        }
        if (jwt) {
            login(jwt);
        }
        setReady(true);
    }, [login]);


    return { login, logUrl, logout, fullLogout, lenguage, updateLenguage, token, ready, url_str };
}