import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useGoogleAuth = () => {
  const [error, setError] = useState<any>(null);
  const [user_info, setUserInfo] = useState<any>(null);
  const [is_loading, setIsLoading] = useState(false);

  const signIn = async () => {
    console.log("Pressed sign in");
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      setUserInfo(info);
      setError(null);
	  Alert.alert("Login Successful")
      router.push("/(tabs)");
    } catch (e: any) {
      console.error("Google Sign-In Error:", e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
	
    console.log("Logout pressed");
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
      setError(null);
	  Alert.alert("Logout Succesful")
    } catch (e: any) {
      console.error("Google Sign-Out Error:", e);
      setError(e);
    }
  };

  return {
    user_info,
    error,
    is_loading,
    signIn,
    logout,
  };
};