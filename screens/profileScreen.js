import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
  useColorScheme,
} from "react-native";
import {
  ChevronLeftIcon,
  PencilSquareIcon,
  ArrowRightOnRectangleIcon,FilmIcon, UserCircleIcon
} from "react-native-heroicons/outline";
import {HeartIcon, UserIcon} from 'react-native-heroicons/solid'
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import tw, { useAppColorScheme } from "twrnc";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const Profile = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await signOut(auth);
  };
  

  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
      <View style={tw`w-90 ml-5 mr-3 `}>
        {/* Header */}
        <View
          style={tw`flex flex-row  m-3 items-center justify-between -mb-5 `}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`rounded-xl p-1 bg-amber-500`}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <Text style={tw`text-2xl p-5 mb-2 text-white `}>Profile</Text>
          <TouchableOpacity>
            <PencilSquareIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
        </View>

        {/*Profile  */}
        <View style={tw`flex   items-center `}>
          {/* Image */}
          <View>
            <Image
              source={require("../assets/Nihar.jpg")}
              style={tw`w-35 h-35 rounded-full border-white border-8  mt-10 `}
            />
          </View>
          {/* Image Background */}
          <View
            style={tw`flex  items-center bg-neutral-700 mt-10  ml-4 mr-4 w-80 rounded-lg `}
          >
            <Text style={tw`text-xl font-bold p-5 text-white`}>
              Nihar Chandra Sharma
            </Text>
          </View>


          {/* Favorites Movies */}
          <View
            style={tw`flex   bg-neutral-700 mt-10 p-5  ml-4 mr-4 w-80 rounded-lg `}
          >
            <View style={tw`flex flex-row ml-2 justify-between`}>
              <Text style={tw`text-lg ml-3 text-white font-bold`}>Favourites Movies</Text>
              <TouchableOpacity >
            <FilmIcon size="35" color={ "#eab308" } />
          </TouchableOpacity>
            </View>
          </View>

          {/* Favorites Actors */}
          <View
            style={tw`flex   bg-neutral-700 mt-10 p-5  ml-4 mr-4 w-80 rounded-lg `}
          >
            <View style={tw`flex flex-row ml-2 justify-between`}>
              <Text style={tw`text-lg ml-3 text-white font-bold`}>Favourites Actors</Text>
              <TouchableOpacity >
            <UserCircleIcon size="35" color={ "#eab308" } />
          </TouchableOpacity>
            </View>
          </View>
        
          
          {/* Logout */}
          <View
            style={tw`flex   bg-neutral-700 mt-10 p-5  ml-4 mr-4 w-80 rounded-lg `}
          >
            <View style={tw`flex flex-row ml-2 justify-between`}>
              <Text style={tw`text-lg ml-3 text-white font-bold`}>Logout</Text>
              <TouchableOpacity onPress={handleLogout}>
                <ArrowRightOnRectangleIcon size="28" strokeWidth={2.5} color="white" />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        
      </View>

      
    </SafeAreaView>
  );
};
export default Profile;
