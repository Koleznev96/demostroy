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
    date = new Date(date);
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (hours.length <= 1) hours = '0' + hours;
    if (hours.minutes <= 1) hours = '0' + hours;
    
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
                <Image style={styles.avatar} source={{uri: data?.item?.avatar_url?.length ? data?.item?.avatar_url : null}} />
                <View style={styles.box}>
                    <Text style={[GlobalStyle.CustomFontBold, styles.label]}>
                        {data.item?.name}
                    </Text>
                    <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>
                    {data.item?.meassage?.length > 64 ? (data.item?.meassage?.slice(0, 58) + '...') : data.item?.meassage}
                    </Text>
                </View>
            </View>
            <View style={styles.box_l}>
                <Text style={[GlobalStyle.CustomFontBold, styles.time]}>
                    {data.item?.data_fin_message}
                </Text>
                {data.item?.count_new_messages !== 0 ? 
                <View style={styles.liner}>
                <View />
                <Text style={[GlobalStyle.CustomFontRegular, styles.eleven]}>
                    {data.item?.count_new_messages}
                </Text> 
                </View>
                : null}
            </View>
        </TouchableOpacity>
    );
}

