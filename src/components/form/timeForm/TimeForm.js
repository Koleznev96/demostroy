import React, {useState} from 'react';
import {
    Text,
    View,
    Platform,
    TouchableOpacity
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import DateTimePicker from '@react-native-community/datetimepicker';


const timeString = (date) => {
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

export const TimeForm = ({ data }) => {
    const [status, setStatus] = useState(false);
    const itemHandler = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setStatus(Platform.OS === 'ios' ? true : false);
        data.change({name: data.name, value: timeString(currentDate)}, data.index)
    }

    return (
        <>
        {status && <DateTimePicker
        style={{width: 100}}
        display="default"
        is24Hour={true}
        value={data.value[data.name] ? new Date(2022, 0, 1, Number(data.value[data.name].slice(0, 2)), Number(data.value[data.name].slice(3, 5)), 0, 0) : new Date()}
        mode="time"
        format="hh:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={null}
        customStyles={{
        disabled: {
            marginLeft: 20,
        },
        dateInput: {
            borderWidth: 0,
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
        }}
        onChange={itemHandler}
    />}
        <View style={styles.root}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>
        <TouchableOpacity 
        style={[styles.button, data?.styles ? data.styles : null ]} 
        onPress={() => setStatus(true)}
        >
            <Text style={[GlobalStyle.CustomFontRegular, data.value[data.name] ? styles.input : styles.input_def]}>{data.value[data.name] ? data.value[data.name] : '00:00'}</Text>
        </TouchableOpacity>
        <View style={styles.hr_g} />
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
            {data.error}
        </Text> : null}
        </View>
        </>
    );
}

