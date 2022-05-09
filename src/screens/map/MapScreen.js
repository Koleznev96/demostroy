import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Text,
    Keyboard
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
// import YaMap from 'react-native-yamap';
const {width, height} = Dimensions.get('screen');


const route = {
    start: { lat: 0, lon: 0},
    end: { lat: 10, lon: 10},
};

// YandexMapKit.setApiKey('bf54697f-7a05-4c12-8e35-9f4de680982f');

// YaMap.init('bf54697f-7a05-4c12-8e35-9f4de680982f');


function MapScreen({ navigation }) {
    const popapRoot = useContext(PopapContext);
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [panel, setPanel] = useState(null);
    const [number, setNumber] = useState(null);
    const [strSearch, setStrSearch] = useState("");
    const [form, setForm] = useState([]);
    const [locations, setLocations] = useState([]);
    const dataLang = useContext(DataLangContext);
    const [finalForm, setFinalForm] = useState({});
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [statusFilter, setStatusFilter] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>  setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const getData = async () => {
        try {
            const answer = await request(`${auth.url_str}/mobile/maps/index?token=${auth.token}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setForm(answer[0].form);
            setLocations(answer[1].locations);
        } catch (e) {
            console.log('uuu-', e)
        }
    }

    console.log('hhh-', form)

    useEffect(() => {
        getData();
    }, [])

    const newSearch = (text) => {
        setStrSearch(text);
    }

    const goBack = () => {
        navigation.goBack();
    }

    // useEffect(() => {
    //     if (panel) panel.show();
    // }, [panel]);

    const panelHandler = () => {
        let top_number = number > (height * 60 / 100) / 2 ? 135 : height * 60 / 100;
        setNumber(top_number);
        panel.show(top_number);
    }

    const onHandlerMarker = (data) => {
        console.log("6666-", data)
    }

    const searchHandler = () => {

    }

    const changeRoot = () => {

    }

    const saveFilterHandler = () => {
        console.log('status-', statusFilter)
        setStatusFilter(false);
    } 

    const clearFilterHandler = () => {

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
                style={{width: '100%', height: '100%'}}
                initialRegion={{
                    latitude: locations?.length > 0 ? (locations[0]?.coords.length > 0 ? Number(locations[0].coords?.split(',')[0]) : 56.194) : 56.194,
                    longitude: locations?.length > 0 ? (locations[0]?.coords.length > 0 ? Number(locations[0].coords?.split(',')[1]) : 92.8672) : 92.8672,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {locations?.map((item, index) => (
                    <MarkerMap 
                        key={index}
                        icon={"marker-1"}
                        title={"Title"}
                        description={"description"}
                        coordinate={{
                            latitude: item?.coords.length > 0 ? Number(item.coords?.split(',')[0]) : 56.194,
                            longitude: item?.coords.length > 0 ? Number(item.coords?.split(',')[0]) : 92.8672,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        hadnler={onHandlerMarker}
                    />
                ))}
            </MapView>
            <SlidingUpPanel 
            // MinimumDistanceThreshold={50}
            draggableRange={{top: 1000, bottom: 125}}
            ref={c => setPanel(c)}
            Minimumvelocityhreshold={0.2}
            onMomentumDragEnd={(number) => setNumber(number)}
            >
                <View style={styles.footer}>
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
                                <Search data={null} searchHandler={searchHandler} setStrSearch={setStrSearch} />
                            </View>
                            <Text
                            style={[
                                GlobalStyle.CustomFontBold,
                                styles.panel_title
                            ]}
                            >
                                Информация
                            </Text>
                            {form?.map((item, index) => (
                                <BooksForm data={{...item, change: changeRoot, value: finalForm, lang: dataLang.data}}/>
                            ))}
                            <ButtonFull data={{value: 'Сохранить', change: saveFilterHandler}} />
                        </>
                    ) : (
                        <>
                            <View style={styles.header_footer}>
                                <TouchableOpacity 
                                onPress={() => setStatusFilter(true)}
                                style={true ? styles.buton_input : styles.buton_input_max}
                                >
                                    <Text
                                    style={[
                                        GlobalStyle.CustomFontRegular,
                                        styles.buton_input_text
                                    ]}
                                    >
                                        Поиск
                                    </Text>
                                    <View style={styles.button_search}>
                                        <GlobalSvgSelector id='search' />
                                    </View>
                                </TouchableOpacity>
                                {true ? (
                                    <TouchableOpacity 
                                    onPress={() => clearFilterHandler()}
                                    style={styles.buton_clear}
                                    >
                                        <GlobalSvgSelector id='clear' />
                                    </TouchableOpacity>
                                ): null}
                            </View>
                            {locations?.map((item, index) => (
                                <CardMachine 
                                    key={index}
                                    icons={item.icons}
                                    address={item.address}
                                    data={item.data}
                                    title={item.name}
                                    statusHr={index !== locations?.length - 1}
                                />
                            ))}
                        </>
                    )}
                </View>
            </SlidingUpPanel>
        </View>
        </>
    );
}

export default MapScreen;

