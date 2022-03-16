import React from 'react';
import {
    Text,
    View,
    Pressable
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


export const Meassage = ({ data, myId }) => {
    // console.log('nnn-', data, myId.result)
    if (data.sender_id === myId.result)
    return (
        <View style={styles.liner_my}>
            <View style={styles.root_my} 
            // key={item.id.toString()}
            >
                <Text
                style={[
                    GlobalStyle.CustomFontRegular,
                    styles.meassage,
                ]}
                >
                    {data?.text}
                </Text>   
                <Text
                style={[
                    GlobalStyle.CustomFontRegular,
                    styles.date,
                ]}
                >
                    {timeString(data?.created_at)}
                </Text>        
            </View>
        </View>
    );

    return (
        <View style={styles.liner_you}>
            <View style={styles.root_you} 
            // key={item.id.toString()}
            >
                <Text
                style={[
                    GlobalStyle.CustomFontRegular,
                    styles.meassage,
                ]}
                >
                    {data?.text}
                </Text>   
                <Text
                style={[
                    GlobalStyle.CustomFontRegular,
                    styles.date,
                ]}
                >
                    {timeString(data?.created_at)}
                </Text>        
            </View>
        </View>
    );
}

