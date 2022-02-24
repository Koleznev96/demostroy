import {createContext} from "react";

function noop(){}

export const SettingDataContext = createContext({
    refresh: null,
    form: null,
    data: null,
    action: null,
    url: null,
    backTo: null,
    data_dop: null,
    title: null,
    filter: null,
    backTo_r: null,
    data_dop_r: null,
    vilkt: null,
    setVilkt: noop,
    setBackTo_r: noop,
    addFilter: noop,
    setTitle: noop,
    setUrl: noop,
    getRoot: noop,
    newRender: noop,
    clearData: noop,
    setBackTo: noop,
    paginashion: noop,
    setData: noop,
});