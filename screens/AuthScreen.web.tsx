import AuthHeader from "@/components/AuthHeader.web";
import { useGoogleAuth } from "@/hooks/useGoogleAuth.web";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Text, View } from "react-native";

const CLIENT_ID =
  "906198807019-1pvnhv6tjj7kcp5vvddlatki92560lfk.apps.googleusercontent.com";

const AuthScreen = () => {
  const { handleSuccess, handleError, error } = useGoogleAuth();

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <View className="flex-1 items-center bg-white justify-center">
        <View className="flex-row shadow w-[50%]">
          <View className="flex-1 bg-leafygreen justify-center items-center px-32 py-24">
            <AuthHeader />
          </View>

          <View className="flex-1 bg-white justify-center items-center px-28 py-28">
            <View className="w-full items-end max-w-md">
              <Text className="text-4xl font-bold text-leafygreen mb-12">
                Login
              </Text>

              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
              />

              {error && (
                <View className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 w-full">
                  <Text className="text-red-600 text-sm text-center">
                    {error.message || "Something went wrong. Please try again."}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </GoogleOAuthProvider>
  );
};

export default AuthScreen;
