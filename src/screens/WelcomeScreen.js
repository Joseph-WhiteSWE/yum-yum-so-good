import Animated, { useSharedValue, withSpring } from "react-native-reanimated"
import { View, Text, Image, Pressable } from "react-native"
import React, { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useNavigation } from "@react-navigation/native"

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0)
  const ring2padding = useSharedValue(0)

  const navigation = useNavigation()

  useEffect(() => {
    ring1padding.value = 0
    ring2padding.value = 0
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    )
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    )
  }, [])

  return (
    <SafeAreaView className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        {/* center image */}
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring1padding }}
        >
          <Animated.View
            className="bg-white/20 rounded-full"
            style={{ padding: ring2padding }}
          >
            <Image
              source={require("../../assets/img/welcome.png")}
              style={{ width: hp(20), height: hp(20) }}
            />
          </Animated.View>
        </Animated.View>

        {/* title and punch line */}
        <View className="flex items-center spacey-y-2">
          <Text
            style={{ fontSize: hp(7) }}
            className="font-bold text-white tracking-widest"
          >
            Hungry?
          </Text>
          <Text
            style={{ fontSize: hp(4) }}
            className="font-medium text-white tracking-widest"
          >
            Tap In!
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}
