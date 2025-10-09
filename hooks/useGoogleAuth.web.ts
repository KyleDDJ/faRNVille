import { useUser } from "@/contexts/UserContext";
import { CredentialResponse } from "@react-oauth/google";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const useGoogleAuth = () => {
  const [is_loading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [user_info, setUserInfo] = useState<any>(null);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  const handleSuccess = (response: CredentialResponse) => {
    if (!response.credential) {
      setError(new Error("No credential returned from Google"));
      return;
    }

    setIsLoading(true);
    try {
      const decoded = JSON.parse(atob(response.credential.split(".")[1]));

      const userData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        photo: decoded.picture,
      };

      setUserInfo(userData);
      setUser(userData);
      router.push("/(tabs)");
    } catch (err) {
      console.error("Decoding failed:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    console.error("Google login failed");
    setError(new Error("Google login failed"));
  };

  const logout = () => {
    setUser(null);
    setUserInfo(null);
    setError(null);
    console.log("Logged out (web)");
    router.push("/(auth)/login");
  };

  return { user_info, error, is_loading, handleSuccess, handleError, logout };
};