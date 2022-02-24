import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';


export const MainIcon = ({name, color, size}) => {
    // console.log('iii-', name, name?.slice(6, name?.length))
    switch (name?.slice(0, 2)) {
        case 'fa': return (<FontAwesome name={name?.slice(6, name?.length)} size={size} color={color} />);
        case 'bi': return (<Entypo name={name?.slice(6, name?.length)} size={size} color={color} />);
        default: return null;
    }
}