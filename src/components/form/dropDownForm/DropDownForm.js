import React, {useState, useContext, useEffect} from 'react';
import {
    Text,
    View,
    Pressable,
    TouchableOpacity
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';
import { PopapContext } from "../../../context/PopapContext";


export const DropDownForm = ({ data }) => {
    console.log('----', data.lang)
    const popapRoot = useContext(PopapContext);
    
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (data.pik) {
            setValue(data.pik);
        } else {
            setValue(data.value ? (data.value[data.name] ? {label: data.value[data.name], value: data.value[data.name]} : null) : null);
        }
    }, [data.value, data.pik]);

    const itemHandler = (item) => {
        setValue(item);
        popapRoot.exitHandler();
        if (data.pik) {
            data.change(item)
        } else {
            data.change({name: data?.name, value: item?.value}, data?.index);
        }
    }

    const DataPopap = (
        <>
            <TouchableOpacity
            style={styles.button_item}
            onPress={() => itemHandler({value: null})}
            >
                {value === null ? (<GlobalSvgSelector id='check' />) : (<View style={styles.block_defoult} />)}
                <Text style={[GlobalStyle.CustomFontRegular, styles.item]}>{data?.lang ? data?.lang['Выберите'] : "Выберите"}</Text>
            </TouchableOpacity>
            <View style={data?.data?.length !== 0 ? styles.hr : null} />
            
            {data?.data?.map((item, index) => (
                <>
                <TouchableOpacity
                style={styles.button_item}
                onPress={() => itemHandler(item)}
                >
                    {value?.label === item?.label ? (<GlobalSvgSelector id='check' />) : (<View style={styles.block_defoult} />)}
                    <Text style={[GlobalStyle.CustomFontRegular, styles.item]}>{item.label}</Text>
                </TouchableOpacity>
                <View style={index !== data?.data?.length - 1 ? styles.hr : null} />
                </>
            ))}
        </>
    );

    const openPopap = () => {
        popapRoot.dataChange(DataPopap);
        popapRoot.openHandler();
    }

    return (
        <View style={styles.root}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>
        <Pressable 
        style={[styles.input, data?.styles ? data.styles : null ]} 
        onPress={() => openPopap()}
        >
            <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>{value ? value.label : (data?.lang ? data?.lang['Выберите'] : "Выберите")}</Text>
            <GlobalSvgSelector id='arrow_items' />
        </Pressable>
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
            {data.error}
        </Text> : null}
        </View>
    );
}

