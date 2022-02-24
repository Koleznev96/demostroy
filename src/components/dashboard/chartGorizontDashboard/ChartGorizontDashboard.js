import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { MainIcon  } from '../../mainIcon/MainIcon';


export const ChartGorizontDashboard = ({data, getData, clear_get}) => {
    const [buttonActive, setButtonActive] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [data_get, set_data_get] = useState({});

    useEffect(() => {
        set_data_get({});
    }, [clear_get]);

    // const addDataGet = (name, value) => {
    //     let new_data_get_obj = {...data_get, [name]: value};
    //     let new_data_get = '';
    //     Object.entries(new_data_get_obj).forEach(item => {
    //         new_data_get += `${item[0]}=${item[1]}&`;
    //     });
    //     getData(new_data_get.slice(0, new_data_get.length - 1), 'chart_gorizont');
    //     set_data_get({...new_data_get_obj});
    // }

    const buttonActiveHandler = (status) => {
        // console.log('555-', `chart_gorizont_button=${status === 0 ? "one" : "two"}`)
        getData(`chart_gorizont_button=${status === 0 ? "one" : "two"}`, 'chart_gorizont');
        // setButtonActive(status);
        // addDataGet('chart_gorizont_button', status === 0 ? "one" : "two");
    }

    useEffect(() => {
        if (data) {
            let max = data?.series[0].data;
            data?.series?.forEach(element => {
                if (element.data > max) max = element.data;
            });
            setMaxValue(max);
        }
    }, [data])

    return (
        <>
        <View style={styles.wrapper}>
            <Text
            style={[
                GlobalStyle.CustomFontRegular,
                styles.block_label
            ]}
            >
                {data?.label}
            </Text>
            <View style={styles.wrapper_buttons}>
                <TouchableOpacity
                // style={{...styles.button, backgroundColor: data ? data['0']?.color : null}}
                style={[styles.button, {backgroundColor: data?.button['0']?.color}]}
                onPress={() => buttonActiveHandler(0)}
                >
                    <MainIcon name={data?.button['0']?.icon} size={21} color={'#F7F8F9'} />
                </TouchableOpacity>
                <TouchableOpacity
                // style={{...styles.button, backgroundColor: data ? data['1']?.color : null}}
                style={[styles.button, {backgroundColor: data?.button['1']?.color}]}
                onPress={() => buttonActiveHandler(1)}
                >
                    <MainIcon name={data?.button['1']?.icon} size={21} color={'#232532'} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.block_chart}>
            {data?.series?.map((item, index) => (
                <View style={styles.chart_item}>
                    <Text
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.chart_item_label
                    ]}
                    >
                        {item?.name}
                    </Text>
                    <View style={{...styles.chart_item_liner, width: `${(item?.data * 100) / maxValue}%`, backgroundColor: item.color}}>
                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.chart_item_value
                        ]}
                        >
                            {item?.data + ' ₽'}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
        </>
    );
}