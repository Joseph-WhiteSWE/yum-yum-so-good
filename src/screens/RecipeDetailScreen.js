import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { CachedImage } from "../helpers/image"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import Loading from "../components.js/loading"

export default function RecipeDetailScreen(props) {
  const item = props.route.params
  const [isFavorite, setIsFavorite] = useState(false)
  const navigation = useNavigation()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMealData(item.idMeal)
  }, [])

  const getMealData = async id => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      console.log(`got meal data: `, response.data)
      if (response && response.data) {
        setMeal(response.data.meals[0])
        setLoading(false)
      }
    } catch (err) {
      console.log("error", err.message)
    }
  }
  return (
    <ScrollView
      className="bg-gray flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />
      {/* recipe image */}
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 45,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>
      {/* back button */}
      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full mr-5 bg-white"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
      {/* meal description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <Text
            style={{ fontSize: hp(3) }}
            className="font-bold flex-1 text-neutral-700"
          >
            {meal?.strMeal}
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="font-medium flex-1 text-neutral-500"
          >
            {meal?.strArea}
          </Text>
        </View>
      )}
    </ScrollView>
  )
}
