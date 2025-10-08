import { GoogleSignin, SignInResponse, statusCodes } from "@react-native-google-signin/google-signin";
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
      const info: SignInResponse = await GoogleSignin.signIn(); // const info = await GoogleSignin.signIn();

      if (info.type === 'cancelled') { // cancel sign-in handling
         console.log('Sign-in cancelled by user');
         setIsLoading(false);
         return; 
      }

    setUserInfo(info.user);
    Alert.alert('Login Successful');
    router.push('/(tabs)');

    } catch (e: any) {
      console.error("Google Sign-In Error:", e);
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled Google sign-in");
        return;
      } else if (e.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Sign-in already in progress");
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Google Play Services not available or outdated");
      } else {
        Alert.alert("Something went wrong", e.message || "Please try again.");
      }
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
      Alert.alert("Logout Successful");
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
