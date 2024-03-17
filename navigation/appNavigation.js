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
import otpScreen from '../screens/otpScreen';
import Profile from '../screens/profileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNaviagtion() {

  const {user} = UseAuth();
  if(user){
    return (
      
    
      <NavigationContainer>
          <Stack.Navigator initialRouteName='home' screenOptions={{headerShown:false}}>
              <Stack.Screen name='home' component={HomeScreen} user={user}/>
              <Stack.Screen name='Movie' component={MovieDesc}/>
              <Stack.Screen name='Person' component={Person}/>
              <Stack.Screen name='Search' component={Search}/>
              <Stack.Screen name='Profile' component={Profile}/>
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else{
    return (
    
      <NavigationContainer>
          <Stack.Navigator initialRouteName='signup' screenOptions={{headerShown:false}}>
              
              <Stack.Screen name='login' component={LoginScreen}/>
              <Stack.Screen name='otp' component={otpScreen}/>
              <Stack.Screen name='signup' component={SignupScreen}/>
              
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
 
}