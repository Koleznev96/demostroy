import { StyleSheet, Platform } from 'react-native';

export const Colors = {
    FirstColor: '#232532',
    SecondColor: '#3C3F4F',
    Orange: '#EB9D40',
    TextWhite: '#fff',
    Placeholder: 'rgba(203, 217, 255, 0.6)',
    TextBlack: 'rgba(255, 255, 255, 0.5)',
    ColorInput: '#60687E',
    ColorIcon: '#CBD9FF',
    BoxShadowNew: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    BoxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: Platform.OS === 'ios' ? 5 : 8,
        elevation: 0.1,
    }
};

export const InputStyle = {
    width: '100%',
    height: 48,
    backgroundColor: Colors.ColorInput,
    borderRadius: 20,
    paddingHorizontal: 20,
    aliginItems: 'center',
    color: '#fff',
}