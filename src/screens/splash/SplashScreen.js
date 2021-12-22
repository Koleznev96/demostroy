import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { styles } from "./useStyles";
import { AuthContext } from "../../context/authContext";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import {Loader} from "../../components/loader/Loader";
import {Footer} from "../../components/footer/Footer";


const SplashScreen = ({navigation}) => {
  const auth = useContext(AuthContext);

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

export default SplashScreen;
