import { COLORS, defaultBackground } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface BuyPlantBottomSheetProps {
  selected_plant: Plants | null;
  money: number;
  can_afford: (cost: number) => boolean;
  on_close: () => void;
  on_continue: (purchaseInfo: {
    name: string;
    count: string;
    cost: number;
    plantId: number;
  }) => void;
}

const BuyPlantBottomSheet = forwardRef<
  BottomSheetModal,
  BuyPlantBottomSheetProps
>(({ selected_plant, money, can_afford, on_close, on_continue }, ref) => {
  const snapPoints = useMemo(() => ["40%"], []);
  const [number, setNumber] = useState("1");

  const getCurrentCost = () =>
    selected_plant ? selected_plant.cost * Number(number || "0") : 0;

  const canAffordCurrent = () => can_afford(getCurrentCost());

  const Input = Platform.OS === "web" ? TextInput : BottomSheetTextInput;

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onDismiss={() => {
        setNumber("1");
        on_close();
      }}
      backgroundStyle={{
        backgroundColor: defaultBackground,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      handleIndicatorStyle={{
        backgroundColor: COLORS.gray600,
      }}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      )}
    >
      <BottomSheetView
        className="flex-1 py-2.5 px-4"
        style={{ paddingHorizontal: 15 }}
      >
        {selected_plant ? (
          <View className="items-center">
            <View
              className="w-[80px] h-[80px] rounded-3xl mb-4 border items-center justify-center"
              style={{ borderColor: COLORS.lightgreen }}
            >
              <FontAwesome5
                name="seedling"
                size={40}
                color={COLORS.lightgreen}
              />
            </View>

            <Text className="text-xl font-bold text-gray-600">
              Buying {selected_plant.name}
            </Text>

            <View className="flex-col items-center my-6 w-full gap-2 justify-between">
              <View className="flex-row justify-between items-center w-full px-4">
                <Text className="text-gray-600 text-2xl font-bold">
                  Amount:
                </Text>
                <Input
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.gray300,
                    paddingVertical: 8,
                    borderRadius: 50,
                    width: 90,
                    textAlign: "center",
                  }}
                  keyboardType="number-pad"
                  onChangeText={text => {
                    const cleaned = text.replace(/[^0-9]/g, "");
                    setNumber(
                      cleaned === ""
                        ? ""
                        : Math.min(parseInt(cleaned, 10), 99).toString()
                    );
                  }}
                  value={number}
                />
              </View>

              <View className="flex-row justify-between items-center w-full px-4">
                <Text className="text-2xl text-gray-600 font-bold">Cost:</Text>
                <Text
                  className="text-3xl text-gray-600 font-bold"
                  style={{
                    color: canAffordCurrent() ? COLORS.gray600 : COLORS.red,
                  }}
                >
                  ${getCurrentCost().toFixed(2)}
                </Text>
              </View>
            </View>

            {!canAffordCurrent() && (
              <Text
                className="text-m font-semibold text-center mt-4"
                style={{ color: COLORS.red }}
              >
                Not enough money! You have ${money.toFixed(2)}
              </Text>
            )}

            <TouchableOpacity
              className="w-full mt-4 py-3 rounded-3xl"
              style={{
                backgroundColor: canAffordCurrent()
                  ? COLORS.lightgreen
                  : COLORS.gray300,
                opacity: canAffordCurrent() ? 1 : 0.7,
              }}
              disabled={!canAffordCurrent()}
              onPress={() => {
                if (!selected_plant || !canAffordCurrent()) return;

                on_continue({
                  name: selected_plant.name,
                  count: number,
                  cost: getCurrentCost(),
                  plantId: selected_plant.id,
                });
              }}
            >
              <Text className="text-center text-white font-semibold text-lg">
                {canAffordCurrent() ? "Continue" : "Can't Afford"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-center text-lg">No plant selected</Text>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BuyPlantBottomSheet;
