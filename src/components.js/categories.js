import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import React from "react"
import { categoryData, mealData } from "../constants"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export default function Categories() {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categoryData.map((cat, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
            >
              <View>
                <Image
                  source={{ uri: cat.image }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
