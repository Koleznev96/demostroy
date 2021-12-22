import {useContext} from "react";
import {PopapContext} from "../context/PopapContext";

export const usePopap = () => useContext(PopapContext);