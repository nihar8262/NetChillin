import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';
import { fallbackMoviePoster, fallbackPersonImage, image185 } from '../api/moivedb';

export default function Cast ({cast,navigation}){
    let personName= 'Robert Downey Jr.';
    let characterName='Iron Man';
    return(
        <View style={tw`my-6`}>
            <Text style={tw`text-white text-lg mx-4 mb-5`}>Top Cast</Text>
            <ScrollView 
             horizontal
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{paddingHorizontal:15}}
            >
                {
                    cast && cast.map((person,index)=>{
                        return(
                            <TouchableOpacity 
                              key={index}
                              style={tw`mr-4 items-center`}
                              onPress={()=> navigation.navigate('Person',person)}
                            >   
                                <View style={tw` items-center rounded-full h-20 w-20   border border-neutral-500`}>
                                    <Image 
                                    source={{uri: image185(person?.profile_path) || fallbackPersonImage}}
                                    //   source={require("../assets/image/ironman.jpg")}
                                      style={tw`rounded-full h-20 w-20`}
                                    />
                                </View>
                                <Text style={tw`text-white text-xs mt-1`}>
                                    {
                                        person?.character.length>10?person?.character.slice(0,10)+'...' : person?.character
                                    }
                                </Text>
                                <Text style={tw`text-neutral-400 text-xs mt-1`}>
                                    {
                                        person.original_name.length>10?person.original_name.slice(0,10)+'...' : person.original_name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}