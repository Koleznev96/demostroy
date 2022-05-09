import React from 'react';
import {
    Text,
    View,
    Pressable
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import {Marker} from 'react-native-maps';
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';

export const MarkerMap = ({ key, title, description, coordinate, icon, hadnler }) => {
    // console.log("ggg-", title, description, coordinate, icon)
    return (
        <Marker
            onPress={() => hadnler({key, title, description})}
            key={key ? key : "1"}
            // title={title}
            // description={description}
            coordinate={coordinate}
        >
            <GlobalSvgSelector id="marker" />
            {/* <Image style={styles.avatar} source={require('../../assets/images/marker.png')} /> */}
            <View style={styles.marker}>
                <GlobalSvgSelector id={"marker-1"} />
            </View>
        </Marker>
    );
}

