import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
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

const screenWidth = Dimensions.get("window").width;

const imgWidth = Platform.OS === "web" ? screenWidth * 0.11 : 135;
const imgHeight = imgWidth * 0.8;

const fontSize = (web_size: number, native_size?: number) =>
  Platform.OS === "web" ? web_size : native_size;

const progressWidth = (web: number, native: number) =>
  Platform.OS === "web" ? web : native;

const progressHeight = (web: number, native: number) =>
  Platform.OS === "web" ? web : native;

const FarmDashboard: React.FC<FarmDashboardProps> = ({
  plant,
  progress,
  time_left,
  on_remove,
  on_harvest,
}) => {
  const is_ready = progress >= 1;

  return (
    <View className="mb-3">
      <View
        className="w-11/12 flex-row self-center mt-1 rounded-2xl p-2 items-center"
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray300,
          backgroundColor: COLORS.white,
          maxWidth: Platform.OS === "web" ? 600 : undefined,
        }}
      >
        <Image
          source={plant.image}
          style={{
            width: imgWidth,
            height: imgHeight,
            borderRadius: 10,
            marginRight: 9,
          }}
          resizeMode="cover"
        />
        <View className="flex-col flex-1 mt-12">
          <Text
            className="font-semibold text-green"
            style={{ fontSize: fontSize(20, 14) }}
          >
            {plant.name}
            {is_ready && (
              <Text className="text-lightgreen font-semibold">
                (+${plant.profit.toFixed(2)})
              </Text>
            )}
          </Text>

          <Text
            className={`text-base ${
              is_ready ? "text-lightgreen" : "text-gray-600"
            } mb-1`}
            style={{ fontSize: fontSize(20) }}
          >
            {is_ready ? "Harvest now!" : `Harvest in ${time_left}`}
          </Text>

          <Progress.Bar
            progress={progress}
            width={progressWidth(380, 200)}
            height={progressHeight(12, 8)}
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
          className="flex-row items-center justify-center rounded-2xl px-5 py-3 ml-3 mb-20"
          style={{
            backgroundColor: is_ready ? COLORS.lightgreen : COLORS.remove,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => (is_ready ? on_harvest(plant) : on_remove(plant))}
        >
          {is_ready ? (
            <>
              <FontAwesome5
                name="seedling"
                size={20}
                color="white"
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Harvest
              </Text>
            </>
          ) : (
            <>
              <FontAwesome6
                name="trash"
                size={20}
                color="white"
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 16,
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
