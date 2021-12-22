import {createContext} from 'react';

function  noop() {}

export const AuthContext = createContext({
    token: null,
    url_str: null,
    login: noop,
    logUrl: noop,
    logout: noop, 
    fullLogout: noop,
    lenguage: null, 
    updateLenguage: noop,
    isAuthenticated: false,
});