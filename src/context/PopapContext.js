import {createContext} from "react";

function noop(){}

export const PopapContext = createContext({
    isOpen: null,
    data: null,
    openHandler: noop,
    exitHandler: noop,
    dataChange: noop,
});