import React from 'react';
import {StyleSheet, Dimensions, ActivityIndicator, View} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {Colors} from "../utils/Colors";
import { GlobalSvgSelector } from '../assets/GlobalSvgSelector';
import {Loader as LoaderFull} from "./loader/Loader";
import {Footer} from "./footer/Footer";


export const Loader = () => {

  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <GlobalSvgSelector id='root' />
        <View style={styles.loader}>
        <LoaderFull />
        </View>
      </View>

      <Footer />
    </View>
  );
};

const width_logo = width * 0.88;

const styles = StyleSheet.create({
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