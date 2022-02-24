import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    BackHandler,
    RefreshControl,
    ScrollView
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {Menu} from "../../components/menu/Menu";
import {HeaderDashboard} from "../../components/headerDashboard/HeaderDashboard";
import {ChartDashboard} from "../../components/dashboard/chartDashboard/ChartDashboard";
import {BlockBoxDashboard} from "../../components/dashboard/blockBoxDashboard/BlockBoxDashboard";
import {BlockMiniListDashboard} from "../../components/dashboard/blockMiniListDashboard/BlockMiniListDashboard";
import {BlockTopListDashboard} from "../../components/dashboard/blockTopListDashboard/BlockTopListDashboard";
import {BlockFreeListDashboard} from "../../components/dashboard/blockFreeListDashboard/BlockFreeListDashboard";
import {BlockTopTabDashboard} from "../../components/dashboard/blockTopTabDashboard/BlockTopTabDashboard";
import {ChartGorizontDashboard} from "../../components/dashboard/chartGorizontDashboard/ChartGorizontDashboard";
import {SwithDashboard} from "../../components/swithDashboard/SwithDashboard";
import {MenuContext} from "../../context/MenuContext";
import {DataContext} from "../../context/DataContext";
import {PopapContext } from "../../context/PopapContext";
import {SettingDataContext} from "../../context/SettingDataContext";
import {Colors} from "../../utils/Colors";
import {Popap} from "../../components/popap/Popap";
// import { ScrollView } from 'react-native-gesture-handler';


const listSwith = [
    'Статистика за сегодня'
];


function DashboardScreen({ navigation, route }) {
    const popapRoot = useContext(PopapContext);
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const dataRoot = useContext(DataContext);
    const settingDataRoot = useContext(SettingDataContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [swithCurrentIndex, setSwithCurrentIndex] = useState(0);
    const [data, setData] = useState(null);
    const [data_chart, setData_chart] = useState(null);
    const [data_block_box, setData_block_box] = useState(null);
    const [data_block_mini_list, setData_block_mini_list] = useState(null);
    const [data_block_top_list, setData_block_top_list] = useState(null);
    const [data_block_free, setData_block_free] = useState(null);
    const [data_blok_top_tab, setData_blok_top_tab] = useState(null);
    const [data_chart_gorizont, setData_chart_gorizont] = useState(null);

    const getData = async (data_get, name_block) => {
        setRefreshing(true);
        data_get = data_get ? `&${data_get}` : '';
        // console.log(`--${auth.url_str}/mobile/dashboard?token=${auth.token}${data_get}`);
        try {
            const answer = await request(`${auth.url_str}/mobile/dashboard?token=${auth.token}${data_get}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            if (name_block) {
                // let ner = data;
                // ner[name_block] = answer[name_block];
                // setData(ner);
                // console.log('77-', name_block)
                switch(name_block) {
                    case 'chart': setData_chart(answer.chart);
                    case 'block_box': setData_block_box(answer.block_box);
                    case 'block_mini_list': setData_block_mini_list(answer.block_mini_list);
                    case 'block_top_list': setData_block_top_list(answer.block_top_list);
                    case 'block_free': setData_block_free(answer.block_free);
                    case 'blok_top_tab': setData_blok_top_tab(answer.blok_top_tab);
                    case 'chart_gorizont': setData_chart_gorizont(answer.chart_gorizont);
                }
            }
            // setData({...data, [name_block]: answer[name_block]});
            else {
                setData_chart(answer.chart);
                setData_block_box(answer.block_box);
                setData_block_mini_list(answer.block_mini_list);
                setData_block_top_list(answer.block_top_list);
                setData_block_free(answer.block_free);
                setData_blok_top_tab(answer.blok_top_tab);
                setData_chart_gorizont(answer.chart_gorizont);
            }
        } catch(e) {
        }
        setRefreshing(false);
    }

    useEffect(() => {
        getData();
    }, []);

    BackHandler.addEventListener('hardwareBackPress', () => {
        popapRoot.exitHandler();
        
        return true;
    });

    return (
        <>
        <Popap />

        <View style={styles.body}>
            <View style={styles.coll}>
                <HeaderDashboard value={'Обзор'}/>
                <View style={styles.header_search}>
                    {/* <SwithDashboard listSwith={listSwith} swithCurrentIndex={swithCurrentIndex} swithDashboardHandler={swithDashboardHandler} /> */}
                </View>
            </View>
            
            <ScrollView 
            refreshControl={
                <RefreshControl
                    // style={{backgroundColor: '#000', zIndex: 1000, marginTop: 1000}}
                    refreshing={Refreshing}
                    onRefresh={() => getData()}
                    colors={[Colors.Orange]}
                />
            }
            style={styles.scrollView} 
            contentContainerStyle={{paddingBottom: 120, paddingHorizontal: 20, paddingTop: 15,}} 
            keyboardShouldPersistTaps='handled' 
            showsVerticalScrollIndicator={false}
            
            >
                {/* {[0, 1, 2, 3].map(item =>  <View style={styles.block}></View>)} */}
                <View style={styles.block}>
                    <ChartDashboard data={data_chart} getData={getData}/>
                </View>
                <View style={styles.block}>
                    <BlockBoxDashboard data={data_block_box} getData={getData}/>
                </View>
                <View style={styles.block_set}>
                    <BlockMiniListDashboard data={data_block_mini_list} getData={getData}/>
                </View>
                <View style={styles.block_set}>
                    <BlockTopListDashboard data={data_block_top_list} getData={getData}/>
                </View>
                <View style={styles.block_opac}>
                    <BlockFreeListDashboard data={data_block_free} getData={getData}/>
                </View>
                <View style={styles.block_set}>
                    <BlockTopTabDashboard data={data_blok_top_tab} getData={getData}/>
                </View>
                <View style={styles.block_local}>
                    <ChartGorizontDashboard data={data_chart_gorizont} getData={getData}/>
                </View>
            </ScrollView>
            <Menu navigation={navigation}/>
        </View>
        </>
    );
}

export default DashboardScreen;

