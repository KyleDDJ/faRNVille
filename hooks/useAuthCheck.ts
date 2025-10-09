import { useUser } from "@/contexts/UserContext";
import { router } from "expo-router";
import { useEffect } from "react";

export const useAuthCheck = () => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/(auth)/login");
    }
  }, [user]);

  return { user, isAuthenticated: !!user };
};