import React from "react";
import { Image, Text, View } from "react-native";

export const AuthHeader = () => {
  return (
    <View className="items-center mb-10">
      <Image
        source={require("@/assets/images/Seeding.png")}
        className="w-80 h-80 mb-5"
        resizeMode="contain"
      />
      <Text className="text-4xl font-bold text-white">faRNville.</Text>
      <Text className="text-base text-gray-200 mt-2 text-center">
        Grow. Harvest. Earn. One tap away.
      </Text>
    </View>
  );
};
