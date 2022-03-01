import React, {useContext, useState, useCallback, useEffect, useRef} from 'react';
import {
    View,
    ScrollView,
    TextInput,
    FlatList
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {HeaderDealog} from "../../components/headerDealog/HeaderDealog";
import {MenuContext} from "../../context/MenuContext";
import {DataContext} from "../../context/DataContext";
import {DataLangContext} from "../../context/DataLangContext";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Popap} from "../../components/popap/Popap";
import { ChatContext } from '../../context/ChatContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import { Colors } from "../../utils/Colors";
import {Meassage} from "../../components/meassage/Meassage";
import { Loader } from '../../components/loader/Loader';


function DialogScreen({ navigation, route }) {
    const {data} = route.params;
    const auth = useContext(AuthContext);
    const dataRoot = useContext(DataContext);
    const dataLang = useContext(DataLangContext);
    const chatRoot = useContext(ChatContext);
    const {loading, request, error, clearError} = useHttp();
    const [textMeassage, setTextMeassage] = useState("");
    let scrollView = useRef(null);

    useEffect(() => {
        chatRoot.openChat(data);
    }, []);

    const exitHandler = () => {
        navigation.goBack();
        chatRoot.exitChat();
    }

    const renderItem = (item) => {
        return <Meassage key={item.item.id} data={item.item} />;
    }

    const sendMeassage = () => {
        if (!textMeassage.length) return;
        try {
            chatRoot.sendMeassage(textMeassage);
            setTextMeassage("");
            // const data = await request(`${auth.url_str}/mobile/chat/history?user_id=${id ? id : data_chat}&token=${auth.token}&p=0`, 'GET', null, {
            //     "Api-Language": auth.lenguage.value
            // });
            // setMeassages(data?.data);
        } catch (e) {}
    }    

    return (
        <>
        <Popap />
        <SafeAreaView
            style={styles.body}
        > 
            <HeaderDealog data={data} exitHandler={exitHandler} />
            {/* <ScrollView 
            style={styles.scrollView} 
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100,}}
            ref={ref => {scrollView = ref}}
            // onContentSizeChange={() => scrollView?.scrollToEnd()}
            >
                {chatRoot.meassages?.map(item => (
                    <Meassage data={item} />
                ))}
            </ScrollView> */}
            {chatRoot.refresh ? (
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', paddingTop: 40,}}>
                    <Loader />
                </View>
            ) : (
            <FlatList 
                inverted={true}
                style={styles.scrollView} 
                contentContainerStyle={{paddingTop: 120, paddingBottom: 20,}} 
                data={chatRoot.meassages}
                renderItem={renderItem} 
                keyExtractor={item => item.id}
                onEndReached={() => chatRoot.paginashion()}
                onEndReachedThreshold={0.3}
                // initialNumToRender={20}
            />
            )}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}>
                    <GlobalSvgSelector id="srep" />
                </TouchableOpacity>
                <TextInput
                value={textMeassage}
                placeholder='Поиск'
                placeholderTextColor={Colors.Placeholder}
                onChangeText={(value) => setTextMeassage(value)}
                style={styles.text_input}
                />
                <TouchableOpacity 
                style={styles.button}
                onPress={() => sendMeassage()}
                >
                    <GlobalSvgSelector id={textMeassage.length ? "send" : "audio"} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </>
    );
}

export default DialogScreen;

