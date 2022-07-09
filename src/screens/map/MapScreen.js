import React, {useContext, useEffect, useState, useRef} from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Text,
    Keyboard,
    Animated,
    Pressable
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {PopapContext } from "../../context/PopapContext";
import {Colors} from "../../utils/Colors";
import {Popap} from "../../components/popap/Popap";
import {Search} from "../../components/search/Search";
// import MapView from 'react-native-maps';
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import SlidingPanel from 'react-native-sliding-up-down-panels';
import SlidingUpPanel from 'rn-sliding-up-panel';
// import { YandexMapKit, YandexMapView } from 'react-native-yandexmapkit';
import MapView from 'react-native-maps';
import { Marker, MarkerMap } from '../../components/map/marker/MarkerMap';
import GlobalStyle from '../../components/GlobalStyle';
import { DropDownForm } from '../../components/map/dropDownForm/DropDownForm';
import { ButtonFull } from '../../components/buttonFull/ButtonFull';
import { CardMachine } from '../../components/map/cardMachine/CardMachine';
import {BooksForm} from '../../components/form/booksForm/BooksForm';
import { DataLangContext } from '../../context/DataLangContext';
import { InputForm } from '../../components/form/inputForm/InputForm';
import { NumberForm } from '../../components/form/numberForm/NumberForm';
import { DateForm } from '../../components/form/dateForm/DateForm';
import { MenuContext } from '../../context/MenuContext';
import { CardMachineActive } from '../../components/map/cardMachine/CardMachineActive';
// import YaMap from 'react-native-yamap';
const {width, height} = Dimensions.get('screen');

const delta = {
    latitudeDelta: 0.0622,
    longitudeDelta: 0.0221,
}

