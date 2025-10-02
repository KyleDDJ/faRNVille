import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as Progress from "react-native-progress";

type PlantedPlant = Plants & {
  unique_id: number;
  planted_at: Date;
  harvest_ready_at: Date;
};

type FarmDashboardProps = {
  plant: PlantedPlant;
  progress: number;
  time_left: string;
  on_remove: (plant: PlantedPlant) => void;
  on_harvest: (plant: PlantedPlant) => void;
};

const FarmDashboard: React.FC<FarmDashboardProps> = ({
  plant,
  progress,
  time_left,
  on_remove,
  on_harvest,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const is_ready = progress >= 1;

  // Responsive breakpoints
  const isSmallScreen = screenWidth < 380;
  const isMediumScreen = screenWidth >= 380 && screenWidth < 768;
  const isLargeScreen = screenWidth >= 768;

  // Responsive image sizing
  const getImageSize = () => {
    if (Platform.OS === "web") {
      if (isLargeScreen)
        return { width: screenWidth * 0.12, height: screenWidth * 0.108 };
      if (isMediumScreen)
        return { width: screenWidth * 0.15, height: screenWidth * 0.135 };
      return { width: screenWidth * 0.18, height: screenWidth * 0.162 };
    }
    if (isSmallScreen) return { width: 100, height: 90 };
    return { width: 130, height: 117 };
  };

  // Responsive font sizes
  const getFontSizes = () => {
    if (Platform.OS === "web") {
      if (isLargeScreen) return { title: 22, subtitle: 18, button: 16 };
      if (isMediumScreen) return { title: 18, subtitle: 16, button: 14 };
      return { title: 16, subtitle: 14, button: 13 };
    }
    if (isSmallScreen) return { title: 13, subtitle: 12, button: 14 };
    return { title: 14, subtitle: 15, button: 16 };
  };

  // Responsive progress bar sizing
  const getProgressSize = () => {
    if (Platform.OS === "web") {
      if (isLargeScreen) return { width: 380, height: 12 };
      if (isMediumScreen) return { width: screenWidth * 0.45, height: 10 };
      return { width: screenWidth * 0.4, height: 8 };
    }
    if (isSmallScreen) return { width: screenWidth * 0.45, height: 6 };
    return { width: 200, height: 8 };
  };

  // Responsive button sizing
  const getButtonStyle = () => {
    if (isSmallScreen) {
      return {
        paddingHorizontal: 12,
        paddingVertical: 8,
        iconSize: 16,
      };
    }
    return {
      paddingHorizontal: 20,
      paddingVertical: 12,
      iconSize: 20,
    };
  };

  const imageSize = getImageSize();
  const fontSizes = getFontSizes();
  const progressSize = getProgressSize();
  const buttonStyle = getButtonStyle();

  return (
    <View className="mb-3">
      <View
        className="w-11/12 flex-row self-center mt-1 rounded-2xl p-2 items-center"
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray300,
          backgroundColor: COLORS.white,
          maxWidth: Platform.OS === "web" ? 800 : undefined,
          paddingHorizontal: isSmallScreen ? 8 : 12,
          paddingVertical: isSmallScreen ? 8 : 12,
        }}
      >
        <Image
          source={plant.image}
          style={{
            width: imageSize.width,
            height: imageSize.height,
            borderRadius: isSmallScreen ? 8 : 10,
            marginRight: isSmallScreen ? 6 : 9,
          }}
          resizeMode="cover"
        />

        <View
          className="flex-col flex-1"
          style={{ marginTop: isSmallScreen ? 8 : 12 }}
        >
          <Text
            className="font-semibold text-green"
            style={{
              fontSize: fontSizes.title,
              marginBottom: 2,
            }}
          >
            {plant.name}
            {is_ready && (
              <Text className="text-lightgreen font-semibold">
                {" "}
                (+${plant.profit.toFixed(2)})
              </Text>
            )}
          </Text>

          <Text
            className={`${is_ready ? "text-lightgreen" : "text-gray-600"} mb-1`}
            style={{ fontSize: fontSizes.subtitle }}
          >
            {is_ready ? "Harvest now!" : `Harvest in ${time_left}`}
          </Text>

          <Progress.Bar
            progress={progress}
            width={progressSize.width}
            height={progressSize.height}
            borderRadius={6}
            color={
              is_ready
                ? COLORS.green
                : progress > 0.6
                ? COLORS.yellow
                : COLORS.orange
            }
            unfilledColor={COLORS.gray100}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center justify-center rounded-2xl ml-2"
          style={{
            backgroundColor: is_ready ? COLORS.lightgreen : COLORS.remove,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            paddingHorizontal: buttonStyle.paddingHorizontal,
            paddingVertical: buttonStyle.paddingVertical,
            marginBottom: isSmallScreen ? 40 : 80,
          }}
          onPress={() => (is_ready ? on_harvest(plant) : on_remove(plant))}
        >
          {is_ready ? (
            <>
              <FontAwesome5
                name="seedling"
                size={buttonStyle.iconSize}
                color="white"
                style={{ marginRight: isSmallScreen ? 4 : 6 }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: fontSizes.button,
                }}
              >
                Harvest
              </Text>
            </>
          ) : (
            <>
              <FontAwesome6
                name="trash"
                size={buttonStyle.iconSize}
                color="white"
                style={{ marginRight: isSmallScreen ? 4 : 6 }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: fontSizes.button,
                }}
              >
                Remove
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FarmDashboard;
