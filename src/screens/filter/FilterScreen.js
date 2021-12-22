import React, {useContext, useState} from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { styles } from "./useStyles";
import {HeaderBreack} from "../../components/headerBreack/HeaderBreack";
import {MenuContext} from "../../context/MenuContext";
import {DataContext} from "../../context/DataContext";
import {SettingDataContext} from "../../context/SettingDataContext";
import {InputForm} from "../../components/form/inputForm/InputForm";
import {NumberForm} from "../../components/form/numberForm/NumberForm";
import {DropDownForm} from "../../components/form/dropDownForm/DropDownForm";
import {DateForm} from "../../components/form/dateForm/DateForm";
import {TextForm} from "../../components/form/textForm/TextForm";
import {ButtonFull} from "../../components/buttonFull/ButtonFull";
import {MultipleForm} from "../../components/form/multipleForm/MultipleForm";
import {Popap} from "../../components/popap/Popap";


function FilterScreen({ navigation, route }) {
    const {status} = route.params;
    const auth = useContext(AuthContext);
    const menuRoot = useContext(MenuContext);
    const dataRoot = useContext(DataContext);
    const settingDataRoot = useContext(SettingDataContext);
    const {loading, request, error, clearError} = useHttp();
    const [finalForm, setFinalForm] = useState(status ? (settingDataRoot.filter ? settingDataRoot.filter : {}) : (dataRoot.filter ? dataRoot.filter : {}));

    const backHandler = () => {
        navigation.goBack();
    }

    const changeRoot = (data) => {
        let new_data = Object.entries(finalForm);
        let answer = {};
        let flag = true;
        new_data.forEach((item) => {
            if (item[0] === data.name) {
                if (data.value) {
                    answer[item[0]] = data.value;
                }
                flag = false;
            }
            else answer[item[0]] = item[1];
        });
        if (flag) {
            answer[data.name] = data.value;
        }
        setFinalForm({...answer});
    };

    const createHandler = () => {
        if (status) {
            settingDataRoot.addFilter(finalForm);
        } else {
            dataRoot.addFilter(finalForm);
        }
        backHandler();
    }

    const renderGetInput = ({data}) => {
        if (data.type === 'input') return <InputForm data={{...data, change: changeRoot, value: finalForm}}/>;
        if (data.type === 'number') return <NumberForm data={{...data, change: changeRoot, value: finalForm}}/>;
        if (data.type === 'dropdown') return <DropDownForm data={{...data, change: changeRoot, value: finalForm}}/>;
        if (data.type === 'date') return <DateForm data={{...data, change: changeRoot, value: finalForm}}/>;
        // if (data.type === 'text') return <TextForm data={{...data, change: changeRoot, value: finalForm}}/>;
        // if (data.type === 'multiple') return <MultipleForm data={{...data, change: changeRoot, value: finalForm}}/>;
        return null;
    }

    return (
        <>
        <Popap />

        <View style={styles.body}>
            <HeaderBreack data={{title: 'Фильтры', callback_back: backHandler}}/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.block_defoult} />
                {status ? (
                    settingDataRoot.form?.map((item, index) => {
                        return renderGetInput({data: item});
                    })
                ) : (
                    dataRoot.form?.map((item, index) => {
                        return renderGetInput({data: item});
                    })
                )}
                <ButtonFull data={{value: 'Показать', change: createHandler}}/>
                <View style={styles.block_defoult} />
            </ScrollView>
            
        </View>
        </>
    );
}

export default FilterScreen;

