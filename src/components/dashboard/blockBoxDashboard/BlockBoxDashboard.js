import React from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";


export const BlockBoxDashboard = ({data}) => {

    return (
        <>
        <View style={styles.wrapper}>
            <Text
            style={[
                GlobalStyle.CustomFontRegular,
                styles.block_label
            ]}
            >
                {data?.label}
            </Text>
        </View>
        {data?.list?.map((item, index) => (
            <View style={{...styles.list_item, borderColor: item.color}}>
                <View style={styles.list_item_block}>
                    <Text
                    style={{
                        ...GlobalStyle.CustomFontRegular,
                        ...styles.block_one_label,
                        color: item.color
                    }}
                    >
                        {item?.data?.label}
                    </Text>
                    <Text
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.block_one_value
                    ]}
                    >
                        {item?.data?.value}
                    </Text>
                </View>
                {/* <View style={styles.list_item_block}> */}
                    <Text
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.block_one_value2
                    ]}
                    >
                        {item?.data?.value2 + " " + item?.data?.label2}
                    </Text>
                {/* </View> */}
            </View>
        ))}
        </>
    );
}