import {useContext} from "react";
import {DataLangContext} from "../context/DataLangContext";

export const useDataLang = () => useContext(DataLangContext);