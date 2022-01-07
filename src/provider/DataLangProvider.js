import React, {useState, useContext, useEffect} from "react";
import { DataLangContext } from '../context/DataLangContext';
import { AuthContext } from "../context/authContext";
import {useHttp} from "../hooks/http.hook";


export const DataLangProvider = ({children, ...props}) => {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [data, setData] = useState(null);
    const [render, setRender] = useState(false);

    const newData = (new_data) => {
        setData(new_data);
    }

    const newRender = () => {
        setRender(!render);
    }

    const getRoot = async () => {
        try {
            console.log('polll')
            const data_new = await request(`${auth.url_str}/mobile/default/get-lang-const`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            console.log('1111-', data_new)
            setData(data_new);
        } catch (e) {}
    };

    useEffect(() => {
        getRoot();
    }, [render])

    return <DataLangContext.Provider
        value={{
            data,
            getRoot,
            newRender,
            newData,
        }}
        {...props}
    >
        {children}
    </DataLangContext.Provider>
}