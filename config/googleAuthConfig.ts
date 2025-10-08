import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";

export const configureGoogleSignin = () => {
  if (Platform.OS !== "web") {
    GoogleSignin.configure({
      webClientId:
        "906198807019-1pvnhv6tjj7kcp5vvddlatki92560lfk.apps.googleusercontent.com",
      iosClientId:
        "906198807019-ddmtpeg2f0tpgd69467dt8hmifqtn2rn.apps.googleusercontent.com",
    });
  }
};
