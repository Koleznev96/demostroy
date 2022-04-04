import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Button,
    Dimensions,
    TouchableOpacity
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
import YaMap from 'react-native-yamap';
const {width, height} = Dimensions.get('screen');


const route = {
    start: { lat: 0, lon: 0},
    end: { lat: 10, lon: 10},
};

// YandexMapKit.setApiKey('bf54697f-7a05-4c12-8e35-9f4de680982f');

YaMap.init('bf54697f-7a05-4c12-8e35-9f4de680982f');


function MapScreen({ navigation }) {
    const popapRoot = useContext(PopapContext);
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [panel, setPanel] = useState(null);
    const [number, setNumber] = useState(null);

    const newSearch = (text) => {
        setStrSearch(text);
    }

    const goBack = () => {

    }

    // useEffect(() => {
    //     if (panel) panel.show();
    // }, [panel]);

    const panelHandler = () => {
        let top_number = number > (height * 60 / 100) / 2 ? 135 : height * 60 / 100;
        setNumber(top_number);
        panel.show(top_number);
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
                <View style={styles.header_search}>
                    {/* <Search value={chatRoot.strSearch} setStrSearch={chatRoot.newSearch} searchHandler={searchHandler}/> */}
                </View>
            </View>
            {/* <YandexMapView 
                ref="yandexMap" 
                onInteraction={() => console.log()} 
                // region={this.state.region}
                showMyLocation={true} 
                geocodingEnabled={true} 
                // onGeocoding={this.onGeocoding}
                showMyLocationButton={true}/> */}
            <YaMap
                userLocationIcon={{ uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png' }}
                style={{ flex: 1 }}
            />
            {/* <View style={styles.map} /> */}
            {/* <MapView
                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
                </MapView> */}
            {/* <Button title='Show panel' onPress={() => panel.show()} /> */}
            <SlidingUpPanel 
            draggableRange={{top: height * 60 / 100, bottom: 135}}
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
                </View>
                {/* <View style={styles.container}>
                    <Text>Here is the content inside panel</Text>
                    <Button title='Hide' 
                    // onPress={() => panel.hide()} 
                    />
                </View> */}
            </SlidingUpPanel>
            {/* <SlidingPanel
                
                draggableRange={{top: 0, bottom: 110}}
                ref={c => { setPanel(c); }}
                style={{width: '100%', marginTop: 300}}
                headerLayoutHeight = {135}
                slidingPanelLayoutHeight = {1000}
                height={200}
                top={200}
                headerLayout = { () => (
                    // <View style={{width: '100%', height: 55}}>
                    <View style={styles.footer}>
                        <View style={styles.block_hr} />
                    </View>
                    // </View>
                )}
                slidingPanelLayout = { () =>
                    <View style={styles.slidingPanelLayoutStyle}>
                    <Text style={styles.commonTextStyle}>The best thing about me is you</Text>
                    </View>
                }
            /> */}

        </View>
        </>
    );
}

export default MapScreen;

