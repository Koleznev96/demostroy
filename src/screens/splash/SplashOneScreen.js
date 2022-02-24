import React from 'react';
import {
  View,
} from 'react-native';
import { styles } from "./useStyles";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import {Loader} from "../../components/loader/Loader";
import {Footer} from "../../components/footer/Footer";


const SplashOneScreen = ({navigation}) => {

  setTimeout(function () {
    navigation.navigate('Root')
  }, 3000);

  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <GlobalSvgSelector id='root' />
        <View style={styles.loader}>
        <Loader />
        </View>
      </View>

      <Footer />
    </View>
  );
};

export default SplashOneScreen;
