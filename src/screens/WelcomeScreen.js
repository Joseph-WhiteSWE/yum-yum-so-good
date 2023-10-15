import { View, Text, Image } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Animated, { useSharedValue, withSpring } from "react-native-reanimated"

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* center image */}
      <View className="bg-white/20 rounded-full" style={{ padding: hp(5.5) }}>
        <View className="bg-white/20 rounded-full" style={{ padding: hp(5) }}>
          <Image
            source={require("../../assets/img/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </View>
      </View>

      {/* title and punch line */}
      <View className="flex items-center spacey-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-bold text-white tracking-widest"
        >
          Hungry?
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="font-medium text-white tracking-widest"
        >
          Tap In!
        </Text>
      </View>
    </SafeAreaView>
  )
}
