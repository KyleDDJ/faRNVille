import { AuthHeader } from "@/components/AuthHeader";
import { COLORS } from "@/constants/Colors";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const { is_loading, signIn } = useGoogleAuth();

  return (
    <View className="flex-1 bg-leafygreen justify-center items-center px-6">
      <AuthHeader />
      <TouchableOpacity
        onPress={signIn}
        disabled={is_loading}
        className="mt-5 flex-row gap-5 items-center bg-white py-4 px-12 rounded-full shadow-md"
      >
        <AntDesign name="google" size={24} color={COLORS.remove} />
        {is_loading ? (
          <ActivityIndicator size="small" color={COLORS.remove} />
        ) : (
          <Text className="text-remove font-medium text-lg">
            Sign in with Google
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
