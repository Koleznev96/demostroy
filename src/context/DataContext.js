import {createContext} from "react";

function noop(){}

export const DataContext = createContext({
    form: null,
    data: null,
    action: null,
    filter: null,
    settingTabl: null,
    settingActiveTabl: null,
    editSettingTabl: noop,
    addFilter: noop,
    getRoot: noop,
    newRender: noop,
    paginashion: noop,
    editActiob: noop,
});