import React, {useState} from "react";
import { PopapContext } from '../context/PopapContext';


export const PopapProvider = ({children, ...props}) => {
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openHandler = () => {
        setIsOpen(true);
    };

    const exitHandler = () => {
        setIsOpen(false);
    };

    const dataChange = (data_new) => {
        setData(data_new);
    };


    return <PopapContext.Provider
        value={{
            isOpen,
            data,
            openHandler,
            exitHandler,
            dataChange,
        }}
        {...props}
    >
        {children}
    </PopapContext.Provider>
}