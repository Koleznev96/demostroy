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
import {MenuContext} from "../../context/MenuContext";
import {HeaderDashboard} from "../../components/headerDashboard/HeaderDashboard";
import {ChartDashboard} from "../../components/dashboard/chartDashboard/ChartDashboard";
import {BlockBoxDashboard} from "../../components/dashboard/blockBoxDashboard/BlockBoxDashboard";
import {BlockMiniListDashboard} from "../../components/dashboard/blockMiniListDashboard/BlockMiniListDashboard";
import {BlockTopListDashboard} from "../../components/dashboard/blockTopListDashboard/BlockTopListDashboard";
import {BlockFreeListDashboard} from "../../components/dashboard/blockFreeListDashboard/BlockFreeListDashboard";
import {BlockTopTabDashboard} from "../../components/dashboard/blockTopTabDashboard/BlockTopTabDashboard";
import {ChartGorizontDashboard} from "../../components/dashboard/chartGorizontDashboard/ChartGorizontDashboard";
import {HtmlDashboard} from "../../components/dashboard/htmlDashboard/HtmlDashboard";
import {PopapContext } from "../../context/PopapContext";
import {Colors} from "../../utils/Colors";
import {Popap} from "../../components/popap/Popap";


function DashboardScreen({ navigation, route }) {
    const popapRoot = useContext(PopapContext);
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(null);
    const [clear_get, set_clear_get] = useState(false);
    const [data_chart, setData_chart] = useState(null);
    const [data_block_box, setData_block_box] = useState(null);
    const [data_block_mini_list, setData_block_mini_list] = useState(null);
    const [data_block_top_list, setData_block_top_list] = useState(null);
    const [data_block_free, setData_block_free] = useState(null);
    const [data_blok_top_tab, setData_blok_top_tab] = useState(null);
    const [data_chart_gorizont, setData_chart_gorizont] = useState(null);
    const [data_html, setData_html] = useState(null);

    const getData = async (data_get, name_block) => {
        setRefreshing(true);
        data_get = data_get ? `&${data_get}` : '';
        // console.log(`----${auth.url_str}/mobile/dashboard?token=${auth.token}${data_get}`);
        try {
            const answer = await request(`${auth.url_str}/mobile/dashboard?token=${auth.token}${data_get}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            // const new_data = answer.find(item => item.type === name_block);
            // console.log('gggg-', answer);
            setData(answer);
        } catch(e) {}
        setRefreshing(false);
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
        popapRoot.exitHandler();
        if (navigation.getState()['routes'][navigation.getState()['index']].name === "Dashboard") return true;
        return false;
    });

    useEffect(() => {
        // slumBack.remove();
        getData();
    }, []);

    const renderBlock = (item) => {
        // setData_chart(answer.chart);
        // setData_block_box(answer.block_box);
        // setData_block_mini_list(answer.block_mini_list);
        // setData_block_top_list(answer.block_top_list);
        // setData_block_free(answer.block_free);
        // setData_blok_top_tab(answer.blok_top_tab);
        // setData_chart_gorizont(answer.chart_gorizont);
        // setData_html(answer.html);
        switch(item.type) {
            case 'chart':
                return (
                    <View style={styles.block}>
                        <ChartDashboard data={item} clear_get={clear_get} setRefreshing={setRefreshing} />
                    </View>
                );
            case 'block_box':
                return (
                    <View style={styles.block}>
                        <BlockBoxDashboard data={item} setRefreshing={setRefreshing} clear_get={clear_get} />
                    </View>
                );
            case 'block_mini_list':
                return (
                    <View style={styles.block_set}>
                        <BlockMiniListDashboard data={item} setRefreshing={setRefreshing} clear_get={clear_get} />
                    </View>
                );
            case 'block_top_list':
                return (
                    <View style={styles.block_set}>
                        <BlockTopListDashboard data={item} setRefreshing={setRefreshing} clear_get={clear_get} />
                    </View>
                );
            case 'block_free':
                return (
                    <View style={styles.block_opac}>
                        <BlockFreeListDashboard data={item} setRefreshing={setRefreshing} clear_get={clear_get} />
                    </View>
                );
            case 'blok_top_tab':
                return (
                    <View style={styles.block_set}>
                        <BlockTopTabDashboard data={item} setRefreshing={setRefreshing} clear_get={clear_get} />
                    </View>
                );
            case 'chart_gorizont':
                return (
                    <View style={styles.block_local}>
                        <ChartGorizontDashboard data={item} setRefreshing={setRefreshing} clear_get={clear_get} />
                    </View>
                );
            case 'html':
                // return (
                //     {/* <View style={styles.block_local}>
                //         <HtmlDashboard data={data_html} getData={getData} clear_get={clear_get} />
                //     </View> */}
                // )
                return null;
            default:
                return null;
        }
    }   

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
                {data?.map((item, index) => renderBlock(item))}
                {/* {[0, 1, 2, 3].map(item =>  <View style={styles.block}></View>)} */}
                {/* <View style={styles.block}>
                    <ChartDashboard data={data_chart} getData={getData} clear_get={clear_get} />
                </View>
                <View style={styles.block}>
                    <BlockBoxDashboard data={data_block_box} getData={getData} clear_get={clear_get} />
                </View>
                <View style={styles.block_set}>
                    <BlockMiniListDashboard data={data_block_mini_list} getData={getData} clear_get={clear_get} />
                </View>
                <View style={styles.block_set}>
                    <BlockTopListDashboard data={data_block_top_list} getData={getData} clear_get={clear_get} />
                </View>
                <View style={styles.block_opac}>
                    <BlockFreeListDashboard data={data_block_free} getData={getData} clear_get={clear_get} />
                </View>
                <View style={styles.block_set}>
                    <BlockTopTabDashboard data={data_blok_top_tab} getData={getData} clear_get={clear_get} />
                </View>
                <View style={styles.block_local}>
                    <ChartGorizontDashboard data={data_chart_gorizont} getData={getData} clear_get={clear_get} />
                </View> */}
                {/* <View style={styles.block_local}>
                    <HtmlDashboard data={data_html} getData={getData} clear_get={clear_get} />
                </View> */}
            </ScrollView>
            <Menu navigation={navigation} noActive={true}/>
        </View>
        </>
    );
}

export default DashboardScreen;

