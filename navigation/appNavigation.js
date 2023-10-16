import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDesc from '../screens/MoviesScreen';
import Person from '../screens/PersonScreen';
import Search from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function AppNaviagtion() {
  return (
    
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='home' component={HomeScreen}/>
            <Stack.Screen name='Movie' component={MovieDesc}/>
            <Stack.Screen name='Person' component={Person}/>
            <Stack.Screen name='Search' component={Search}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}