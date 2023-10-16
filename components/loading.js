import { View,Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from 'react-native-progress'
import { theme } from "../theme";
const { width, height } = Dimensions.get("window");
import tw from 'twrnc'

export default function Loading(){
    return(
        <View style={tw`absolute mt-90 ml-40 flex-row justify-center items-center  h-20 w-20`}>
            <Progress.CircleSnail thickness={12} size={160} color={theme.backgound}/>
        </View>
    )
}