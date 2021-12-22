import {useContext} from "react";
import {MenuContext} from "../context/MenuContext";

export const useMenu = () => useContext(MenuContext);