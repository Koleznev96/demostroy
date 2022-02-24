import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { MainIcon } from '../../mainIcon/MainIcon';
import {SwithDashboard} from '../../swithDashboard/SwithDashboard';


export const BlockTopTabDashboard = ({data, getData, clear_get}) => {
    const [swithCurrent, setSwithCurrent] = useState(null);
    const [buttonActive, setButtonActive] = useState(0);
    const [data_get, set_data_get] = useState({});

    useEffect(() => {
        set_data_get({});
    }, [clear_get]);

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
        if (data) setSwithCurrent(data?.select?.data[0]);
    }, [data]);

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
        </View>
        <View style={{paddingRight: 20, marginBottom: 15, marginTop: 14,}}>
            <SwithDashboard listSwith={data?.select?.data} swithCurrent={swithCurrent} swithDashboardHandler={swithDashboardHandler} />
        </View>
        {data?.list?.map((item, index) => (
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
            {data?.list?.length - 1 !== index ? <View style={styles.hr} /> : null}
            </>
        ))}
        </>
    );
}