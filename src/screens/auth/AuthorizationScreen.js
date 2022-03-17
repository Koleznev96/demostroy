import React, {useContext, useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import GlobalStyle from "../../components/GlobalStyle";
import {styles} from "./useStyles";
import {InputFull} from "../../components/inputFull/InputFull";
import {ButtonFull} from "../../components/buttonFull/ButtonFull";
import {Footer} from "../../components/footer/Footer";
import PushNotification from 'react-native-push-notification';


function AuthorizationScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorField, setErrorField] = useState({
        login: '',
        password: '',
    });
    const [fcm_token, setFcm_token] = useState(null);

    const onPressBack = () => {
        navigation.goBack();
    };

    PushNotification.configure({
        onRegister: function(token) {
            console.log('hhhh')
            setFcm_token(token.token)
            console.log('5555555555555555-', token)
            // if (!auth.fcmToken) auth.addToken(token.token, auth.token);
        }
    });

    const AuthHandler = async () => {
        clearError();
        if (login.length === 0) {
            return setErrorField({
                login: 'Введите Логин',
                password: '',
            });
        }
        if (password.length === 0) {
            return setErrorField({
                login: '',
                password: 'Введите пароль',
            });
        }
        setErrorField({
            login: '',
            password: '',
        });
        try {
            const data = await request(`${auth.url_str}/mobile/default/login`, 'POST', {username: login.trim(), password: password.trim()}, {
                "Api-Language": auth.lenguage.value
            });
            // console.log('auth- ', data.token);
            try {
                // console.log('litl-', `${auth.url_str}/mobile/chat/set-token?token_push=${fcm_token}&token=${data.token}`)
                const set_token = await request(`${auth.url_str}/mobile/chat/set-token?token_push=${fcm_token}&token=${data.token}`, 'GET')
                // console.log('litl-answer', set_token)
            } catch (e) {
                // console.log('lolll-err', e)
            }
            auth.login(data.token);
        } catch (e) {
            setErrorField({
                login: 'Неверный логин или пароль',
                password: 'Неверный логин или пароль',
            });
        }
    };

    if (loading) {
        return <Loader />
    }

    return (
        <View style={styles.body}>
            <Text style={[GlobalStyle.CustomFontBold, styles.title]}>Авторизация</Text>
            <InputFull data={{value: login, change: setLogin, placeholder: 'Логин', error: errorField.login}} />
            <InputFull data={{value: password, change: setPassword, placeholder: 'Пароль', error: errorField.password, secret: true}} />
            <View style={styles.liner}>
                <TouchableOpacity style={styles.recet_password}>
                    <Text style={[GlobalStyle.CustomFontRegular, styles.recet_password_text]}>
                        {/* Забыли пароль? */}
                    </Text>
                </TouchableOpacity>
            </View>
            <ButtonFull data={{value: 'Войти', change: AuthHandler, styles: {marginTop: 15,}}} />
            <View style={styles.hr} />
            {/* <TouchableOpacity style={styles.button_registr}>
                <Text style={[GlobalStyle.CustomFontRegular, styles.button_registr_text]}>Регистрация</Text>
            </TouchableOpacity> */}

            <Footer />
        </View>
    );
}

export default AuthorizationScreen;

