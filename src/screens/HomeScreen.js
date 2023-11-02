import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native"
import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Categories from "../components/categories"
import Recipes from "../components/recipes"
import axios from "axios"
import { XCircleIcon } from "react-native-heroicons/solid"

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef")
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [allMeals, setAllMeals] = useState([])
  const [searchField, setSearchField] = useState("")

  useEffect(() => {
    getCategories()
    getRecipes(activeCategory)
  }, [activeCategory])

  useEffect(() => {
    searchField ? filterRecipes(searchField) : setMeals(allMeals)
  }, [searchField])

  const handleChangeCategory = category => {
    setActiveCategory(category)
    getRecipes(category)
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
  const getRecipes = async category => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      )
      if (response && response.data) {
        setAllMeals(response.data.meals)
        setMeals(response.data.meals)
      }
    } catch (err) {
      console.log("error", err.message)
    }
  }

  const filterRecipes = searchField => {
    const filteredMeals = allMeals.filter(meal =>
      meal.strMeal.toLowerCase().includes(searchField.toLowerCase())
    )
    setMeals(filteredMeals)
  }

  const clearField = () => {
    setSearchField("")
    setAllMeals(allMeals)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/img/avatar.png")}
            style={{ height: hp(7), width: hp(7) }}
          />
        </View>

        {/* greetings */}
        <View className="mx-4 spacey-y-2 mb-2">
          <Text style={{ fontSize: hp(3.8) }} className="text-nuetral-600">
            Hello!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-nuetral-600"
            >
              Let's stay <Text className="text-amber-400">home</Text>
            </Text>
            <Text style={{ fontSize: hp(3.8) }}>and make our own food!</Text>
          </View>
        </View>
        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="search by food in category"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(2.5) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            onChangeText={text => setSearchField(text)}
            value={searchField}
          />
          <View>
            <TouchableOpacity onPress={clearField}>
              <XCircleIcon size={hp(4)} strokeWidth={3} color="gray" />
            </TouchableOpacity>
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
