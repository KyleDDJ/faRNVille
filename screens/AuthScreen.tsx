import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "906198807019-1pvnhv6tjj7kcp5vvddlatki92560lfk.apps.googleusercontent.com",
    iosClientId:
      "906198807019-ddmtpeg2f0tpgd69467dt8hmifqtn2rn.apps.googleusercontent.com",
    androidClientId:
      "906198807019-6strgomacgqbsrjueh3mja98u5p1fc0d.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        router.replace("/(tabs)");
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setUser(authentication);

      AsyncStorage.setItem("userToken", JSON.stringify(authentication));

      router.replace("/(tabs)");
    } else if (response?.type === "error") {
      Alert.alert("Google Sign-In failed");
    }
  }, [response]);

  return (
    <View className="flex-1 bg-leafygreen justify-center items-center px-6">
      <View className="items-center mb-16">
        <Image
          source={require("@/assets/images/Seeding.png")}
          className="w-72 h-72 mb-5"
          resizeMode="contain"
        />
        <Text className="text-4xl font-bold text-white">faRNville.</Text>
        <Text className="text-base text-gray-200 mt-2 text-center">
          Grow. Harvest. Earn. One tap away.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => promptAsync()}
        disabled={!request}
        activeOpacity={0.8}
        className="flex-row items-center justify-center bg-white py-3 px-5 rounded-xl w-full shadow-md"
      >
        <Ionicons
          name="logo-google"
          size={24}
          color={COLORS.remove}
          className="mr-3"
        />
        <Text className="text-base font-semibold text-remove">
          Sign in with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
