import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { Redirect } from "expo-router";

export default function Index() {
  const { user_info } = useGoogleAuth();
  if (user_info) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