function MapScreen({ navigation }) {
    const popapRoot = useContext(PopapContext);
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [panel, setPanel] = useState(false);
    const [number, setNumber] = useState(null);
    const [strSearch, setStrSearch] = useState("");
    const [form, setForm] = useState([]);
    const [locations, setLocations] = useState([]);
    const dataLang = useContext(DataLangContext);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [statusFilter, setStatusFilter] = useState(false);
    const [finalForm, setFinalForm] = useState({});
    const [mapFunctional, setMapFunctional] = useState(null);
    const [activeItems, setActiveItemsl] = useState([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeTop = useRef(new Animated.Value(height - 200)).current;
    const menuRoot = useContext(MenuContext);
    const [activeData, setActiveData] = useState(null);

    const activeHandler = (index) => {
        const index_remove = activeItems?.indexOf(index);
        let new_data = [...activeItems];
        if (index_remove !== -1) {
            new_data.splice(index_remove, 1);
        } else {
            new_data.push(index);
        }
        setActiveItemsl(new_data);
    }

    const getData = async (status_null) => {
        let filters_str = "";
        if (!status_null) {
            Object.entries(finalForm)?.forEach((item) => {
                filters_str += `&${item[0]}=${item[1]}`;
            });
        }
        try {
            const answer = await request(`${auth.url_str}/mobile/maps/index?token=${auth.token}${filters_str}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setForm(answer[0].form);
            setLocations(answer.machines);
        } catch (e) {
            // console.log('uuu-', e)
        }
    }

    useEffect(() => {
        setTimeout(() => getData(), 2000)
    }, []);

    useEffect(() => {
        if (locations && locations?.length) {
            const new_start_coords = locations?.find(item => (item.addressCoords && item.addressCoords.length));
            // console.log('nn0-', new_start_coords?.addressCoords);
            if (new_start_coords && mapFunctional) {
                let region = {
                    latitude: Number(new_start_coords.addressCoords?.split(',')[0]),
                    longitude: Number(new_start_coords.addressCoords?.split(',')[1]),
                    ...delta,
                };
                mapFunctional.animateToRegion(region)
            }
        }
    }, [locations])

    const goBack = () => {
        menuRoot.menuHandler(menuRoot.prevMenu);
        navigation.goBack();
    }

    const panelHandler = () => {
        if (!panel) {
            setPanel(!panel)
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();
            Animated.timing(fadeTop, {
                toValue: height * 30 / 100,
                duration: 1000,
                useNativeDriver: true
            }).start();
        } else {
            Keyboard.dismiss();
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start(() => setPanel(!panel));
            Animated.timing(fadeTop, {
                toValue: height - 200,
                duration: 1000,
                useNativeDriver: true
            }).start();
        }
    }

    const panelHandlerActive = (duration) => {
        if (!panel) {
            setPanel(!panel)
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: duration ? duration : 100,
                useNativeDriver: true
            }).start();
            Animated.timing(fadeTop, {
                toValue: height * 30 / 100,
                duration: duration ? duration : 100,
                useNativeDriver: true
            }).start();
        }
    }

    useEffect(() => {
        if (isKeyboardVisible) {
            panelHandlerActive();
        }
    }, [isKeyboardVisible])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const onHandlerMarker = (data) => {

    }

    const searchHandler = (value) => {
        setStrSearch(value);
        let new_final_form = {...finalForm};
        new_final_form.search = value?.length > 0 ? value : null;
        setFinalForm({...new_final_form});
    }

    const saveFilterHandler = () => {
        getData();
        setStatusFilter(false);
    } 

    const clearFilterHandler = () => {
        setFinalForm({});
        getData(true);
    }

    const changeRoot = (data) => {
        let new_data = Object.entries(finalForm);
        let answer = {};
        let flag = true;
        new_data.forEach((item) => {
            if (item[0] === data.name) {
                if (data.value) {
                    answer[item[0]] = data.value;
                }
                flag = false;
            }
            else answer[item[0]] = item[1];
        });
        if (flag) {
            answer[data.name] = data.value;
        }
        setFinalForm({...answer});
    };

    const null_func = () => {

    }

    const activePanelHandler = (data) => {
        setActiveData(data ? data : null);
    }

    return (
        <>
        <Popap />
        <View style={styles.body}>
            <View style={styles.coll}>
                <TouchableOpacity
                style={styles.go_back}
                onPress={() => goBack()}
                >
                    <GlobalSvgSelector id="blur_back" />
                </TouchableOpacity>
            </View>
            <MapView
                ref={(map) => setMapFunctional(map)}
                
                style={{width: '100%', height: '100%'}}
                initialRegion={{
                    latitude: 55.45,
                    longitude: 37.36,
                    ...delta,
                }}
            >
                {locations?.map((item, index) => {
                    // console.log('item-', index, item?.addressCoords);
                    if (!item?.addressCoords || item?.addressCoords.length < 0 || item.addressCoords?.split(',').length !== 2) {
                        return null;
                    }
                    return (
                        <MarkerMap 
                            data={item}
                            key={index}
                            icon={"marker-1"}
                            title={"Title"}
                            description={"description"}
                            coordinate={{
                                latitude: Number(item.addressCoords?.split(',')[0]),
                                longitude: Number(item.addressCoords?.split(',')[1]),
                                ...delta,
                            }}
                            hadnler={activePanelHandler}
                        />
                    )}
                )}
            </MapView>
            {panel ? (
            <Animated.View style={[styles.blur, {opacity: fadeAnim}]}>
                <Pressable style={{width: '100%', height: '100%'}} onPress={() => panelHandler()}>

                </Pressable>
            </Animated.View>
            ): (
                activeData ? (
                    <View style={[styles.block_active_data]}>
                        <TouchableOpacity
                        onPress={() => panelHandler()}
                        style={styles.panel_header}
                        >
                        <View style={styles.block_hr} />
                        </TouchableOpacity>
                        <CardMachineActive 
                            icons={activeData?.icons}
                            address={activeData?.address}
                            data={activeData}
                            title={activeData?.name}
                            activeHandler={activePanelHandler}
                        />
                    </View>
                ): null
            )}
            <View style={styles.footer_panel}>
            
            <Animated.View style={[styles.footer, {translateY: fadeTop}]}>
            
                    <TouchableOpacity
                    onPress={() => panelHandler()}
                    style={styles.panel_header}
                    >
                    <View style={styles.block_hr} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                    onPress={(e) => panel.show(height * 60 / 100)}
                    >
                    <ScrollView style={{width: '100%', backgroundColor: 'red'}}> */}
                    {statusFilter ? (
                        <>
                            <View style={styles.header_footer}>
                                <Search data={null} searchHandler={null_func} setStrSearch={searchHandler} value={strSearch} onFocus={panelHandlerActive} />
                            </View>
                            <Text
                            style={[
                                GlobalStyle.CustomFontBold,
                                styles.panel_title
                            ]}
                            >
                                Информация
                            </Text>
                            {/* {
                                form?.map((item, index) => {
                                    return renderGetInput({data: item});
                                })
                            } */}
                            <ScrollView 
                                style={{width: '100%'}}
                                keyboardShouldPersistTaps='handled' 
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{paddingBottom: 20}} 
                            >
                            {form?.map((item, index) => (
                                <BooksForm data={{...item, change: changeRoot, value: finalForm, lang: dataLang.data, styles: {height: 40,}}}/>
                            ))}
                            <ButtonFull data={{value: 'Сохранить', change: saveFilterHandler}} />
                            </ScrollView>
                        </>
                    ) : (
                        <>
                            <View style={styles.header_footer}>
                                <TouchableOpacity 
                                onPress={() => {setStatusFilter(true); panelHandlerActive(1000)}}
                                style={Object.keys(finalForm).length !== 0 ? styles.buton_input : styles.buton_input_max}
                                >
                                    <Text
                                    style={[
                                        GlobalStyle.CustomFontRegular,
                                        finalForm?.search?.length ? styles.buton_input_text_active : styles.buton_input_text
                                    ]}
                                    >
                                        {finalForm?.search?.length ? finalForm?.search : 'Поиск'}
                                    </Text>
                                    <View style={styles.button_search}>
                                        <GlobalSvgSelector id='search' />
                                    </View>
                                </TouchableOpacity>
                                {Object.keys(finalForm).length !== 0 ? (
                                    <TouchableOpacity 
                                    onPress={() => clearFilterHandler()}
                                    style={styles.buton_clear}
                                    >
                                        <GlobalSvgSelector id='clear' />
                                    </TouchableOpacity>
                                ): null}
                            </View>
                            <ScrollView 
                                style={{width: '100%'}}
                                keyboardShouldPersistTaps='handled' 
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{paddingBottom: 20}} 
                            >
                            {locations?.map((item, index) => (
                                <CardMachine 
                                    key={index}
                                    icons={item.icons}
                                    address={item.address}
                                    data={item}
                                    title={item.name}
                                    statusHr={index !== locations?.length - 1}
                                    index={index}
                                    activeHandler={activeHandler}
                                    statusActive={activeItems?.indexOf(index) !== -1}
                                />
                            ))}
                            </ScrollView>
                        </>
                    )}
                </Animated.View>
            </View>
        </View>
        </>
    );
}

export default MapScreen;

