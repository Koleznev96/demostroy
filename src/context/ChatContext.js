import {createContext} from "react";

function noop(){}

export const ChatContext = createContext({
    data_chat: null,
    meassages: null,
    refresh: null,
    runLoading: null,
    // getMeassages: noop,
    openChat: noop,
    exitChat: noop,
    sendMeassage: noop,
    addMeassage: noop,
    paginashion: noop,
    fig: noop,
    getDataRoot: noop,
    paginashionRoot: noop,
    strSearch: null,
    newSearch: noop,
    Refreshing: null,
    data: null,
    refNotification: null,
    setRefNotification: noop,
    setData: noop,
    myId: null,
});