import {createContext} from "react";

function noop(){}

export const ChatContext = createContext({
    profile: null,
    data_chat: null,
    meassages: null,
    refresh: null,
    getMeassages: noop,
    openChat: noop,
    exitChat: noop,
    sendMeassage: noop,
    addMeassage: noop,
    paginashion: noop,
});