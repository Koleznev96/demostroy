import React, {useContext, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {MenuContext} from "../../context/MenuContext";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from "../../utils/Colors";


const items_menu = [
    {
        icon: <GlobalSvgSelector id='menu_item_1' />,
        label: 'Настройка таблицы',
    },
    {
        icon: <GlobalSvgSelector id='menu_item_2' />,
        label: 'Импорт',
    },
    {
        icon: <GlobalSvgSelector id='menu_item_3' />,
        label: 'Скачать акт',
    },
    {
        icon: <GlobalSvgSelector id='menu_item_4' />,
        label: 'Распечатать',
    },
]

export const HeaderIndex = ({menuHeaderHandler, callback_person, updateValue, openUpdatePopap}) => {
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const [isOpen, setIsOpen] = useState(false);

    const openHandler = () => {
        if (menuRoot.activeMenu.url[0] !== '/setting')
        setIsOpen(true);
    }

    const exitHandler = () => {
        setIsOpen(false);
    }

    const GetIconsMenu = (nameIcom) => {
        return <Icon name={nameIcom?.slice(0, nameIcom.length)} size={20} color={Colors.Orange} />;
    }

    return (
        <>
        {isOpen ? (
            <Pressable 
            style={styles.blur}
            onPress={() => exitHandler()}
            >
                <View style={styles.popup}>
                    {items_menu.map((item, index) => (
                        <View style={styles.menu_item}>
                            <TouchableOpacity 
                            style={styles.liner}
                            onPress={() => {exitHandler(); menuHeaderHandler(item);}}
                            >
                                <View style={styles.icon}>
                                    {item.icon}
                                </View>
                                <Text 
                                style={[
                                GlobalStyle.CustomFontRegular,
                                styles.menu_item_label,
                                ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                            <View style={items_menu.length - 1 !== index ? styles.hr : null} />
                        </View>
                    ))}
                    <TouchableOpacity 
                    style={styles.button_exit}
                    onPress={() => exitHandler()}
                    >
                        <GlobalSvgSelector id='popup_exit' />
                    </TouchableOpacity>
                </View>
            </Pressable>
        ) : null}

        <View style={styles.root}>
            <Text
            style={[
                GlobalStyle.CustomFontBold,
                styles.text_item_menu
            ]}
            >
                {menuRoot.activeMenu?.label}
            </Text>

            <View style={styles.wrapper}>
                {updateValue ? <TouchableOpacity
                style={styles.button_update}
                onPress={() => openUpdatePopap()}
                >
                <GlobalSvgSelector id='update_version' />
                </TouchableOpacity>: null}

                <TouchableOpacity
                style={styles.button}
                onPress={() => callback_person()}
                >
                <GlobalSvgSelector id='person' />
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button_menu}
                // onPress={() => auth.logout()}
                onPress={() => openHandler()}
                >
                    <GlobalSvgSelector id='items_menu' />
                </TouchableOpacity>
            </View>
        </View>
        </>
    );
}

