import EarningSummary from "@/components/EarningSummary";
import { defaultBackground } from "@/constants/Colors";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const FarmScreen: React.FC = () => {
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: defaultBackground,
        paddingBottom: 100,
      }}
    >
      <EarningSummary />
    </SafeAreaView>
  );
};

export default FarmScreen;
