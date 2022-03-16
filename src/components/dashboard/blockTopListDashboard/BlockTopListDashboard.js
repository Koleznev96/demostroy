import React, {useState, useEffect, useContext} from 'react';
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
import {Colors} from "../../../utils/Colors";


export const BlockTopListDashboard = ({data, clear_get, setRefreshing}) => {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [swithCurrent, setSwithCurrent] = useState(0);
    const [status, setStatus] = useState(false);
    const [buttonActive, setButtonActive] = useState(0);
    const [data_get, set_data_get] = useState({});
    const [dataBox, setDataBox] = useState(null);

    useEffect(() => {
        if (data) {
            setDataBox(data);
        }
    }, [data]);

    const getData = async (data_get, name_block) => {
        setRefreshing(true);
        data_get = data_get ? `&${data_get}` : '';
        // console.log('8888-', `${auth.url_str}/mobile/dashboard?token=${auth.token}${data_get}`)
        try {
            const answer = await request(`${auth.url_str}/mobile/dashboard?token=${auth.token}${data_get}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            const new_data = answer.find(item => item.type === name_block);
            setDataBox(new_data);
        } catch(e) {}
        setRefreshing(false);
    }

    useEffect(() => {
        set_data_get({});
    }, [clear_get]);

    const addDataGet = (name, value) => {
        let new_data_get_obj = {...data_get, [name]: value};
        let new_data_get = '';
        Object.entries(new_data_get_obj).forEach(item => {
            new_data_get += `${item[0]}=${item[1]}&`;
        });
        getData(new_data_get.slice(0, new_data_get.length - 1), 'block_top_list');
        set_data_get({...new_data_get_obj});
    }

    const swithDashboardHandler = (index) => {
        setSwithCurrent(index);
        addDataGet('block_top_list_data', index.value);
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
                {item?.map((element, index_t) => (
                <View style={styles.liner}>
                    <View style={styles.list_item_block}>
                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.block_one_label,
                        ]}
                        >
                            {element?.label}
                        </Text>
                    </View>
                    <View style={styles.list_item_block}>
                        {element?.value.slice(0, 2) !== '<i' ? (
                            <Text
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.block_one_value,
                                item?.length - 1 === index_t ? styles.block_one_value_color : null
                            ]}
                            >
                                {element?.value}
                            </Text>
                        ) : (
                            element?.value ? (<MainIcon name={element?.value?.slice(10, element?.value.length - 6)} color={Colors.Orange} size={24} />): null
                        )}
                    </View>
                </View>
                ))}
            </View>
            {dataBox?.list?.length - 1 !== index ? <View style={styles.hr} /> : null}
            </>
        ))}
        </>
    );
}