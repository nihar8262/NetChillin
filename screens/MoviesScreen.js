import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import Carousel from "react-native-snap-carousel";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MoviesList from "../components/moviesList";
import Loading from "../components/loading";
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moivedb";

const { width, height } = Dimensions.get("window");
const android = Platform.OS == "android";
const topMargin = android ? "mt-3" : "";

export default function MovieDesc() {

  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [cast,setCast] =useState([]);
  const [similarMovies,setSimilarMovies] =useState([1,2,3,4,5]);
  const [favorite, toggleFavorite] = useState(false);
  const [loader, setLoader] = useState(false);
  const [movie,setMovie] =useState({});
  let movieName = "Avengers Infinty War";
  useEffect(() => {
    // console.log('itemid: ',item.id);
    setLoader(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails= async id =>{
    const data =await fetchMovieDetails(id);
    if(data) setMovie(data);
    setLoader(false);
  }

  const getMovieCredits = async id =>{
    const data =await fetchMovieCredits(id);
    // console.log("got credits :", data)
    if(data && data.cast) setCast(data.cast);
  }

  const getSimilarMovies = async id =>{
    const data =await fetchSimilarMovies(id);
    // console.log("got credits :", data)
    if(data && data.results) setSimilarMovies(data.results);
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20, }}
      style={tw`flex-1 bg-neutral-900 `}
    >
      {/* back button & movie poster */}
      <View style={tw`w-full`}>
        <SafeAreaView
          style={tw`absolute z-20 w-full flex-row justify-between items-center px-4 mt-3`}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`rounded-xl p-1 bg-amber-500`}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite(!favorite)}>
            <HeartIcon size="35" color={favorite ? "#eab308" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        {
            loader?(
                <Loading/>
            )
            :
            (
                <View >
                <Image
                source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}}
                //   source={require("../assets/image/avengers.jpg")}
                  style={{ width, height: height * 0.70 ,marginTop:5,borderRadius:10}}
                />
      
                <LinearGradient
                  colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
                  style={tw`w-full h-60 absolute bottom-0`}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                />
              </View>
            )
        }
       
      </View>

      {/* movie details */}
      <View style={tw`mt-3`}>
        <View style={{ marginTop: -(height * 0.09) }}>
          <Text
            style={tw`text-white text-center font-bold text-3xl tracking-wider`}
          >
            {
                movie?.title
            }
          </Text>
          {/* status,release,runtime */}
          {
            movie?.id?(
                <Text
                style={tw`text-neutral-400 font-semibold text-base text-center`}
              >
                {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
              </Text>
            ):
            null
          }
          

          {/* geners */}
          <View style={tw`flex-row justify-center mx-4 gap-4`}>
          {
            movie?.genres?.map((genre, index)=>{
                let showDot = index+1 != movie.genres.length;
                return(
                    <Text key={index}
                    style={tw`text-neutral-400 font-semibold text-base text-center`}
                  >
                    {genre?.name}  {showDot? "•" :null}
                  </Text>
                )
            })
          }
          
           
            {/* <Text
              style={tw`text-neutral-400 font-semibold text-base text-center`}
            >
              Thrill •
            </Text>
            <Text
              style={tw`text-neutral-400 font-semibold text-base text-center`}
            >
              Adventure
            </Text> */}
          </View>
          <Text style={tw`text-neutral-400 mx-4 tracking-wide text-sm`}>
                    {
                        movie?.overview
                    }
          </Text>
        </View>
      </View>

      {/* cast */}

       {cast.length>0 && <Cast navigation={navigation} cast={cast}/> }

      {/* similar movie */}
      {similarMovies.length>0 && <MoviesList title="Similar Movies" hideSeeAll={true} data={similarMovies}/> }
    </ScrollView>
  );
}
