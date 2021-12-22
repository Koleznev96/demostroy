import React from 'react';
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
import {AuthContext} from "../../context/authContext";
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


export const EventItemView = ({ item, viewHandler, dataRoot, form }) => {
    const searchHandler = () => {

    }

    const filterHandler = () => {
        
    }

    return (
        <View style={styles.rootSt}>
            <View
            style={styles.gipol}
            >
            
            <Pressable 
            style={styles.root}
            key={item?.id?.toString()}
            onPress={() => viewHandler(item)}
            >
                {item ? (

                
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
                            {form ? (item ? (item[form[0]?.name]) : null) : null}
                            {/* {item ? Object.entries(item)[2][1] : null} */}

                        </Text>
                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.name
                        ]}
                        >
                            {form ? (item ? (item[form[1]?.name]) : null) : null}
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
                            {form ? (item ? (item[form[2]?.name]): null) : null}
                        </Text>
                        {form ? (item[form[3]?.name] ? (
                            <Text
                            style={[
                                GlobalStyle.CustomFontBold,
                                styles.date,
                            ]}
                            >
                                {form ? (item ? (item[form[3]?.name]) : null) : null}
                            </Text>
                        ) : null) : null}
                        
                    </View>

                    
                </View>
                ): null}
                
            </Pressable>
            </View>
        </View>
    );
}

