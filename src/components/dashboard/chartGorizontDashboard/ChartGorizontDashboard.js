import React, {useEffect, useState, useContext} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { AuthContext } from "../../../context/authContext";
import { useHttp } from "../../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { MainIcon  } from '../../mainIcon/MainIcon';


export const ChartGorizontDashboard = ({data, clear_get, setRefreshing}) => {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [buttonActive, setButtonActive] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [dataBox, setDataBox] = useState(null);
    const [data_get, set_data_get] = useState({});

    useEffect(() => {
        set_data_get({});
    }, [clear_get]);

    useEffect(() => {
        if (data) {
            setDataBox(data);
        }
    }, [data]);

    const getData = async (data_get, name_block) => {
        setRefreshing(true);
        data_get = data_get ? `&${data_get}` : '';
        console.log('8888-', `${auth.url_str}/mobile/dashboard?token=${auth.token}${data_get}`)
        try {
            const answer = await request(`${auth.url_str}/mobile/dashboard?token=${auth.token}${data_get}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            const new_data = answer.find(item => item.type === name_block);
            setDataBox(new_data);
        } catch(e) {}
        setRefreshing(false);
    }

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
        if (dataBox) {
            let max = dataBox?.series[0].data;
            dataBox?.series?.forEach(element => {
                if (element.data > max) max = element.data;
            });
            setMaxValue(max);
        }
    }, [dataBox])

    return (
        <>
        <View style={styles.wrapper}>
            <Text
            style={[
                GlobalStyle.CustomFontRegular,
                styles.block_label
            ]}
            >
                {dataBox?.label}
            </Text>
            <View style={styles.wrapper_buttons}>
                <TouchableOpacity
                // style={{...styles.button, backgroundColor: data ? data['0']?.color : null}}
                style={[styles.button, {backgroundColor: dataBox?.button['0']?.color}]}
                onPress={() => buttonActiveHandler(0)}
                >
                    <MainIcon name={dataBox?.button['0']?.icon} size={21} color={'#F7F8F9'} />
                </TouchableOpacity>
                <TouchableOpacity
                // style={{...styles.button, backgroundColor: data ? data['1']?.color : null}}
                style={[styles.button, {backgroundColor: dataBox?.button['1']?.color}]}
                onPress={() => buttonActiveHandler(1)}
                >
                    <MainIcon name={dataBox?.button['1']?.icon} size={21} color={'#232532'} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.block_chart}>
            {dataBox?.series?.map((item, index) => (
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