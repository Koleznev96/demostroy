import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    Pressable
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {DataContext} from "../../context/DataContext";
import {MenuContext} from "../../context/MenuContext";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import {Colors} from "../../utils/Colors";
import LinearGradient from 'react-native-linear-gradient';
import {MenuSvgSelector} from "../../assets/MenuSvgSelector";
import FontAwesome, { parseIconFromClassName, parseIconName, SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import { TextInput } from 'react-native-gesture-handler';
import Interactable from 'react-native-interactable';


export const ListItem = ({ item }, viewHandler, redationHandler, deleteHandler, dataRoot, indexActive, itemHandler) => {
    const actionHandler = (url) => {
        dataRoot.newRender();
        switch(url) {
            case '/view':
                return viewHandler(item);
            case '/delete':
                return deleteHandler(item);
            case '/update':
                return redationHandler(item);
        }
    }

    const filterHandler = () => {
        
    }

    const GetIconsMenu = (nameIcom) => {
        return <Icon name={nameIcom?.slice(6, nameIcom.length)} size={22} color='#fff' />;
    }

    return (
        <View style={styles.rootSt} key={item.id.toString()}>
            <View style={styles.block_one} key={item.id.toString()}>
                <View style={styles.bod} key={item.id.toString()}>
                    <View style={styles.wrapper}>
                        {dataRoot.action?.action_left?.map(item => (
                            <TouchableOpacity
                            style={{...styles.button_left, backgroundColor: item.color}}
                            onPress={() => actionHandler(item.url)}
                            >
                                {GetIconsMenu(item.icon)}
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    <View style={styles.wrapper}>
                        {dataRoot.action?.action_right?.map(item => (
                            <TouchableOpacity
                            style={{...styles.button_rigth, backgroundColor: item.color}}
                            onPress={() => actionHandler(item.url)}
                            >
                                {GetIconsMenu(item.icon)}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
            
            <Interactable.View
            horizontalOnly={true}
            snapPoints={[{x: 0}, {x: dataRoot.action ? (dataRoot.action?.action_left.length * 60) : 0}, {x: dataRoot.action ? -(dataRoot.action?.action_right.length * 60) : 0}]}
            style={styles.gipol}
            >
            
            <Pressable 
            style={styles.root}
            key={item.id.toString()}
            onPress={() => itemHandler(item.id)}
            >
                <View style={styles.line}>
                    <View style={styles.line_dop}>
                    <View style={styles.circl} />
                    <View style={styles.bling}>
                        <Text
                        style={[
                            GlobalStyle.CustomFontBold,
                            styles.title
                        ]}
                        >
                            {dataRoot?.form ? (item[dataRoot?.form[0]?.name]) : null}
                        </Text>
                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.name
                        ]}
                        >
                            {dataRoot?.form ? (item[dataRoot?.form[1]?.name]) : null}
                        </Text>
                    </View>
                    </View>

                    <View style={styles.wrapper_l}>
                        <Text
                        style={[
                            GlobalStyle.CustomFontBold,
                            styles.price
                        ]}
                        >
                            {dataRoot?.form ? (item[dataRoot?.form[2]?.name]) : null}
                        </Text>
                        {dataRoot?.form ? (item[dataRoot?.form[3]?.name] ? (
                            <Text
                            style={[
                                GlobalStyle.CustomFontBold,
                                styles.date,
                            ]}
                            >
                                {dataRoot?.form ? (item[dataRoot?.form[3]?.name]) : null}
                            </Text>
                        ) : null) : null}
                    </View>
                </View>
                {item.id === indexActive ? (
                    <View style={styles.dop_info}>
                        {dataRoot?.form?.slice(4, dataRoot?.form?.length).map((liton, index) => (
                            <View style={styles.info_item}>
                                <View style={styles.liner}>
                                <View style={styles.wrapper_item}>
                                    <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{liton.label}</Text>
                                    <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>{item[liton.name]}</Text>
                                </View>
                                {/* {liton[1] ? (
                                    <View style={styles.wrapper_item_rigth}>
                                        <Text style={[GlobalStyle.CustomFontRegular, styles.label_rigth]}>{liton[1].status ? liton[1]?.label : null}</Text>
                                        <Text style={[GlobalStyle.CustomFontRegular, styles.value_rigth]}>{liton[1].status ? item[liton[1]?.name] : null}</Text>
                                    </View>
                                ) : null} */}
                                </View>
                                <View style={styles.hr} />
                            </View>
                        ))}
                    </View>
                ) : null}
                
            </Pressable>
            </Interactable.View>
        </View>
    );
}

