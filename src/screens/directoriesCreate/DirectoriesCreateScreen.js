import React, {useContext, useState, useCallback, useEffect} from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {HeaderBreack} from "../../components/headerBreack/HeaderBreack";
import {MenuContext} from "../../context/MenuContext";
import {SettingDataContext} from "../../context/SettingDataContext";
import {DataLangContext} from "../../context/DataLangContext";
import {InputForm} from "../../components/form/inputForm/InputForm";
import {NumberForm} from "../../components/form/numberForm/NumberForm";
import {DropDownForm} from "../../components/form/dropDownForm/DropDownForm";
import {DateForm} from "../../components/form/dateForm/DateForm";
import {TextForm} from "../../components/form/textForm/TextForm";
import {MultipleForm} from "../../components/form/multipleForm/MultipleForm";
import {BooksForm} from "../../components/form/booksForm/BooksForm";
import {ButtonFull} from "../../components/buttonFull/ButtonFull";
import {Popap} from "../../components/popap/Popap";
import {FileForm} from "../../components/form/fileForm/FileForm";
import {TimeForm} from "../../components/form/timeForm/TimeForm";
import {CheckForm} from "../../components/form/checkForm/CheckForm";


function DirectoriesCreateScreen({ navigation, route }) {
    const {url, form} = route.params;
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const settingDataRoot = useContext(SettingDataContext);
    const dataLang = useContext(DataLangContext);
    const {loading, request, error, clearError} = useHttp();
    const [finalForm, setFinalForm] = useState({});
    const [errorForm, setErrorForm] = useState({});

    useEffect(() => {
        const new_errors = {};
        settingDataRoot.form?.forEach(item => {
            // console.log('sikis-', item, item.value)
            new_errors[item.name] = '';
            if (item.value) {
                changeRoot({name: item.name, value: item.value});
            }
        });
        setErrorForm({...new_errors});
    }, [settingDataRoot.form]);

    const backHandler = () => {
        navigation.goBack();
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
        setFinalForm({...answer});
    };

    const createHandler = async() => {
        try {
            // console.log('iiiiiiiiisak-', `${auth.url_str}/mobile${url.split("?")[0]}/create`, {...finalForm, token: auth.token} )
            const data = await request(`${auth.url_str}/mobile${url.split("?")[0]}/create`, 'POST', {...finalForm, token: auth.token}, {
                "Api-Language": auth.lenguage.value
            });
            // console.log('11111')
            if (!data.error) {
                // console.log('2222-', data)
                settingDataRoot.newRender();
                backHandler();
            } else {
                // console.log('3333')
                const new_errors = {...errorForm};
                Object.entries(data.error).forEach(item => {
                    new_errors[item[0]] = item[1];
                });
                setErrorForm({...new_errors});
            }
        } catch (e) {
            // console.log('4444-', e)
            settingDataRoot.newRender();
            backHandler();
        }
    }

    const renderGetInput = ({data}) => {
        if (data.type === 'input') return <InputForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'number') return <NumberForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'dropdown') return <DropDownForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name], lang: dataLang.data}}/>;
        if (data.type === 'date') return <DateForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'text') return <TextForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'multiple') return <MultipleForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'books') return <BooksForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name], lang: dataLang.data}}/>;
        if (data.type === 'file') return <FileForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name], url, lang: dataLang.data}}/>;
        if (data.type === 'time') return <TimeForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        if (data.type === 'check') return <CheckForm data={{...data, change: changeRoot, value: finalForm, error: errorForm[data.name]}}/>;
        return null;
    }

    return (
        <>
        <Popap />

        <View style={styles.body}>
            <HeaderBreack data={{title: (dataLang?.data ? dataLang?.data['Добавить'] : 'Добавить') +  ' ' + settingDataRoot.title, callback_back: backHandler}}/>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
                <View style={styles.block_defoult} />
                {settingDataRoot.form?.map((item, index) => {
                    return renderGetInput({data: item});
                })}
                <ButtonFull data={{value: (dataLang?.data ? dataLang?.data['Создать'] : 'Создать'), change: createHandler}}/>
                <View style={styles.block_defoult} />
            </ScrollView>
            
        </View>
        </>
    );
}

export default DirectoriesCreateScreen;

