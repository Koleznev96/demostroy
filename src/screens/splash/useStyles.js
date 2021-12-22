import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');
const width_logo = width * 0.88;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.FirstColor,
        paddingTop: height / 4,
        alignItems: 'center',
      },
      text: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
      },
      logocontainer: {
        justifyContent:'center',
        alignItems:'center',
        width: width_logo,
      },
      logo: {
        height: '80%',
      },
      loader: {
        marginTop: '60%',
      }
});