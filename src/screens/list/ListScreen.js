import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    Pressable,
    FlatList
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {Menu} from "../../components/menu/Menu";
import {HeaderBreack} from "../../components/headerBreack/HeaderBreack";
import {Search} from "../../components/search/Search";
import {ListItem} from "../../components/listItem/ListItem";
import {MenuContext} from "../../context/MenuContext";
import {DataContext} from "../../context/DataContext";


function ListScreen({ navigation, route }) {
    const {url} = route.params;
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const dataRoot = useContext(DataContext);
    const {loading, request, error, clearError} = useHttp();
    const [data, setData] = useState(null);
    const [form, setForm] = useState(null);
    const [action, setAction] = useState(null);

    const backHandler = () => {
        navigation.goBack();
    }

    const menuHandler = () => {

    }

    const getView = async () => {
        try {
            const answer = await request(`${auth.url_str}/mobile${url}?token=${auth.token}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setData(answer?.data);
            setForm(answer?.form);
            setAction({action_left: answer?.action_left, action_right: answer?.action_right});
        } catch (e) {}
    }

    useEffect(() => {
        getView();
    }, []);

    const paginashion = () => {

    }

    const viewHandler = (data) => {
        navigation.navigate({
            name: 'View',
            params: {data}
        });
    }

    return (
        <View style={styles.body}>
            <View style={styles.coll}>
            <HeaderBreack data={{title: 'Заявка', callback_back: backHandler, callback_menu: menuHandler}}/>
            </View>
            <FlatList contentContainerStyle={styles.scrollView}
                data={data}
                renderItem={(item) => ListItem(item, viewHandler, {action})}
                keyExtractor={item => item.id}
                onEndReached={paginashion}
                onEndReachedThreshold={0.3}
            />
        </View>
    );
}

export default ListScreen;

