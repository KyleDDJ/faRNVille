import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
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
  const is_ready = progress >= 1;

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription.remove();
  }, []);

  const cardWidth =
    Platform.OS === "web" ? Math.min(600, screenWidth * 0.9) : "90%";
  const imgWidth =
    Platform.OS === "web"
      ? Math.min(160, screenWidth * 0.12)
      : screenWidth * 0.35;
  const imgHeight = imgWidth * 0.9;

  const fontTitle = Platform.OS === "web" ? 18 : 14;
  const fontSubtitle = Platform.OS === "web" ? 16 : 12;
  const buttonFont = Platform.OS === "web" ? 18 : 15;

  const progressWidth =
    Platform.OS === "web" ? Math.min(380, screenWidth * 0.35) : 180;
  const progressHeight = Platform.OS === "web" ? 11 : 8;

  return (
    <View className="mb-1 pt-1">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.white,
          borderWidth: 2,
          borderColor: COLORS.gray300,
          borderRadius: 16,
          padding: 12,
          width: cardWidth,
          alignSelf: "center",
        }}
      >
        <Image
          source={plant.image}
          style={{
            width: imgWidth,
            height: imgHeight,
            borderRadius: 10,
            marginRight: 10,
          }}
          resizeMode="cover"
        />

        <View style={{ flex: 1, marginTop: "auto" }}>
          <Text
            style={{
              fontWeight: "600",
              color: COLORS.green,
              fontSize: fontTitle,
            }}
          >
            {plant.name}
            {is_ready && (
              <Text style={{ color: COLORS.lightgreen, fontWeight: "600" }}>
                (+${plant.profit.toFixed(2)})
              </Text>
            )}
          </Text>

          <Text
            style={{
              color: is_ready ? COLORS.lightgreen : COLORS.gray600,
              marginBottom: 4,
              fontSize: fontSubtitle,
              fontWeight: "600",
            }}
          >
            {is_ready ? "Harvest now!" : `Harvest in ${time_left}`}
          </Text>

          <Progress.Bar
            progress={progress}
            width={progressWidth}
            height={progressHeight}
            borderRadius={progressHeight / 2}
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
          onPress={() => (is_ready ? on_harvest(plant) : on_remove(plant))}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 16,
            backgroundColor: is_ready ? COLORS.lightgreen : COLORS.remove,
            elevation: 5,
            marginBottom: "auto",
          }}
        >
          {is_ready ? (
            <>
              <FontAwesome5
                name="seedling"
                size={buttonFont}
                color={COLORS.white}
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: buttonFont,
                }}
              >
                Harvest
              </Text>
            </>
          ) : (
            <>
              <FontAwesome6
                name="trash"
                size={buttonFont}
                color={COLORS.white}
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: buttonFont,
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
