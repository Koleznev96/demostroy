import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';
import {MainIcon} from '../../mainIcon/MainIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from "../../../utils/Colors";


export const BlockMiniListDashboard = ({data}) => {

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
            <>
            <View style={styles.list_item}>
                <View style={styles.list_item_block}>
                    <Text
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.block_one_label,
                    ]}
                    >
                        {item?.label}
                    </Text>
                    <Text
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.block_one_value
                    ]}
                    >
                        {item?.value}
                    </Text>
                </View>
                <MainIcon name={item?.icon} color={Colors.Orange} size={21} />
            </View>
            {data?.list?.length - 1 !== index ? <View style={styles.hr} /> : null}
            </>
        ))}
        </>
    );
}