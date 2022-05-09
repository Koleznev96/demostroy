import React, {useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';


export const CardMachine = ({ title, icons, address, data, key, statusHr }) => {
    const [statusOpen, setStatusOpen] = useState(false);

    return (
        <View 
            style={styles.root} 
            key={key ? key : "1"}
        >
            <TouchableOpacity 
                style={styles.header}
                onPress={() => setStatusOpen(!statusOpen)}
            >
                <Text style={[GlobalStyle.CustomFontBold, styles.title]}>{title}</Text>
                <View style={styles.wrapper}>
                    {icons?.map((item, index) => (
                        <View style={styles.box_icon}>
                            <GlobalSvgSelector id={item} key={index} />
                        </View>
                    ))}
                    <View style={styles.box_icon}>
                        <GlobalSvgSelector id={statusOpen ? "button_arrow_top" : "button_arrow_bottom"} />
                    </View>
                </View>
            </TouchableOpacity>
            {statusOpen ? (
                <>
                    <Text style={[GlobalStyle.CustomFontRegular, styles.address]}>{address}</Text>
                    {data?.map((item, index) => (
                        <View style={styles.item_liner} key={index}>
                            <Text key={index} style={[GlobalStyle.CustomFontRegular, styles.item_liner_label]}>{item.label}</Text>
                            <View style={styles.item_liner_} key={index}>
                                <Text key={index} style={[GlobalStyle.CustomFontRegular, styles.item_liner_date]}>{item.date}</Text>
                                <Text key={index} style={[GlobalStyle.CustomFontRegular, styles.item_liner_time]}>{item.time}</Text>
                            </View>
                        </View>
                    ))}
                </>
            ): null}
            {statusHr ? <View style={styles.hr} /> : null}
        </View>
    );
}

