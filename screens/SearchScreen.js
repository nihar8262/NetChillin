import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { ChevronLeftIcon, XMarkIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../theme";
import MoviesList from "../components/moviesList";
import Loading from "../components/loading";
import { fallbackMoviePoster, image185, searchMovies } from "../api/moivedb";
import {debounce} from 'lodash';
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function Search() {
  const navigation = useNavigation();
  const [result, showResult] = useState([]);
  const [loader, setLoader] = useState(false);
  let movieName = "Avengers Infinty War";
  const handleSearch = value =>{
     if(value && value.length>2){
        setLoader(true);
        searchMovies({
            query:value,
            include_adults:'false',
            language:'en-US',
            page:'1'
        }).then(data=>{
            setLoader(false);
            // console.log('got movies: ' ,data);
            if(data && data.results) showResult(data.results);
        })
     }
     else{
        setLoader(false);
        showResult([]);
     }
  }
  const handleTextDebounce = useCallback(debounce(handleSearch,400), [])

  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
      <View
        style={tw`mx-4 mt-14 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie "
          placeholderTextColor={"lightgray"}
          style={tw` pb-1 pl-5 text-base font-semibold text-white `}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          style={tw`rounded-full p-3 bg-neutral-500`}
        >
          <XMarkIcon size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* Result */}

      {
        loader?(
            <Loading/>
        ):
        result.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              style={tw``}
            >
              <Text style={tw`text-white font-semibold ml-1 m-2`}>
                Results ({result.length}){" "}
              </Text>
              <View style={tw`flex-row justify-between flex-wrap`}>
                {result.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.navigate("Movie", item)}
                    >
                      <View style={tw`mb-4`}>
                        <Image
                          style={{
                            width: width * 0.44,
                            height: height * 0.3,
                            borderRadius: 20,
                          }}
                        //   source={require("../assets/image/avengers.jpg")}
                        source={{uri:image185(item.poster_path) || fallbackMoviePoster}}
                        />
                        <Text style={tw`text-neutral-400 ml-1`}>
                          {item.title.length
                            ? item.title.slice(0, 22) + "..."
                            : item.title}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View style={tw`flex-row  justify-center mt-30`}>
               
                  <LottieView style={{width: width * 0.9,height: width,}}
                    source={require('../assets/image/searching.json')}
                    autoPlay
                    loop
                  />
                
            </View>
            
          )
          
    }
      
     
    </SafeAreaView>
  );
}


