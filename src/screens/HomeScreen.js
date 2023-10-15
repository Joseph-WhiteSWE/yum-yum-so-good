import { View, Text, ScrollView, Image, TextInput } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import Categories from "../components.js/categories"

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef")

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicatior={false}
        contentComntainerStyle={{ paddingBottom: 50 }}
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
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
