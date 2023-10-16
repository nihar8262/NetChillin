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
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Carousel from "react-native-snap-carousel";
import { useNavigation,useRoute } from "@react-navigation/native";
import { styles } from "../theme";
import MoviesList from "../components/moviesList";
import Loading from "../components/loading";
import { fetchPersonDetails, fetchPersonMovies, image342 ,fallbackPersonImage} from "../api/moivedb";

const { width, height } = Dimensions.get("window");

export default function Person() {

  const {params:item} = useRoute();
  const [favorite, toggleFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState([]);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  useEffect(()=>{
    setLoader(true);
    // console.log('person: ',item)
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  },[item])

  const getPersonDetails = async id =>{
    const data = await fetchPersonDetails(id);
    if(data) setPerson(data);
    setLoader(false);
  }

  const getPersonMovies = async id =>{
    const data = await fetchPersonMovies(id);
    if(data && data.cast) setPersonMovies(data.cast);
    setLoader(false);
  }


  return (
    <ScrollView
      style={tw`flex-1 bg-neutral-900  `}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Back Buttton */}
      <SafeAreaView
        style={tw` z-20 w-full flex-row justify-between items-center px-4 mt-12`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`rounded-xl p-1 bg-amber-500`}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(!favorite)}>
          <HeartIcon size="35" color={favorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Preson details */}

      {loader ? (
        <Loading />
      ) : (
        <View>
          <View style={tw`flex-row justify-center mt-8   `}>
            <View
              style={tw`items-center rounded-full overflow-hidden w-72 h-72 border-2 border-neutral-400 shadow-2xl shadow-white`}
            >
              <Image
                 source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                // source={require("../assets/image/ironman.jpg")}
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>

          <View style={tw`mt-6`}>
            <Text style={tw`text-3xl text-white font-bold text-center`}>
              {
                person?.name
              }
            </Text>
            <Text style={tw`text-base text-neutral-500  text-center`}>
             {
                person?.place_of_birth
             }
            </Text>
          </View>
          <View
            style={tw`mx-3 mt-6 flex-row justify-between p-4 items-center bg-neutral-700 rounded-full`}
          >
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Gender</Text>
              <Text style={tw`text-neutral-300 font-semibold`}>
                {
                    person?.gender==1?'Female':'Male'
                }
              </Text>
            </View>
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Birthday</Text>
              <Text style={tw`text-neutral-300 font-semibold`}>{person?.birthday}</Text>
            </View>
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Known for</Text>
              <Text style={tw`text-neutral-300 font-semibold`}>{person?.known_for_department}</Text>
            </View>
            <View style={tw` px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Popularity</Text>
              <Text style={tw`text-neutral-300 font-semibold`}>{person?.popularity?.toFixed(2)} %</Text>
            </View>
          </View>

          <View style={tw`my-6 mx-4 `}>
            <Text style={tw`text-white text-lg`}>Biography</Text>
            <Text style={tw` text-neutral-400 `}>
              {
                person?.biography || 'N/A'
              }
            </Text>
          </View>

          <MoviesList title="Movies" data={personMovies} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
