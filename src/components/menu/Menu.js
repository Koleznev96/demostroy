import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Keyboard,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {SettingDataContext} from "../../context/SettingDataContext";
import {MenuContext} from "../../context/MenuContext";
import {DataContext} from "../../context/DataContext";
import {item_setting} from "../../provider/MenuProvider";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import {Colors} from "../../utils/Colors";
import LinearGradient from 'react-native-linear-gradient';
import {MenuSvgSelector} from "../../assets/MenuSvgSelector";
import FontAwesome, { parseIconFromClassName, parseIconName, SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';


export const Menu = ({ navigation, status, noActive }) => {
    const menuRoot = useContext(MenuContext);
    const settingDataRoot = useContext(SettingDataContext);
    const dataRoot = useContext(DataContext);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [one_data, set_one_data] = useState([]);
    const [two_data, set_two_data] = useState([]);
    const [three_data, set_three_data] = useState([]);
    const [four_data, set_four_data] = useState([]);
    const [is_open, set_is_open] = useState(false);

    useEffect(() => {
        let new_one = [];
        let new_two = [];
        let new_three = [];
        let new_four = [];
        menuRoot.listMenu?.forEach((item, index) => {
            if (index % 4 === 0) new_one.push(item);
            if ((index - 1) % 4 === 0) new_two.push(item);
            if ((index - 2) % 4 === 0) new_three.push(item);
            if ((index - 3) % 4 === 0) new_four.push(item);
        });
        set_one_data(new_one);
        set_two_data(new_two);
        set_three_data(new_three);
        set_four_data(new_four);
    }, [menuRoot.listMenu])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true); // or some other action
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false); // or some other action
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    
    if (isKeyboardVisible || !menuRoot.activeMenu) {
        return null;
    }

    const GetIconsMenu = (nameIcom, item) => {
        // const validIcon = parseIconFromClassName('fab fa-align-center');
        // return <FontAwesome style={{fontSize: 32}} icon={validIcon}></FontAwesome>;
        // <MenuSvgSelector id='root' data_style={{height: 78, width: width-28-40}} style={styles.menu} /> 
        if (menuRoot.activeMenu !== item)
            return <Icon name={nameIcom?.slice(6, nameIcom.length)} size={20} color={Colors.ColorIcon} />;
        else
            return <Icon name={nameIcom?.slice(6, nameIcom.length)} size={20} color={Colors.Orange} />;
    }

    const itemConstMenuHandler = (item) => {
        menuRoot.menuHandler(item);
        switch(item.url[0]){
            case '/setting':
                navigation.navigate('Setting');
        }
    }

    const createHandler = () => {
        set_is_open(false);
        if (status) {
            navigation.navigate({name: 'DirectoriesCreate', params: {url: settingDataRoot.url}})
        } else
        navigation.navigate({name: 'Create', params: {url: menuRoot.activeMenu.url[0], title: menuRoot.activeMenu.label}})
    }

    const itemMenuHandler = (item) => {
        dataRoot.addFilter(null);
        set_is_open(false);
        settingDataRoot.clearData();
        if(item.url[0] === "/maps") {
            menuRoot.menuHandler(item);
            navigation.navigate('Map');
        } else if(item.url[0] === "/chat") {
            menuRoot.menuHandler(item);
            navigation.navigate('Chat');
        } else if(item.url[0] === "/dashboard") {
            menuRoot.menuHandler(item);
            navigation.navigate('Dashboard');
        } else {
            if(!item.status_const){ 
                menuRoot.menuHandler(item); 
                navigation.navigate({name: 'Home', params: {status: false}});
            } 
            else {
                itemConstMenuHandler(item);
            }
        }
    }

    return (
        <>
        {/* <View style={{width: '100%', height: 100, backgroundColor: '#fff'}} /> */}
        <LinearGradient
        useAngle={true}
        colors={['rgba(60, 63, 79, 0)', 'rgba(60, 63, 79, 0.1)', 'rgba(60, 63, 79, 1)', 'rgba(60, 63, 79, 1)', 'rgba(60, 63, 79, 1)', 'rgba(60, 63, 79, 1)']}
        angle={180}
        style={styles.panelBorder}
        >
            <View style={is_open ? styles.menu_active : styles.menu}>
            <View style={styles.lin_item}>
            {one_data.slice(0, is_open ? one_data.length : 1).map((item, index) => (
                <TouchableOpacity
                style={is_open ? styles.item_menu_active : styles.item_menu}
                onPress={() => itemMenuHandler(item)}
                >
                    {GetIconsMenu(item.icon, item)}
                    <Text 
                    style={[
                    GlobalStyle.CustomFontRegular,
                    styles.text_item_menu,
                    menuRoot.activeMenu === item ? styles.text_item_menu_active : null,
                    ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={styles.lin_item}>
            {two_data?.slice(0, is_open ? two_data.length : 1).map((item, index) => (
                <TouchableOpacity
                style={is_open ? styles.item_menu_active : styles.item_menu}
                onPress={() => itemMenuHandler(item)}
                >
                    {GetIconsMenu(item.icon, item)}
                    <Text 
                    style={[
                    GlobalStyle.CustomFontRegular,
                    styles.text_item_menu,
                    menuRoot.activeMenu === item ? styles.text_item_menu_active : null,
                    ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={{width: 65,}} />
            <View style={styles.lin_item}>
            {three_data.slice(0, is_open ? three_data.length : 1).map((item, index) => (
                <TouchableOpacity
                style={is_open ? styles.item_menu_active : styles.item_menu}
                onPress={() => itemMenuHandler(item)}
                >
                    {GetIconsMenu(item.icon, item)}
                    <Text 
                    style={[
                    GlobalStyle.CustomFontRegular,
                    styles.text_item_menu,
                    menuRoot.activeMenu === item ? styles.text_item_menu_active : null,
                    ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={styles.lin_item}>
            {four_data.slice(0, is_open ? four_data.length : 1).map((item, index) => (
                <TouchableOpacity
                style={is_open ? styles.item_menu_active : styles.item_menu}
                onPress={() => itemMenuHandler(item)}
                >
                    {GetIconsMenu(item.icon, item)}
                    <Text 
                    style={[
                    GlobalStyle.CustomFontRegular,
                    styles.text_item_menu,
                    menuRoot.activeMenu === item ? styles.text_item_menu_active : null,
                    ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
            </View>

            <View style={styles.posit_center}>
                <View style={styles.box_circle}>
                <TouchableOpacity 
                style={status ? styles.circle : (menuRoot.activeMenu !== item_setting ? (noActive ? styles.circle_block : styles.circle) : styles.circle_block)}
                onPress={() => {status ? createHandler() : (menuRoot.activeMenu !== item_setting ? (noActive ? null : createHandler()) : null)}}
                >
                    <MenuSvgSelector id='plus' />
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.posit_center_bootm}>
                <TouchableOpacity style={styles.open} onPress={() => set_is_open(!is_open)}>
                    <MenuSvgSelector id={is_open ? 'clouse' : 'open'} />
                </TouchableOpacity>
            </View>
            </View>
        </LinearGradient>
        </>
    );
}

