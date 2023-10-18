import { View, Text } from "react-native"
import React from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export default function Recipes() {
  return (
    <View className="space-y-3" style={{ marginLeft: 4, marginRight: 4 }}>
      <Text
        style={{ fontSize: hp(3), fontWeight: 600, color: "rgb(82 82 82)" }}
      >
        Recipes
      </Text>
      <View></View>
    </View>
  )
}
