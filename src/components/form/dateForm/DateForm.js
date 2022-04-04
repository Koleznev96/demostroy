import React from 'react';
import {
    Text,
    View,
    Pressable,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import DatePicker from 'react-native-datepicker';


export const DateForm = ({ data }) => {
    const itemHandler = (item) => {
        data.change({name: data.name, value: item.toString()}, data.index)
    }

    return (
        <View style={styles.root}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>
        <Pressable 
        style={[styles.input, data?.styles ? data.styles : null ]} 
        >
            <DatePicker
                style={{width: 120}}
                date={data.value[data.name]}
                mode="date"
                placeholder="0000-00-00"
                format="YYYY-MM-DD"
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
                onDateChange={(date) => {itemHandler(date)}}
            />
        </Pressable>
        <View style={styles.hr_g} />
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
            {data.error}
        </Text> : null}
        </View>
    );
}

