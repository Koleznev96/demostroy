import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';


export const HeaderDealog = ({ data, exitHandler }) => {
    console.log('dddd-', data)
    return (
        <>
        <View style={styles.root}>
            <View>
                {exitHandler ? (
                <TouchableOpacity
                    style={styles.button_keft}
                    onPress={() => {exitHandler()}}
                    >
                    <GlobalSvgSelector id='back' />
                </TouchableOpacity>
                ) : null}
            </View>
            <View style={styles.center_box}>
                <Text
                style={[
                    GlobalStyle.CustomFontBold,
                    styles.title
                ]}
                >
                    {data?.name}
                </Text>
                <Text
                style={[
                    GlobalStyle.CustomFontRegular,
                    styles.online
                ]}
                >
                    {data?.online ? 'В сети' : 'Не в сети'}
                </Text>
            </View>

            <Image style={styles.avatar} source={{uri: data?.avatar_url}} />
        </View>
        <View style={styles.hr} />
        </>
    );
}

