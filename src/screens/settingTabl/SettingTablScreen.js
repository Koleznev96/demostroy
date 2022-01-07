import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    ScrollView,
    Text,
    LayoutAnimation,
    Pressable,
    Vibration,
    Dimensions
} from 'react-native';
import { styles } from "./useStyles";
import {HeaderBreack} from "../../components/headerBreack/HeaderBreack";
import {DataContext} from "../../context/DataContext";
import GlobalStyle from "../../components/GlobalStyle";
import {DataLangContext} from "../../context/DataLangContext";
import {ButtonFull} from "../../components/buttonFull/ButtonFull";
import {Popap} from "../../components/popap/Popap";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import {
    DragContainer,
    Draggable,
    DropZone,
} from "react-native-drag-drop-and-swap";
import { Colors } from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');


class DraggyInner extends React.Component {
    render() {
        if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
            LayoutAnimation.easeInEaseOut();
            return (
                <View style={{
                    marginLeft: 8,
                    marginRight: 8,
                    width: this.props.status ? (width-69)/2 : (width-56),
                    height: 50,
                    paddingHorizontal: 13,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#303240',
                    borderRadius: 20,
                    alignItems: 'center',
                    ...Colors.BoxShadow,
                    }}>
                    <View style={{...styles.wrapper}}>
                    <GlobalSvgSelector id='rew' />
                    <Text 
                    style={[
                    GlobalStyle.CustomFontRegular,
                    this.props.alphabet?.status ? styles.setting_item_label_active : styles.setting_item_label,
                    ]}>
                        {this.props.status ? (this.props.alphabet?.label?.length > 10 ? (this.props.alphabet?.label?.slice(0, 8) + '...') : this.props.alphabet?.label) : this.props.alphabet?.label}
                    </Text>
                    </View>
                    <Pressable
                    style={styles.button_on}
                    >
                    <GlobalSvgSelector id={this.props.alphabet?.status ? 'glass_open' : 'glass_exit'} />
                    </Pressable>
                </View>
            );
        }
        return (
            <View style={{
                marginLeft: 8,
                marginRight: 8,
                width: this.props.status ? (width-69)/2 : (width-56),
                height: 50,
                paddingHorizontal: 13,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: this.props.alphabet?.status ? Colors.FirstColor : '#303240',
                borderRadius: 20,
                alignItems: 'center',
                ...Colors.BoxShadow,
            }}>
                <View style={styles.wrapper}>
                <GlobalSvgSelector id='rew' />
                <Text 
                style={[
                GlobalStyle.CustomFontRegular,
                this.props.alphabet?.status ? styles.setting_item_label_active : styles.setting_item_label,
                ]}>
                    {this.props.status ? (this.props.alphabet?.label?.length > 10 ? (this.props.alphabet?.label?.slice(0, 8) + '...') : this.props.alphabet?.label) : this.props.alphabet?.label}
                </Text>
                </View>
                <Pressable
                style={styles.button_on}
                onPress={() => this.props.onItemHandler(this.props.liner, this.props.status)}
                >
                <GlobalSvgSelector id={this.props.alphabet?.status ? 'glass_open' : 'glass_exit'} />
                </Pressable>
            </View>
        );
    }
}

class DraggyInsert extends React.Component {
    render() {
        if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
            LayoutAnimation.easeInEaseOut();
            return (
                <View style={{width: width-40, height: 60,}} />
            );
        }
        return (
            <View style={{width: width-40, height: 15}} />
        );
    }
}

const Draggy = ({key, status, liner, alphabet, onHover, onDrop, onInsert, index, onItemHandler}) => {

    return (
        <Draggable data={alphabet}>

            <DropZone
            onDrop={e => onDrop(e, index, status, liner)}
            onEnter={e =>
                onHover(alphabet, index)
            }
            >
            <DraggyInner
                status={status}
                liner={liner}
                alphabet={alphabet}
                index={index}
                onItemHandler={onItemHandler}
            />
            </DropZone>
        </Draggable>
    );
}

