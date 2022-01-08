import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {HeaderBreack} from "../../components/headerBreack/HeaderBreack";
import {MenuContext} from "../../context/MenuContext";
import {DataContext} from "../../context/DataContext";
import {DataLangContext} from "../../context/DataLangContext";
import {SettingDataContext} from "../../context/SettingDataContext";
import {InputForm} from "../../components/form/inputForm/InputForm";
import {NumberForm} from "../../components/form/numberForm/NumberForm";
import {DropDownForm} from "../../components/form/dropDownForm/DropDownForm";
import {DateForm} from "../../components/form/dateForm/DateForm";
import {TextForm} from "../../components/form/textForm/TextForm";
import {ButtonFull} from "../../components/buttonFull/ButtonFull";
import {MultipleForm} from "../../components/form/multipleForm/MultipleForm";
import {BooksForm} from "../../components/form/booksForm/BooksForm";
import {Popap} from "../../components/popap/Popap";
import GlobalStyle from "../../components/GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import { TouchableOpacity } from 'react-native-gesture-handler';


function ProfileScreen({ navigation, route }) {
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const dataRoot = useContext(DataContext);
    const settingDataRoot = useContext(SettingDataContext);
    const {loading, request, error, clearError} = useHttp();
    const [isPassword, setIsPassword] = useState(false);
    const [password, setPassword] = useState('••••••••••••••');
    const dataLang = useContext(DataLangContext);
    const [finalForm, setFinalForm] = useState({});
    const [lang, setLang] = useState(null);
    const [form, setForm] = useState(null);
    const [errorForm, setErrorForm] = useState({});

    const backHandler = () => {
        navigation.goBack();
    }

    const setPasswordHandler = () => {

    }

    const getProfile = async () => {
        try {
            const answer = await request(`${auth.url_str}/mobile/user/view?token=${auth.token}`, 'GET', null, {
                "Api-Language": auth.lenguage.value
            });
            setLang(answer.lang);
            setForm(answer.form);
            let new_data = {};
            Object.entries(answer.data)?.forEach(item => {
                if (item[0] === "id" || item[0] === "is_company_super_admin" || item[0] === "company_id") {

                } else {
                    if (item[1]) {
                        new_data[item[0]] = item[1];
                    }
                }
            });
            const new_errors = {};
            answer.form?.forEach(item => {
                new_errors[item.name] = '';
            });
            setErrorForm({...new_errors});
            setFinalForm(new_data);
        } catch(e) {}
    }

    const updatePofile = async (data) => {
        try {
            const answer = await request(`${auth.url_str}/mobile/user/update`, 'POST', {...data, token: auth.token}, {
                "Api-Language": auth.lenguage.value
            });
            if (answer.error) {
                const new_errors = {...errorForm};
                Object.entries(answer.error).forEach(item => {
                    new_errors[item[0]] = item[1];
                });
                setErrorForm({...new_errors});
            }
        } catch(e) {}
    }

    const changeRoot = (data) => {
        let new_data = Object.entries(finalForm);
        let answer = {};
        let flag = true;
        new_data.forEach((item) => {
            if (item[0] === data.name) {
                answer[item[0]] = data.value;
                flag = false;
            }
            else answer[item[0]] = item[1];
        });
        if (flag) {
            answer[data.name] = data.value;
        }
        updatePofile(answer);
        setFinalForm({...answer});
    };

    useEffect(() => {
        getProfile();
    }, []);

    const renderGetInput = ({data}) => {
        if (data.type === 'input') return <InputForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'number') return <NumberForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'dropdown') return <DropDownForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name], lang: dataLang.data}}/>;
        if (data.type === 'date') return <DateForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'text') return <View style={{paddingRight: 16,}}><TextForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/></View>;
        if (data.type === 'multiple') return <MultipleForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'books') return <BooksForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name], lang: dataLang.data}}/>;
        return null;
    }

    const updateLang = (data) => {
        auth.updateLenguage(data);
        getProfile();
        dataRoot.newRender();
        menuRoot.newRender();
    }

    return (
        <>
        <Popap />

        <View style={styles.body}>
            <HeaderBreack data={{title: 'Аккаунт', callback_back: backHandler}}/>
            <View style={styles.body_double}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.avatar}>
                    <Image style={styles.img} source={require('../../assets/images/avatar.png')}/>
                    </View>
                    <Text
                    style={[
                        GlobalStyle.CustomFontBold,
                        styles.title
                    ]}
                    >
                        {finalForm?.name}
                    </Text>
                    <View style={styles.info}>
                    <DropDownForm data={{...lang, change: updateLang, pik: auth.lenguage}}/>
                    {form?.map((item, index) => {
                        return renderGetInput({data: item});
                    })}
                    </View>
                    <View style={styles.block_defoult} />
                    <View style={styles.block_defoult} />
                    </ScrollView>
                    {/* <View style={styles.info_item}>
                        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>Логин</Text>
                        <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>ILYAPOPOV</Text>
                        <View style={styles.hr} />
                    </View>
                    <View style={styles.info_item}>
                        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>Пароль</Text>
                        <View style={styles.liner}>
                            <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>{password}</Text>
                            <TouchableOpacity style={styles.button_password} onPress={() => setPasswordHandler()}>
                                <GlobalSvgSelector id={isPassword ? 'glass_exit' : 'glass_open'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.hr} />
                    </View>
                    <View style={styles.info_item}>
                        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>Язык</Text>
                        <View style={styles.liner}>
                            <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>Русский</Text>
                            <TouchableOpacity style={styles.button_password} onPress={() => setPasswordHandler()}>
                                <GlobalSvgSelector id={'arrow_items'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.hr} />
                    </View> */}
            </View>
            <View style={styles.block_button}>
                <ButtonFull data={{value: 'Выйти', change: auth.logout}}/>
                <TouchableOpacity style={styles.button_exit} onPress={() => auth.fullLogout()}>
                    <Text style={[GlobalStyle.CustomFontRegular, styles.button_exit_text]}>Сменить сервер</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
    );
}

export default ProfileScreen;

