import React, {useState, useContext, useEffect} from 'react';
import {
    Text,
    View,
    Pressable,
    TouchableOpacity
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { MenuSvgSelector } from '../../../assets/MenuSvgSelector';
import { PopapContext } from "../../../context/PopapContext";
import {InputForm} from "../inputForm/InputForm";
import {NumberForm} from "../numberForm/NumberForm";
import {DropDownForm} from "../dropDownForm/DropDownForm";
import {DateForm} from "../dateForm/DateForm";
import {TextForm} from "../textForm/TextForm";
import {BooksForm} from "../booksForm/BooksForm";


export const MultipleForm = ({ data }) => {
    const popapRoot = useContext(PopapContext);
    const [status, setStatus] = useState(false);

    const changeRoot = (data_p, index) => {
        let new_data = Object.entries(data.value[data.name] ? data.value[data.name][index] : null);
        let answer = {};
        let flag = true;
        new_data.forEach((item) => {
            if (item[0] === data_p.name) {
                answer[item[0]] = data_p.value;
                flag = false;
            }
            else answer[item[0]] = item[1];
        });
        if (flag) {
            answer[data_p.name] = data_p.value;
        }
        let new_fin = data.value[data.name]
        new_fin.splice(index, 1, answer);
        data.change({name: data.name, value: new_fin});
    };

    const renderGetInput = ({data}, index) => {
        if (data.type === 'input') return <InputForm data={{...data, change: changeRoot, value: data.value ? (data.value[data.name] ? data.value[data.name][index] : '') : '', index}}/>;
        if (data.type === 'number') return <NumberForm data={{...data, change: changeRoot, value: data.value ? (data.value[data.name] ? data.value[data.name][index] : '') : '', index}}/>;
        if (data.type === 'dropdown') return <DropDownForm data={{...data, change: changeRoot, value: data.value ? (data.value[data.name] ? data.value[data.name][index] : '') : '', index}}/>;
        if (data.type === 'date') return <DateForm data={{...data, change: changeRoot, value: data.value ? (data.value[data.name] ? data.value[data.name][index] : '') : '', index}}/>;
        if (data.type === 'text') return <TextForm data={{...data, change: changeRoot, value: data.value ? (data.value[data.name] ? data.value[data.name][index] : '') : '', index}}/>;
        if (data.type === 'books') return <BooksForm data={{...data, change: changeRoot, value: data.value ? (data.value[data.name] ? data.value[data.name][index] : '') : '', index}}/>;
        return null;
    }

    return (
        <View style={styles.root}>
        <View style={styles.liner}>
            <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>

            {!status ? (<TouchableOpacity 
            style={styles.circle}
            onPress={() => {setStatus(true); data.change({name: data.name, value: [{}]});}}
            >
                <MenuSvgSelector id='plus' />
            </TouchableOpacity>) : null}
        </View>
        {data?.value ? (data?.value[data.name]?.map((item_lin, index) => (
            <View style={styles.cont_root}>
                {data?.data?.map((item) => {
                    return renderGetInput({data: item}, index);
                })}
            </View>
        ))) : null}
        {data?.value ? (data?.value[data.name]?.length ? (
        <TouchableOpacity 
        style={styles.button}
        onPress={() => {
            // let new = data.value[data.name]
            data.change({name: data.name, value: data.value[data.name] ? [...data.value[data.name], {}] : []});
        }}
        >
            <Text style={[GlobalStyle.CustomFontRegular, styles.button_add]}>Добавить {data.label}</Text>
        </TouchableOpacity>
        ) : null) : null}
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
                {data.error}
        </Text> : null}
        </View>
    );
}

