import { View, Text, ScrollView, Image, TextInput } from "react-native"
import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import Categories from "../components.js/categories"
import Recipes from "../components.js/recipes"
import axios from "axios"

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef")
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])

  useEffect(() => {
    getCategories()
    getRecipes()
  }, [])

  const handleChangeCategory = category => {
    getRecipes(category)
    setActiveCategory(category)
    setMeals([])
  }

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      )
      if (response && response.data) {
        setCategories(response.data.categories)
      }
    } catch (err) {
      console.log("error", err.message)
    }
  }
  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      )
      // console.log("got recipes", response.data)
      if (response && response.data) {
        setMeals(response.data.meals)
      }
    } catch (err) {
      console.log("error", err.message)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicatior={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/img/avatar.png")}
            style={{ height: hp(7), width: hp(7) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings */}
        <View className="mx-4 spacey-y-2 mb-2">
          <Text style={{ fontSize: hp(3) }} className="text-nuetral-600">
            Hello Joseph!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-nuetral-600"
            >
              stay at <Text className="text-amber-400">home</Text>
            </Text>
            <Text style={{ fontSize: hp(3.8) }}>make you own food</Text>
          </View>
        </View>
        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(2.5) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>
        {/* categories */}
        <View>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        {/* recipes */}
        <View>
          <Recipes meals={meals} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
