import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Keyboard,
    ScrollView
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import GlobalStyle from "../../components/GlobalStyle";
import {styles} from "./useStyles";
import {InputFull} from "../../components/inputFull/InputFull";
import {ButtonFull} from "../../components/buttonFull/ButtonFull";
import {Footer} from "../../components/footer/Footer";
import {Loader} from "../../components/Loader";


function UrlScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [urlField, setUrlField] = useState('');
    const [errorField, setErrorField] = useState('');

    const urlHandler = async () => {
        clearError();
        if (urlField.length === 0) {
            return setErrorField('Не вернно введен адрес');
        }
        setErrorField('');
        try {
            const data = await request(`${urlField}/mobile`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            if (data && data[0] === 'seccess') {
                auth.logUrl(urlField);
                navigation.navigate({
                    name: 'Login',
                    params: {url: urlField},
                });
            }
        } catch (e) {
            setErrorField('Не вернно введен адрес');
        }
    };

    if (loading) {
        return <Loader />
    }

    return (
        <View style={styles.body}>
            <Text style={[GlobalStyle.CustomFontBold, styles.title]}>Введите адрес вашей системы</Text>
            <InputFull data={{value: urlField, change: setUrlField, placeholder: 'http://'}} />
            {errorField.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
                {errorField}
            </Text> : null}
            <ButtonFull data={{value: 'Далее', change: urlHandler, styles: {marginTop: 20,}}} />

            <Footer />
        </View>
    );
}

export default UrlScreen;

