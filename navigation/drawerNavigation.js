import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen';
import MovieDesc from '../screens/MoviesScreen';
import Person from '../screens/PersonScreen';
import Search from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import UseAuth from '../hooks/useAuth';
import drawerScreen from '../screens/drawerScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNaviagtion() {

  const {user} = UseAuth();
  if(user){
    return (
      
    
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="drawer" component={drawerScreen} />
      </Drawer.Navigator>
          
      </NavigationContainer>
    );
  }
 
 
}