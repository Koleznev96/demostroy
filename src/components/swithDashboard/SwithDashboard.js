import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import { PopapContext } from "../../context/PopapContext";


export const SwithDashboard = ({ listSwith, swithCurrent, swithDashboardHandler }) => {
    const popapRoot = useContext(PopapContext);

    const itemHandler = (item) => {
        popapRoot.exitHandler();
        swithDashboardHandler(item);
    }

    const DataPopap = () => (
        <>
            {/* <TouchableOpacity
            style={styles.button_item}
            onPress={() => swithDashboardHandler({value: null})}
            >
                {value === null ? (<GlobalSvgSelector id='check' />) : (<View style={styles.block_defoult} />)}
                <Text style={[GlobalStyle.CustomFontRegular, styles.item]}>{"Выберите"}</Text>
            </TouchableOpacity>
            <View style={data?.data?.length !== 0 ? styles.hr : null} /> */}
            {/* <Text style={[GlobalStyle.CustomFontRegular, styles.item]}>rewgwer</Text> */}

            {listSwith?.map((item, index) => (
                <>
                <TouchableOpacity
                style={styles.button_item_l}
                onPress={() => itemHandler(item)}
                >
                    {swithCurrent?.value === item?.value ? (<GlobalSvgSelector id='check' />) : (<View style={styles.block_defoult_l} />)}
                    <Text style={[GlobalStyle.CustomFontRegular, styles.item_l]}>{item.label}</Text>
                </TouchableOpacity>
                <View style={index !== listSwith?.length - 1 ? styles.hr_l : null} />
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
            <TouchableOpacity
            style={styles.button_swith}
            onPress={() => openPopap()}
            >
                <Text
                style={[
                    GlobalStyle.CustomFontRegular,
                    styles.button_swith_text
                ]}
                >
                    {swithCurrent?.label}
                </Text>
                <GlobalSvgSelector id='arrow_items' />
            </TouchableOpacity>
            <View style={styles.hr} />
        </View>
    );
}

