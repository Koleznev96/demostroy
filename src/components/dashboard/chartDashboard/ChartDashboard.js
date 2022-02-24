import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { MainIcon } from '../../mainIcon/MainIcon';
import {SwithDashboard} from '../../swithDashboard/SwithDashboard';
import { LineChart } from "react-native-chart-kit";


export const ChartDashboard = ({data, getData, clear_get}) => {
    const [swithCurrent, setSwithCurrent] = useState(null);
    const [buttonActive, setButtonActive] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [listLegends, setListLegends] = useState(null);
    const [data_get, set_data_get] = useState({});
    const [data_buton, set_data_buton] = useState(null);
    const [data_list, set_data_list] = useState(null);

    useEffect(() => {
        set_data_get({});
    }, [clear_get]);

    // useEffect(() => {

    // }, [data])

    // const addDataGet = (name, value) => {
    //     let new_data_get_obj = {...data_get, [name]: value};
    //     if (!data_get.chart_button && name !== 'chart_button') {
    //         new_data_get_obj.chart_button = 'one';
    //     }
    //     if (!data_get.chart_data && name !== 'chart_data') {
    //         new_data_get_obj.chart_data = data?.series?.data[0]?.value;
    //     }
    //     let new_data_get = '';
    //     Object.entries(new_data_get_obj).forEach(item => {
    //         new_data_get += `${item[0]}=${item[1]}&`;
    //     });
    //     console.log('errr-', new_data_get,  '===', new_data_get_obj)
    //     getData(new_data_get.slice(0, new_data_get.length - 1), 'chart');
    //     set_data_get({...new_data_get_obj});
    // }

    const swithDashboardHandler = async (index) => {
        setSwithCurrent(index);
        // console.log('--', `chart_button=${data?.button[0]?.color === "#EB9D40" ? "one" : "two"}&chart_data=${index.value}`)
        getData(`chart_button=${data?.button[0]?.color === "#EB9D40" ? "one" : "two"}&chart_data=${index.value}`, 'chart');
        // addDataGet('chart_data', index.value);
    }

    const buttonActiveHandler = async (status) => {
        // setButtonActive(status);
        // console.log('--', `chart_button=${status === 0 ? "one" : "two"}&chart_data=${data?.series?.data[0]?.value}`)
        getData(`chart_button=${status === 0 ? "one" : "two"}&chart_data=${data?.series?.data[0]?.value}`, 'chart');
        // addDataGet('chart_button', status === 0 ? "one" : "two");
    }

    useEffect(() => {
        if (data) {
            setSwithCurrent(data?.series?.data[0]);
            setChartData(data?.select?.map(item => {return {
                data: item.data.map(el => el), 
                color: (opacity = 1) => item.color, 
                strokeWidth: 2
            }}));
            setListLegends(data?.select?.map(item => item.name));
        }
    }, [data]);

    return (
        <View>
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
                style={[styles.button, {backgroundColor: data?.button[0]?.color}]}
                onPress={() => buttonActiveHandler(0)}
                >
                    <MainIcon name={data?.button[0]?.icon} color={'#F7F8F9'} size={21} />
                </TouchableOpacity>
                <TouchableOpacity
                // style={{...styles.button, backgroundColor: data ? data['1']?.color : null}}
                style={[styles.button, {backgroundColor: data?.button[1]?.color}]}
                onPress={() => buttonActiveHandler(1)}
                >
                    <MainIcon name={data?.button[1]?.icon} color={'#232532'} size={21} />
                </TouchableOpacity>
            </View>
        </View>
        <SwithDashboard listSwith={data?.series?.data} swithCurrent={swithCurrent} swithDashboardHandler={swithDashboardHandler} />
        <LineChart
            data={{
            labels: data?.categories?.map(item => (new Date(item)).getDate()),
            datasets: chartData ? chartData : 
            [
                { 
                    data: [
                        0,
                    ],
                    color: (opacity = 1) => 'rgba(0, 0, 0, 0)'
                }
            ],
            legend: listLegends ? listLegends : [""]
            }}
            width={Dimensions.get("window").width - 80} // from react-native
            height={220}
            // yAxisLabel="$"
            yAxisSuffix=" ₽"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundGradientToOpacity: 0,
                backgroundGradientFromOpacity: 0,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                fillShadowGradientFromOpacity: 0,
                fillShadowGradientToOpacity: 0,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
                style: {
                    borderRadius: 16,
                },
                propsForDots: {
                    r: "6",
                },
                propsForHorizontalLabels: {
                    fontSize: 11,
                },
                propsForVerticalLabels: {
                    fontSize: 11,
                },
                verticalLabelsHeightPercentage: {
                    fontSize: 10,
                }
            }}
            bezier
            style={{
                marginTop: 20,
                borderRadius: 12
            }}
        />
        </View>
    );
}