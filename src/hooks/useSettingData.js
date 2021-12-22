import {useContext} from "react";
import {SettingDataContext} from "../context/SettingDataContext";

export const useSettingData = () => useContext(SettingDataContext);