import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import React from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Animated, { FadeInDown } from "react-native-reanimated"
import { CachedImage } from "../helpers/image"

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
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
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={{ flex: "auto", alignItems: "center" }}
              className="space-y-1"
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
                <CachedImage
                  uri={cat.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6), borderRadius: 50 }}
                />
              </View>
              <Text style={{ fontSize: hp(1.6), color: "rgb(82 82 82)" }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </Animated.View>
  )
}
