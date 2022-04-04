import React from "react";
import { Image } from 'react-native';
import { AppState, AsyncStorage } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useHttp} from "./hooks/http.hook";
import {Icon} from "./components/icon/Icon";
import {MenuSvgSelector} from './assets/MenuSvgSelector';
import { AuthContext } from "../../context/authContext";

import HomeScreen from './screens/home/HomeScreen';
import SettingScreen from './screens/setting/SettingScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import ChatScreen from './screens/chat/ChatScreen';

import UrlScreen from './screens/auth/UrlScreen';
import SplashScreen from './screens/splash/SplashScreen';
import SplashOneScreen from './screens/splash/SplashOneScreen';
import AuthorizationScreen from './screens/auth/AuthorizationScreen';
import ViewScreen from './screens/view/ViewScreen';
import DitailsScreen from './screens/ditails/DitailsScreen';
import ListScreen from './screens/list/ListScreen';

import DealogScreen from './screens/dealog/DealogScreen';
import CreateScreen from './screens/create/CreateScreen';
import DirectoriesCreateScreen from './screens/directoriesCreate/DirectoriesCreateScreen';
import EditScreen from './screens/edit/EditScreen';
import DirectoriesEditScreen from './screens/directoriesEdit/DirectoriesEditScreen';

import FilterScreen from './screens/filter/FilterScreen';
import SettingTablScreen from './screens/settingTabl/SettingTablScreen';
import ProfileScreen from './screens/profile/ProfileScreen';

import MapScreen from './screens/map/MapScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const StackHomeRoutes = () => (
//   <Stack.Navigator initialRouteName='Home'>
//     <Tab.Screen name ='Home' component={HomeScreen} options={{ headerShown: false, tabBarLabel: 'Elsadchess' }}/>
//     <Tab.Screen name ='Elsadchess' component={ElsadchessScreen} options={{ headerShown: false, tabBarLabel: 'Elsadchess' }}/>
//     <Stack.Screen name='ProfileView' component={ProfileViewScreen} options={{ headerShown: false }}/>
//   </Stack.Navigator>
// );

// const StackRoutes = () => (
//   <Tab.Navigator
//     initialRouteName='Home'
//     tabBarOptions={{
//       keyboardHidesTabBar: true,
//       activeTintColor: '#4FC574',
//       inactiveTintColor: '#A3ACA6',
//       height: 200,
//     }}
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         if (route.name === 'Home') {
//           if (!focused)
//           return (
//             <MenuSvgSelector id="elsadchess" />
//           ); 
//           else 
//           return (
//             <MenuSvgSelector id="elsadchess_active" />
//           ); 
//         } else if (route.name === 'Tasks') {
//           if (!focused)
//           return (
//             <MenuSvgSelector id="tasks" />
//           ); 
//           else 
//           return (
//             <MenuSvgSelector id="tasks_active" />
//           ); 
//         } else if (route.name === 'Timetable') {
//           if (!focused)
//           return (
//             <MenuSvgSelector id="timetable" />
//           ); 
//           else 
//           return (
//             <MenuSvgSelector id="timetable_active" />
//           ); 
//         } else if (route.name === 'Profile') {
//           if (!focused)
//           return (
//             <MenuSvgSelector id="profile" />
//           ); 
//           else 
//           return (
//             <MenuSvgSelector id="profile_active" />
//           ); 
//         }
//       }
//     })}
//   >
//     <Tab.Screen name ='Home' component={HomeScreen} options={{ headerShown: false, tabBarLabel: 'Elsadchess' }}/>
//   </Tab.Navigator>
// );


const StackRootRoutes = (isAuth, isUrl) => {
  if (isAuth)
  return ( 
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Dashboard' component={DashboardScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Chat' component={ChatScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Dealog' component={DealogScreen} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="Home" options={{ headerShown: false }}>
        {props => <HomeScreen {...props} />}
      </Stack.Screen> */}
      <Stack.Screen name='Setting' component={SettingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Create' component={CreateScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='View' component={ViewScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Ditails' component={DitailsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='List' component={ListScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='DirectoriesCreate' component={DirectoriesCreateScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Edit' component={EditScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='DirectoriesEdit' component={DirectoriesEditScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Filter' component={FilterScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='SettingTabl' component={SettingTablScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
  else {
    if (isUrl && !isAuth) 
    return ( 
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name='Login' component={AuthorizationScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
    else
    return ( 
      <Stack.Navigator initialRouteName={'Url'}>
        {/* <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name='Url' component={UrlScreen} options={{ headerShown: false }}/>
        {/* <Stack.Screen name='Login' component={AuthorizationScreen} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    );
  }
}


export const Routes = (isAuth, isUrl) => {
  const {loading, request, error, clearError} = useHttp();
  // const stackRootRoutes = StackRootRoutes(isAuth);

  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Map'>
        <Stack.Screen name='Map' component={MapScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='SplashOne' component={SplashOneScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Root' component={() => StackRootRoutes(isAuth, isUrl)} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}