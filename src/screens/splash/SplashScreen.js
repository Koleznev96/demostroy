import React, {useContext, useEffect} from 'react';
import {
  View,
} from 'react-native';
import { styles } from "./useStyles";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import {Loader} from "../../components/loader/Loader";
import {Footer} from "../../components/footer/Footer";
import {MenuContext} from "../../context/MenuContext";


const SplashScreen = ({navigation}) => {
  const menuRoot = useContext(MenuContext);

  useEffect(() => {
    if (menuRoot.listMenu && menuRoot.listMenu[0]?.url[0] === "/dashboard") {
      menuRoot.menuHandler(menuRoot.listMenu[0]);
      navigation.navigate('Dashboard');
    } else {
      navigation.navigate('Home');
    }
  }, [menuRoot.listMenu])

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
