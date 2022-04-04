import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";


const timeString = (date) => {
    
    if (typeof date === "string") return date?.slice(11, 16);

    date = new Date(date);
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    if (hours.length <= 1) {
        hours = '0' + hours;
    }
    if (minutes.length <= 1) {
        minutes = '0' + minutes;
    }
    
    return `${hours}:${minutes}`;
}


export const ItemChat = ({data, itemHandler}) => {
    const actionHandler = (url) => {

    }

    return (
        <TouchableOpacity 
        style={styles.rootSt} 
        key={data.item?.id?.toString()}
        onPress={() => itemHandler(data)}
        >
            <View style={styles.block}>
                {data?.item?.avatar_url?.length ? (
                <Image style={styles.avatar} source={{uri: data?.item?.avatar_url?.length ? data?.item?.avatar_url : null}} />
                ): (
                    <Image style={styles.avatar} source={require('../../assets/images/def.png')} />
                )}
                <View style={styles.box}>
                    <Text style={[GlobalStyle.CustomFontBold, styles.label]}>
                        {data.item?.name}
                    </Text>
                    <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>
                    {data.item?.last_message?.length > 64 ? (data.item?.last_message?.slice(0, 58) + '...') : data.item?.last_message}
                    </Text>
                </View>
            </View>
            <View style={styles.box_l}>
                <Text style={[GlobalStyle.CustomFontBold, styles.time]}>
                    {data.item?.data_fin_message ? timeString(data.item?.data_fin_message) : '10:10'}
                </Text>
                {data.item?.count_new_messages ? (data.item?.count_new_messages!== 0 ? 
                <View style={styles.liner}>
                    <Text style={[GlobalStyle.CustomFontRegular, styles.eleven]}>
                        {data.item?.count_new_messages}
                    </Text> 
                </View>
                : null): null}
            </View>
        </TouchableOpacity>
    );
}

