import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        flex: 1,
        padding: (0, 16, 0, 16),
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
    },
    CustomFontRegular: {
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        color: '#fff',
    },
    CustomFontMedium: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        color: '#fff',
    },
    CustomFontBold: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        fontWeight: '600',
        color: '#fff',
    },
});