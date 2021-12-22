import {useContext} from "react";
import {DataContext} from "../context/DataContext";

export const useData = () => useContext(DataContext);