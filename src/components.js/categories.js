import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import React from "react"
import { categoryData, mealData } from "../constants"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function Categories({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(cat.strCategory)}
              className="flex items-center space-y-1"
            >
              <View
                style={[
                  {
                    borderRadius: 50,
                    padding: 6,
                  },
                  isActive
                    ? { backgroundColor: "#FDBA74" }
                    : { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                ]}
              >
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </Animated.View>
  )
}
