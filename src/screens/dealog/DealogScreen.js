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
    const {data, index} = route.params;
    const auth = useContext(AuthContext);
    const dataRoot = useContext(DataContext);
    const dataLang = useContext(DataLangContext);
    const chatRoot = useContext(ChatContext);
    const {loading, request, error, clearError} = useHttp();
    const [textMeassage, setTextMeassage] = useState("");
    let scrollView = useRef(null);

    useEffect(() => {
        if (data) {
            chatRoot.openChat(data);
        }
    }, [data]);

    const exitHandler = () => {
        let new_data = [...chatRoot.data];
        new_data[index].count_new_messages = 0;
        chatRoot.setData(new_data);
        navigation.goBack();
        chatRoot.exitChat();
    }

    const renderItem = (item) => {
        return <Meassage key={item.item.id} data={item.item} myId={chatRoot.myId}/>;
    }

    const sendMeassage = () => {
        if (!textMeassage.length) return;
        try {
            chatRoot.sendMeassage(textMeassage);
            setTextMeassage("");
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
                placeholder='Сообщений...'
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