function SettingTablScreen({ navigation }) {
    const dataRoot = useContext(DataContext);

    const [state, setState] = useState({
        alphabets: null,
        hoverData: {},
        dropData: {},
        hoverDataIndex: null
    });

    useEffect(() => {
        let new_data = [];
        for (let i = 0; i < dataRoot?.settingTabl?.length; i++) {
            new_data.push([{...dataRoot?.settingTabl[i][0]}, dataRoot?.settingTabl[i][1] ? {...dataRoot?.settingTabl[i][1]} : null]);
        }
        setState({...state, alphabets: [...new_data]});
    }, [dataRoot?.settingTabl]);

    const backHandler = () => {
        navigation.goBack();
    }

    const onItemHandler = (liner, status) => {
        let new_data_setting = [...state?.alphabets];
        new_data_setting[liner[0]][liner[1]].status = !new_data_setting[liner[0]][liner[1]].status;
        setState({...state, alphabets: [...new_data_setting]});
    }

    const newHandler = () => {
        dataRoot.editSettingTabl([...state?.alphabets]);
        navigation.goBack();
    }

    const onDrop = (data, index, status, liner) => {
        if (status) {
            return null;
        }
        let new_data = [];
        for (let i = 0; i < state?.alphabets?.length; i++) {
            if (state?.alphabets[i][0] === data) {
                if (i === liner[0]) {
                    new_data.push([...state?.alphabets[i]]);
                    continue;
                }
                if (state?.alphabets[i][1]) {
                    new_data.push([{...state?.alphabets[i][1]}]);
                }
                continue;
            }
            if (state?.alphabets[i][1] && state?.alphabets[i][1] === data) {
                if (i === liner[0]) {
                    new_data.push([...state?.alphabets[i]]);
                    continue;
                }
                if (state?.alphabets[i][0]) {
                    new_data.push([{...state?.alphabets[i][0]}]);
                }
                continue;
            }
            if (i === liner[0]) {
                new_data.push([{...state?.alphabets[i][0]}, data]);
            } else {
                new_data.push([{...state?.alphabets[i][0]}, state?.alphabets[i][1] ? {...state?.alphabets[i][1]} : null]);
            }
        }
        setState({...state, alphabets: [...new_data]});
    }

    const onInsert = (data, index, status, liner) => {
        let new_data = [];
        for (let i = 0; i < state?.alphabets?.length; i++) {
            if (state?.alphabets[i][0] === data) {
                if (i === liner[0]) {
                    new_data.push([{...data}]);
                    if (state?.alphabets[i][1])
                    new_data.push([{...state?.alphabets[i][1]}]);
                    continue;
                }
                if (state?.alphabets[i][1]) {
                    new_data.push([{...state?.alphabets[i][1]}]);
                }
                continue;
            }
            if (state?.alphabets[i][1] && state?.alphabets[i][1] === data) {
                if (i === liner[0]) {
                    new_data.push([{...data}]);
                    new_data.push([{...state?.alphabets[i][0]}]);
                    continue;
                }
                if (state?.alphabets[i][0]) {
                    new_data.push([{...state?.alphabets[i][0]}]);
                }
                continue;
            }
            if (i === liner[0]) {
                new_data.push([{...data}]);
                new_data.push([...state?.alphabets[i]]);
            } else {
                new_data.push([{...state?.alphabets[i][0]}, state?.alphabets[i][1] ? {...state?.alphabets[i][1]} : null]);
            }
        }
        setState({...state, alphabets: [...new_data]});
    }
    
    const onHover = (hoverData, hoverDataIndex) => {
        setState({ ...state, hoverData, hoverDataIndex });
    }

    const zvon = () => {
        Vibration.vibrate(100);
    }
    
    return (
        <>
        <Popap />

        <View style={styles.body}>
            <HeaderBreack data={{title: 'Настройки таблицы', callback_back: backHandler}}/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <DragContainer
                onDragStart={() => zvon()}
                >
                    {state?.alphabets?.map((item, index) => {
                        return (
                            <>
                            <Draggable data={item[0]}>
                                <DropZone
                                onDrop={e => onInsert(e, index, false, [index, 0])}
                                >
                                    <DraggyInsert
                                        status={false}
                                        liner={[index, 0]}
                                        alphabet={item[0]}
                                        index={index}
                                    />
                                </DropZone>
                            </Draggable>
                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between'
                            }}>
                            <Draggy
                            key={index}
                            status={item[1] ? true : false}
                            liner={[index, 0]}
                            alphabet={item[0]}
                            onHover={onHover}
                            onDrop={onDrop}
                            onInsert={onInsert}
                            index={index}
                            onItemHandler={onItemHandler}
                            />
                            
                            {item[1] ? (
                            <Draggy
                            key={index}
                            status={item[1] ? true : false}
                            liner={[index, 1]}
                            alphabet={item[1]}
                            onHover={onHover}
                            onDrop={onDrop}
                            onInsert={onInsert}
                            index={index}
                            onItemHandler={onItemHandler}
                            />
                            ) : null}
                            </View>
                            </>
                        )
                    })}
                </DragContainer>
                <ButtonFull data={{value: 'Сохранить', change: newHandler, styles: styles.button_bottom}}/>
                <View style={styles.block_defoult} />
            </ScrollView>
            
        </View>
        </>
    );
}

export default SettingTablScreen;

