import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useMemo } from "react";
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

  const config = useMemo(() => {
    const isWeb = Platform.OS === "web";
    const isSmall = screenWidth < 380;
    const isMedium = screenWidth >= 380 && screenWidth < 768;
    const isLarge = screenWidth >= 768;

    if (isWeb) {
      if (isLarge) {
        return {
          image: { width: screenWidth * 0.15, height: screenWidth * 0.13 },
          fontSize: { title: 18, subtitle: 16, button: 14 },
          progress: { width: 480, height: 9 },
          button: { padding: 14, iconSize: 17 },
          spacing: { card: 12, image: 10, marginTop: 12, marginBottom: 80 },
          borderRadius: 10,
        };
      }
      if (isMedium) {
        return {
          image: { width: screenWidth * 0.35, height: screenWidth * 0.3 },
          fontSize: { title: 14, subtitle: 14, button: 13 },
          progress: { width: screenWidth * 0.42, height: 8 },
          button: { padding: 14, iconSize: 17 },
          spacing: { card: 12, image: 10, marginTop: 12, marginBottom: 80 },
          borderRadius: 10,
        };
      }
      return {
        image: { width: screenWidth * 0.22, height: screenWidth * 0.198 },
        fontSize: { title: 14, subtitle: 13, button: 12 },
        progress: { width: screenWidth * 0.38, height: 7 },
        button: { padding: 14, iconSize: 17 },
        spacing: { card: 12, image: 10, marginTop: 12, marginBottom: 80 },
        borderRadius: 10,
      };
    }

    if (isSmall) {
      return {
        image: { width: 120, height: 108 },
        fontSize: { title: 12, subtitle: 11, button: 13 },
        progress: { width: screenWidth * 0.42, height: 6 },
        button: { padding: 10, iconSize: 15 },
        spacing: { card: 8, image: 8, marginTop: 8, marginBottom: 40 },
        borderRadius: 8,
      };
    }

    return {
      image: { width: 150, height: 135 },
      fontSize: { title: 13, subtitle: 13, button: 14 },
      progress: { width: 185, height: 7 },
      button: { padding: 14, iconSize: 17 },
      spacing: { card: 12, image: 10, marginTop: 12, marginBottom: 80 },
      borderRadius: 10,
    };
  }, [screenWidth]);

  const buttonData = is_ready
    ? {
        icon: "seedling",
        IconComponent: FontAwesome5,
        text: "Harvest",
        color: COLORS.lightgreen,
        onPress: () => on_harvest(plant),
      }
    : {
        icon: "trash",
        IconComponent: FontAwesome6,
        text: "Remove",
        color: COLORS.remove,
        onPress: () => on_remove(plant),
      };

  return (
    <View className="mb-3">
      <View
        className="w-11/12 flex-row self-center mt-1 rounded-2xl items-center"
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray300,
          backgroundColor: COLORS.white,
          maxWidth: Platform.OS === "web" ? 800 : undefined,
          padding: config.spacing.card,
        }}
      >
        <Image
          source={plant.image}
          style={{
            ...config.image,
            borderRadius: config.borderRadius,
            marginRight: config.spacing.image,
          }}
          resizeMode="cover"
        />

        <View
          className="flex-col flex-1"
          style={{ marginTop: config.spacing.marginTop }}
        >
          <Text
            className="font-semibold text-green"
            style={{
              fontSize: config.fontSize.title,
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
            style={{ fontSize: config.fontSize.subtitle }}
          >
            {is_ready ? "Harvest now!" : `Harvest in ${time_left}`}
          </Text>

          <Progress.Bar
            progress={progress}
            width={config.progress.width}
            height={config.progress.height}
            borderRadius={5}
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
          className="flex-row items-center justify-center rounded-xl ml-2"
          style={{
            backgroundColor: buttonData.color,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: config.button.padding,
            marginBottom: config.spacing.marginBottom,
          }}
          onPress={buttonData.onPress}
        >
          <buttonData.IconComponent
            name={buttonData.icon}
            size={config.button.iconSize}
            color="white"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              color: COLORS.white,
              fontWeight: "bold",
              fontSize: config.fontSize.button,
            }}
          >
            {buttonData.text}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FarmDashboard;
