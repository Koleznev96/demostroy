import React, {useState, useContext, useEffect} from 'react';
import {
    Text,
    View,
    Pressable,
    TouchableOpacity,
    TextInput,
    FlatList,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';
import { PopapContext } from "../../../context/PopapContext";
import { AuthContext } from "../../../context/authContext";
import { useHttp } from "../../../hooks/http.hook";
import {Colors} from "../../../utils/Colors";


export const BooksForm = ({ data }) => {
    const popapRoot = useContext(PopapContext);
    const auth = useContext(AuthContext);
    const [value, setValue] = useState(null);
    
    const {loading, request, error, clearError} = useHttp();

    const getInit = async (id) => {
        try {
            const answer = await request(`${auth.url_str}/mobile${data.url[0] !== '/' ? ('/' + data.url) : data.url}?token=${auth.token}&id=${id}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setValue(answer.data[0]);
        } catch (e) {
        }
    }

    useEffect(() => {
        if (data.value && data.value[data.name]) {
            getInit(data.value[data.name]);
        }
    }, [data.value]);

    const itemHandler = (item) => {
        setValue(item);
        popapRoot.exitHandler();
        data.change({name: data.name, value: item.id}, data.index);
    }

    

    const DataPopap = () => {
        const [data_an, set_data_an] = useState([]);
        const [refresh, setRefresh] = useState(false);

        const getSearch = async (str) => {
            setRefresh(true);
            try {
                // console.log('===))', `${auth.url_str}/mobile/${data.url}?token=${auth.token}&${data.filter}=${str}`)
                const answer = await request(`${auth.url_str}/mobile/${data.url}?token=${auth.token}&${data.filter}=${str}`, 'GET', null, {
                    "Api-Language": auth.lenguage.value
                });
               set_data_an([...answer.data]);
            } catch (e) {}
            setTimeout(() => setRefresh(false), 10);
        }

        useEffect(() => {
            getSearch('');
        }, [])

        return (
        <>
            <View
            style={styles.liner_search}
            >
                <TextInput 
                // value={data.value[data.name]} 
                placeholderTextColor={Colors.Placeholder} 
                style={styles.input_search} 
                placeholder={'Поиск'} 
                onChangeText={(value) => getSearch(value)} 
                />
                <GlobalSvgSelector id='search' />
            </View>
            <View style={styles.block_items}>
            {refresh ? (
                <View style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                    <ActivityIndicator size={26} color={Colors.Orange} style={styles.loader}/>
                </View>
            ) : (
            data_an?.length === 0 ? (
                <Text style={[GlobalStyle.CustomFontRegular, styles.item]}>Записи не найдены</Text>
            ) : (
            // <FlatList
            //         contentContainerStyle={styles.scrollView}
            //         data={data_an}
            //         renderItem={(item, index) => (
            //             <>
            //                 <TouchableOpacity
            //                 style={styles.button_item}
            //                 onPress={() => itemHandler(item)}
            //                 >
            //                     <Text style={[GlobalStyle.CustomFontRegular, styles.item]}>{item[data.filter]}</Text>
            //                 </TouchableOpacity>
            //                 <View style={index !== data_an?.length - 1 ? styles.hr : null} />
            //             </>
            //         )}
            //         keyExtractor={item => item.id}
            //     />
                // 
            <ScrollView style={{width: '100%', maxHeight: 300,}}>
            {data_an?.map((item, index) => (
                <>
                <TouchableOpacity
                style={styles.button_item}
                onPress={() => itemHandler(item)}
                >
                    <Text style={[GlobalStyle.CustomFontRegular, styles.item]}>{item[data.filter]}</Text>
                </TouchableOpacity>
                <View style={index !== data_an?.length - 1 ? styles.hr : null} />
            </>))}</ScrollView>
            ))
            }
            </View>
        </>
        );
    }

    const openPopap = () => {
        popapRoot.dataChange(<DataPopap />);
        popapRoot.openHandler();
    }

    return (
        <View style={styles.root}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>
        <Pressable 
        style={[styles.input, data?.styles ? data.styles : null ]} 
        onPress={() => openPopap()}
        >
            <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>{value ? value[data.filter] : (data?.lang ? data?.lang['Выберите'] : "Выберите")}</Text>
            <GlobalSvgSelector id='arrow_items' />
        </Pressable>
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
            {data.error}
        </Text> : null}
        </View>
    );
}

