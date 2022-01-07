import React, {useState, useContext} from 'react';
import {
    Text,
    View,
    Pressable,
    TouchableOpacity
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';
import { PopapContext } from "../../../context/PopapContext";
import DatePicker from 'react-native-datepicker';


export const DateForm = ({ data }) => {
    const popapRoot = useContext(PopapContext);
    const [value, setValue] = useState(null);

    const itemHandler = (item) => {
        setValue(item);
        popapRoot.exitHandler();
        data.change({name: data.name, value: item.toString()}, data.index)
    }

    const DataPopap = (
        <View style={{paddingVertical: 20, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            <DatePicker
                style={{width: '100%'}}
                date={value ? value : new Date()}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2018-05-01"
                maxDate="2026-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={null}
                customStyles={{
                disabled: {
                    marginLeft: 20,
                },
                dateInput: {
                    borderWidth: 0,
                    marginLeft: 40,
                    width: '100%',
                },
                dateText: {
                    color: '#fff',
                    fontSize: 22,
                    textDecorationLine: 'underline',
                    textAlign: 'center',
                    width: '100%'
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {itemHandler(date)}}
            />
        </View>
    );

    const openPopap = () => {
        popapRoot.dataChange(DataPopap);
        popapRoot.openHandler();
    }

    return (
        <View style={styles.root}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>
        <Pressable 
        style={[styles.input, data?.styles ? data.styles : null ]} 
        // onPress={() => openPopap()}
        >
            {/* <Text style={[GlobalStyle.CustomFontRegular, styles.value, !value ? styles.value_no : null]}>{value ? value : '00-00-0000'}</Text> */}
            <DatePicker
                style={{width: '100%'}}
                date={value}
                mode="date"
                placeholder="0000-00-00"
                format="YYYY-MM-DD"
                minDate="2018-01-01"
                maxDate="2030-12-12"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={null}
                customStyles={{
                disabled: {
                    marginLeft: 20,
                },
                dateInput: {
                    borderWidth: 0,
                    marginLeft: -205,
                    marginTop: -20,
                    width: '100%',
                    padding: 0,
                    textAlign: 'left',
                },
                dateText: {
                    textAlign: 'left',
                    color: '#fff',
                    fontSize: 14,
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {itemHandler(date)}}
            />
            <View style={styles.icon}>
            {/* <GlobalSvgSelector  id='arrow_items' /> */}
            </View>
        </Pressable>
        <View style={styles.hr_g} />
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
            {data.error}
        </Text> : null}
        </View>
    );
}

