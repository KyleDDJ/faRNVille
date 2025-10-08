import AuthScreen from "@/screens/AuthScreen";
import React from "react";
import { Platform } from "react-native";

let AuthScreenWeb: any = null;
if (Platform.OS === "web") {
  AuthScreenWeb = require("@/screens/AuthScreen.web").default;
}

const login = () => {
  if (Platform.OS === "web" && AuthScreenWeb) {
    return <AuthScreenWeb />;
  }
  return <AuthScreen />;
};

export default login;
