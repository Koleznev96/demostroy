import {createContext} from "react";

function noop(){}

export const DataLangContext = createContext({
    data: null,
    getRoot: noop,
    newRender: noop,
    newData: noop,
});