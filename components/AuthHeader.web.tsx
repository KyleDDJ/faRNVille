import React from "react";
import { Image, Text, View } from "react-native";

export default function AuthHeader() {
  return (
    <View className="items-center">
      <Text className="text-3xl font-bold text-white mb-8">faRNville.</Text>
      <Image
        source={require("@/assets/images/Seeding.png")}
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
        }}
      />
      <Text className="text-base text-white mt-2 text-center">
        Grow. Harvest. Earn. One tap away.
      </Text>
    </View>
  );
}
