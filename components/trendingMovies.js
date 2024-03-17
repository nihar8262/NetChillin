import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Image} from 'react-native';
import React from 'react';
import tw from 'twrnc'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moivedb';

const {width,height} = Dimensions.get('window');

export default function Trending({data}) {

    const navigation =useNavigation();
    const handleClick =(item)=>{
        navigation.navigate('Movie',item);
    }

  return (
    <View style={tw`mb-8`}>
        <Text style={tw`text-white text-xl mb-5 mx-4`}>Trending</Text>
        <Carousel
        data={data}
        renderItem={({item})=><MovieCard item={item} handleClick={handleClick}/> }
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display:'flex',alignItems:'center'}}
        />
    </View>
  );
}

const MovieCard =({item,handleClick})=>{
    // console.log('item.poster_path: ', item.poster_path);
    return(
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <View style={tw`rounded-xl`}>
            <Image 
            // source={require("../assets/image/spiderman-0.jpg")}
            source={{uri:image500(item.poster_path)}}
            style={{
                width:width*0.6,
                height:height*0.4,
                borderRadius:20
            }} 
            />
            </View>
        </TouchableWithoutFeedback>
    )
}