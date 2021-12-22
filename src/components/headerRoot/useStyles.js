import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 65,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    wrapper: {
        maxHeight: 40,
        alignItems: 'center',
        flexDirection: 'row',
    },
    name_screen: {
        marginLeft: 13,
        fontSize: 21,
        color: '#000'
    }
});