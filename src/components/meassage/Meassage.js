import React from 'react';
import {
    Text,
    View,
    Pressable
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";


const timeString = (date) => {
    // date = new Date(date);
    // let hours = date.getHours().toString();
    // let minutes = date.getMinutes().toString();

    // if (hours.length <= 1) hours = '0' + hours;
    // if (hours.minutes <= 1) hours = '0' + hours;
    
    // return `${hours}:${minutes}`;
    // console.log('yy-', date)
    return date?.slice(10, 16);
}


export const Meassage = ({ data }) => {
    if (data.my)
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

