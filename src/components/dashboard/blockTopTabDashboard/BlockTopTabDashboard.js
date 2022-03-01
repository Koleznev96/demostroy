import React, {useEffect, useState, useContext} from 'react';
import {
    Text,
    View,
} from 'react-native';
import { AuthContext } from "../../../context/authContext";
import { useHttp } from "../../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { MainIcon } from '../../mainIcon/MainIcon';
import {SwithDashboard} from '../../swithDashboard/SwithDashboard';


export const BlockTopTabDashboard = ({data, clear_get, setRefreshing}) => {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [swithCurrent, setSwithCurrent] = useState(null);
    const [buttonActive, setButtonActive] = useState(0);
    const [data_get, set_data_get] = useState({});
    const [dataBox, setDataBox] = useState(null);

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

    const addDataGet = (name, value) => {
        let new_data_get_obj = {...data_get, [name]: value};
        let new_data_get = '';
        Object.entries(new_data_get_obj).forEach(item => {
            new_data_get += `${item[0]}=${item[1]}&`;
        });
        getData(new_data_get.slice(0, new_data_get.length - 1), 'blok_top_tab');
        set_data_get({...new_data_get_obj});
    }

    const swithDashboardHandler = (index) => {
        setSwithCurrent(index);
        addDataGet('blok_top_tab_data', index.value);
    }

    const buttonActiveHandler = () => {
        setButtonActive(buttonActive == 0 ? 1 : 0);
    }

    useEffect(() => {
        if (dataBox) setSwithCurrent(dataBox?.select?.data[0]);
    }, [dataBox]);

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
        </View>
        <View style={{paddingRight: 20, marginBottom: 15, marginTop: 14,}}>
            <SwithDashboard listSwith={dataBox?.select?.data} swithCurrent={swithCurrent} swithDashboardHandler={swithDashboardHandler} />
        </View>
        {dataBox?.list?.map((item, index) => (
            <>
            <View style={styles.list_item}>
                <View style={styles.liner}>
                    <MainIcon name={item?.icon} size={19} color={item?.color} />
                    <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.liner_label,
                        ]}
                        >
                            {item?.label}
                    </Text>
                </View>
                <View style={styles.wrapper}>
                    <View style={styles.wrapper_column}>
                        <Text
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.up_text,
                            ]}
                            >
                                {item?.up_left}
                        </Text>
                        <Text
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.down_text,
                            ]}
                            >
                                {item?.down_left}
                        </Text>
                    </View>
                    <View style={styles.wrapper_column}>
                        <Text
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.up_text,
                            ]}
                            >
                                {item?.up_right}
                        </Text>
                        <Text
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.down_text,
                            ]}
                            >
                                {item?.down_right}
                        </Text>
                    </View>
                </View>
            </View>
            {dataBox?.list?.length - 1 !== index ? <View style={styles.hr} /> : null}
            </>
        ))}
        </>
    );
}