import React, { useState, useContext } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    Pressable
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import {Colors} from "../../../utils/Colors";
import DocumentPicker from 'react-native-document-picker';
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';


export const FileForm = ({ data }) => {
    const auth = useContext(AuthContext);
    const [isUploading, setIsUploading] = useState(false);

    const openFile = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            uploadFile(res[0].uri, res[0].name, res[0].type);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err
            }
        }
    }

    const uploadFile = async (image_uri, fileName, type) => {
        setIsUploading(true);
        let base_url = `${auth.url_str}/mobile${data.url}/file?token=${auth.token}`
        let uploadData = new FormData();
        uploadData.append('file', {type: type, uri: image_uri, name: fileName});
        await fetch(base_url, {
            method: 'post',
            body: uploadData,
            headers: {Authorization: `${auth.token}`}
        }).then(response => response.json())
        .then(response => {
            if (response.link) {
                data.change({name: data.name, value: response.link}, data.index)
                setIsUploading(false);
            } else {
                setIsUploading(false);
            }
        }).catch(() => {
            setIsUploading(false);
        })
    }

    return (
        <View style={styles.root}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{data.label}</Text>
        <Pressable style={styles.liner}>
        <Text style={styles.value}
        onPress={() => openFile()}
        >
            {data.value[data.name] ? (data.value[data.name].split('/')[data.value[data.name].split('/').length - 1].length > 40 ? (data.value[data.name].split('/')[data.value[data.name].split('/').length - 1].slice(0, 36) + '...') : data.value[data.name].split('/')[data.value[data.name].split('/').length - 1]) : 'Выберите файл'}
        </Text>
        {isUploading ? (
            <ActivityIndicator size={20} color={Colors.Orange} style={styles.loader}/>
        ) : (
        <Pressable 
        style={styles.button}
        onPress={() => openFile()}
        >
            <GlobalSvgSelector id='file'/>
        </Pressable>
        
        )}
        </Pressable>
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontRegular, styles.error_text]}>
                {data.error}
        </Text> : null}
        </View>
    );
}

