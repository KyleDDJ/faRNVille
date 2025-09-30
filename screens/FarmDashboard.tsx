import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
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

  return (
    <View className="mb-3">
      <View
        className="w-11/12 flex-row self-center mt-1 rounded-2xl p-2 items-center"
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray300,
          backgroundColor: COLORS.white,
        }}
      >
        <Image
          source={plant.image}
          className="w-32 h-32 rounded-xl mr-3"
          resizeMode="cover"
        />
        <View className="flex-col flex-1 mt-16">
          <Text className="text-l font-bold" style={{ color: COLORS.green }}>
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
          >
            {is_ready ? "Harvest now!" : `Harvest in ${time_left}`}
          </Text>

          <Progress.Bar
            progress={progress}
            width={212}
            height={8}
            borderRadius={6}
            borderWidth={0}
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
