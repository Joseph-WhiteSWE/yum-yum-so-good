import { View, Text, onPress, Image, Pressable } from "react-native"
import React, { useState, useEffect } from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import MasonryList from "@react-native-seoul/masonry-list"
import Animated, { FadeInDown } from "react-native-reanimated"
import Loading from "./loading"
import { CachedImage } from "../helpers/image"
import { useNavigation } from "@react-navigation/native"

export default function Recipes({ meals }) {
  const navigation = useNavigation()
  const [showMasonryList, setShowMasonryList] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMasonryList(true)
    }, 550)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {meals.length === 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          showMasonryList && (
            <MasonryList
              data={meals}
              keyExtractor={item => item.idMeal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, i }) => (
                <RecipeCard item={item} index={i} navigation={navigation} />
              )}
              onEndReachedThreshold={0.1}
            />
          )
        )}
      </View>
    </View>
  )
}

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 === 0
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(20)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          sharedTransitionTag={item.strMeal}
        />
        <Text
          className="font-semibold ml-2 text-neutral-600"
          style={{ textAlign: "center", fontSize: hp(2) }}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  )
}
