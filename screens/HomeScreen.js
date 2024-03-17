import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,length
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import {
  ArrowRightOnRectangleIcon,
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,UserCircleIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import Trending from "../components/trendingMovies";
import { useEffect, useState } from "react";
import MoviesList from "../components/moviesList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moivedb";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const android = Platform.OS == "android";

export default function HomeScreen(user) {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigation = useNavigation();
  

  useEffect(()=>{
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();

  },[])

  const getTrendingMovies = async ()=>{
    const data =await fetchTrendingMovies();
    // console.log('got trending movies',data);
    if(data && data.results) setTrending(data.results);
    setLoader(false);
  }
  const getUpcomingMovies = async ()=>{
    const data =await fetchUpcomingMovies();
    // console.log('got upcoming movies',data);
    if(data && data.results) setUpcoming(data.results);
    
  }
  const getTopRatedMovies = async ()=>{
    const data =await fetchTopRatedMovies();
    // console.log('got top rated movies',data);
    if(data && data.results) setTopRated(data.results);
    setLoader(false);
  }

  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      {/* Search & Logo */}
      <StatusBar 
       style="light" />
      <SafeAreaView style={tw`m-3`}>
        <View style={tw`flex-row justify-between items-center mx-4`}>
          
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <UserCircleIcon size="30" strokeWidth={2} color="white" />
          {/* <ArrowRightOnRectangleIcon size="30" strokeWidth={2} color="white"/> */}
          </TouchableOpacity>
          
          <Text style={tw`text-3xl text-white font-bold`}>
            <Text style={styles.text}>Net</Text>
            Chillin
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loader ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movies Carousal */}
          {trending.length>0 && <Trending data={trending} />}

          {/* Upcoming Movies  */}
          <MoviesList title="Upcoming" data={upcoming} />

          {/* Top Rated Movies  */}
          <MoviesList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
