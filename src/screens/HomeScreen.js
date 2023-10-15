import { View, Text } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 flex-col items-center justify-center">
      <Text className="text-4xl">HomeScreen</Text>
    </SafeAreaView>
  )
}
