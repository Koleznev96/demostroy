import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { MainIcon } from '../../mainIcon/MainIcon';
import {Colors} from "../../../utils/Colors";


export const BlockFreeListDashboard = ({data}) => {

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
        {data?.data?.map((item, index) => (
            <View style={styles.list_item}>
                <View style={styles.liner}>
                    <View style={styles.wrapper}>
                        {item?.up_left?.map((item_icon) => (
                            <>
                            <MainIcon name={item_icon?.slice(10, item_icon?.length - 6)} size={24} color={'#F04438'} />
                            <View style={{width: 12}} />
                            </>
                        ))}
                    </View>
                    <View style={styles.wrapper_t}>
                        {item?.up_right?.map((item_text) => (
                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.up_right,
                            {color: '#F04438'}
                        ]}
                        >
                            {item_text}
                        </Text>
                        ))}
                    </View>
                </View>
                <View style={styles.liner}>
                    <View style={styles.wrapper}>
                        {item?.down_left?.map((item_down_left) => {
                            if (item_down_left.slice(0, 2) === '<i')
                                return (<><MainIcon name={item_down_left?.slice(10, item_down_left?.length - 6)} size={24} color={Colors.Orange} /><View style={{width: 12}} /></>)
                            else
                                return (<><Text style={[ GlobalStyle.CustomFontRegular, styles.down_left]}>{item_down_left}</Text><View style={{width: 12}} /></>)
                        })}
                    </View>
                    <View style={styles.wrapper_t}>
                        {item?.down_right?.map((item_text) => (
                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.down_right,
                            {color: '#F04438'}
                        ]}
                        >
                            {item_text}
                        </Text>
                        ))}
                    </View>
                </View>
            </View>
        ))}
        </>
    );
}