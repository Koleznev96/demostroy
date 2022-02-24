import React, {useEffect, useState, useContext, useRef} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { MainIcon  } from '../../mainIcon/MainIcon';
import {MenuContext} from "../../../context/MenuContext";
import {Colors} from "../../../utils/Colors";
import AutoHeightWebView from 'react-native-autoheight-webview';


export const HtmlDashboard = ({data, getData, clear_get}) => {
    const menuRoot = useContext(MenuContext);
    const [refresh, set_refresh] = useState(false);
    const [constTime, setConstTime] = useState(null);
    // const newlistTime = useRef(null);

    useEffect(() => {
        // console.log('1111-', refresh, constTime);
        if (!data) {
            // console.log('2222-');
            set_refresh(false);
        }
        else {
            // console.log('3333-', menuRoot.activeMenu?.url[0]);
            if (menuRoot.activeMenu?.url[0] !== '/dashboard') {
                // console.log('4444-');
                // console.log('pilotka, monda')
                clearTimeout(constTime);
                setConstTime(null);
                set_refresh(false);
            }
            else {
                // console.log('seks??????-');
                if (!refresh) {
                    // console.log('5555-');
                    if (constTime) {
                        // console.log('6666-');
                        clearTimeout(constTime);
                    }
                    // console.log('7777-');
                    setConstTime(setTimeout(() => {set_refresh(true); setConstTime(null);}, 3000));
                }
            }
        }
    }, [menuRoot.activeMenu, data])

    const buttonActiveHandler = (status) => {
        // console.log('555-', `html_button=${status === 0 ? "one" : "two"}`)
        getData(`html_button=${status === 0 ? "one" : "two"}`, 'html');
    }

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
            <View style={styles.wrapper_buttons}>
                <TouchableOpacity
                // style={{...styles.button, backgroundColor: data ? data['0']?.color : null}}
                style={[styles.button, {backgroundColor: data?.button['0']?.color}]}
                onPress={() => buttonActiveHandler(0)}
                >
                    <MainIcon name={data?.button['0']?.icon} size={21} color={'#F7F8F9'} />
                </TouchableOpacity>
                <TouchableOpacity
                // style={{...styles.button, backgroundColor: data ? data['1']?.color : null}}
                style={[styles.button, {backgroundColor: data?.button['1']?.color}]}
                onPress={() => buttonActiveHandler(1)}
                >
                    <MainIcon name={data?.button['1']?.icon} size={21} color={'#232532'} />
                </TouchableOpacity>
            </View>
        </View>
        
        <View style={styles.block_chart}>
            {refresh ? (menuRoot.activeMenu?.url[0] === '/dashboard' ? (
                <AutoHeightWebView
                    source={{
                    uri: data?.url
                    }}
                    style={{ width: '100%' }}
                />
            ): null ): (
                <View style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                    <ActivityIndicator size={26} color={Colors.Orange} style={styles.loader}/>
                </View>
            )}
        </View>
        </>
    );
}