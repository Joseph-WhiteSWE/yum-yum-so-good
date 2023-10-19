import { View, Text, Pressable, Image } from "react-native"
import React, { useState, useEffect } from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import MasonryList from "@react-native-seoul/masonry-list"
import { mealData } from "../constants/"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function Recipes() {
  const [showMasonryList, setShowMasonryList] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMasonryList(true)
    }, 500)
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
        {showMasonryList && (
          <MasonryList
            data={mealData}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  )
}

const RecipeCard = ({ item, index }) => {
  let isEven = index % 2 === 0
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(500)
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
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />
        <Text
          className="font-semibold ml-2 text-neutral-600"
          style={{ textAlign: "center", fontSize: hp(2) }}
        >
          {item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
        </Text>
      </Pressable>
    </Animated.View>
  )
}