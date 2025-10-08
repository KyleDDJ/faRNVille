import { configureGoogleSignin } from "@/config/googleAuthConfig";
import { PlantsProvider } from "@/contexts/PlantsContext";
import { UserProvider } from "@/contexts/UserContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./globals.css";

export default function RootLayout() {
  useEffect(() => {
    configureGoogleSignin();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <UserProvider>
          <PlantsProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </PlantsProvider>
        </UserProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
