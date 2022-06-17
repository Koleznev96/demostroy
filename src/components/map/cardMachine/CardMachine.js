import React, {useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MainIcon } from '../../mainIcon/MainIcon';


const dateToString = (date) => {
    if (!date) return null;
    let now_date = new Date(date);

    let strDay = now_date.getDate() < 10 ? `0${now_date.getDate()}` : `${now_date.getDate()}`;
    let strMonth = now_date.getMonth() < 9 ? `0${now_date.getMonth() + 1}` : `${now_date.getMonth() + 1}`;

    return `${strDay}.${strMonth}.${now_date.getFullYear()}`;
}

const timeToString = (date) => {
    if (!date) return null;
    let now_date = new Date(date);

    let hours = now_date.getHours().toString();
    let minutes = now_date.getMinutes().toString();
    if (hours.length <= 1) {
        hours = '0' + hours;
    }
    if (minutes.length <= 1) {
        minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
}

const form = [
    {
        label: 'Последняя покупка:',
        value: 'lastSaleDateTime',
    },
    {
        label: 'Последняя загрузка:',
        value: 'lastLoadDateTime',
    },
    {
        label: 'Последняя инкассация:',
        value: 'lastCollectionDateTime',
    },
];

const GetIconsMenu = (nameIcom, item) => {
    // console.log('nameIcom-', nameIcom)
    // const validIcon = parseIconFromClassName('fab fa-align-center');
    // return <FontAwesome style={{fontSize: 32}} icon={validIcon}></FontAwesome>;
    // <MenuSvgSelector id='root' data_style={{height: 78, width: width-28-40}} style={styles.menu} /> 
    // if (menuRoot.activeMenu !== item)
    //     return <Icon name={nameIcom?.slice(6, nameIcom.length)} size={20} />;
    // else
    //     return <Icon name={nameIcom?.slice(6, nameIcom.length)} size={20} />;
    return <Icon name={nameIcom?.slice(6, nameIcom.length)} size={20} />;
}

export const CardMachine = ({ title, icons, address, data, key, statusHr, activeHandler, index, statusActive }) => {
    const [statusOpen, setStatusOpen] = useState(false);
    
    return (
        <View 
            style={styles.root} 
            key={key ? key : "1"}
        >
            <TouchableOpacity 
                style={styles.header}
                onPress={() => activeHandler(index)}
            >
                <Text style={[GlobalStyle.CustomFontBold, styles.title]}>{title}</Text>
                <View style={styles.wrapper}>
                    {icons?.map((item, index) => (
                        <View style={styles.box_icon}>
                            {/* {GetIconsMenu(item.split('"fa fa-')[1].split('\"></i>')[0])}  */}
                            <MainIcon name={item.split('<i class=\"')[1].split('\"></i>')[0].split(' text')[0]} color={item.split('<i class=\"')[1].split('\"></i>')[0].split(' text')[1] === '-success' ? '#8AC44B' : (item.split('<i class=\"')[1].split('\"></i>')[0].split(' text')[1] === '-error' ? 'red' : '#FFFFFF')} size={19} />
                            <GlobalSvgSelector id={item} key={index} />
                        </View>
                    ))}
                    <View style={styles.box_icon}>
                        <GlobalSvgSelector id={statusActive ? "button_arrow_top" : "button_arrow_bottom"} />
                    </View>
                </View>
            </TouchableOpacity>
            {statusActive ? (
                <>
                    <Text style={[GlobalStyle.CustomFontRegular, styles.address]}>{address}</Text>
                    {form?.map((item, index) => (
                        <View style={styles.item_liner} key={index}>
                            <Text key={index} style={[GlobalStyle.CustomFontRegular, styles.item_liner_label]}>{item.label}</Text>
                            <View style={styles.item_liner_} key={index}>
                                <Text key={index} style={[GlobalStyle.CustomFontRegular, styles.item_liner_date]}>{dateToString(data[item.value])}</Text>
                                <Text key={index} style={[GlobalStyle.CustomFontRegular, styles.item_liner_time]}>{timeToString(data[item.value])}</Text>
                            </View>
                        </View>
                    ))}
                </>
            ): null}
            {statusHr ? <View style={styles.hr} /> : null}
        </View>
    );
}

