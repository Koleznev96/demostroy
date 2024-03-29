import {createContext} from "react";

function noop(){}

export const MenuContext = createContext({
    listMenu: null,
    activeMenu: null,
    menuHandler: noop,
    newRender: noop,
    setPrevMenu: noop,
    prevMenu: null,
});