import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc'
import { moviesData } from '../constants'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';
import { fallbackMoviePoster, image185 } from '../api/moivedb';

const {width,height} = Dimensions.get('window');

export default function MoviesList({title,data,hideSeeAll}) {
    
    const navigation = useNavigation();

    return(
        <View style={tw`mb-8 gap-4`}>
            <View style={tw`mx-4 flex-row justify-between items-center`}>
                <Text style={tw`text-white text-xl`}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                        <Text style={styles.text}>See All</Text>
                    </TouchableOpacity>
                    )
                }
                
            </View>
            {/* movie row */}
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
            >
                {
                    data.map((item, index)=>{
                        return(
                            <TouchableWithoutFeedback
                               key={index}
                               onPress={()=>navigation.push('Movie',item)}
                            >
                               <View style={tw`gap-1 mr-4`}>
                                <Image 
                                 source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                                //  source={require("../assets/image/avengers.jpg")}
                                 style={{width:width*0.33,height:height*0.22,borderRadius:20}}
                                />
                               <Text style={tw`text-neutral-300 ml-1`}>
                                {
                                 item.title
                                }
                                </Text>
                               </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}
