/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {
  View,
} from 'react-native';
import { Routes } from  "./Routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/authContext";
import {MenuProvider} from "./provider/MenuProvider";
import {DataProvider} from "./provider/DataProvider";
import {DataLangProvider} from "./provider/DataLangProvider";
import {SettingDataProvider} from "./provider/SettingDataProvider";
import {PopapProvider} from "./provider/PopapProvider";
import { ChatProvider } from "./provider/ChatProvider";
// import YaMap from 'react-native-yamap';


const App = () => {
  const {token, url_str, login, logUrl, logout, fullLogout, lenguage, updateLenguage, ready} = useAuth();

  // YaMap.init('bf54697f-7a05-4c12-8e35-9f4de680982f');

  const isAuth = !!token;
  const isUrl = !!url_str;

  const routes = Routes(isAuth, isUrl);

  return (
    <View style={{width: '100%', height: '100%', position: 'relative'}}>
    <AuthContext.Provider value={{
      token, url_str, login, logUrl, logout, fullLogout, lenguage, updateLenguage, ready
    }}>
      <ChatProvider>
        <MenuProvider>
          <DataProvider>
            <DataLangProvider>
              <SettingDataProvider>
                <PopapProvider>
                  {routes}
                </PopapProvider>
              </SettingDataProvider>
            </DataLangProvider>
          </DataProvider>
        </MenuProvider>
      </ChatProvider>
    </AuthContext.Provider>
    </View>
  );
};

export default App;
