import { COLORS, defaultBackground } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Modal,
  Platform,
  Pressable,
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

export interface BuyPlantBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

const BuyPlantBottomSheet = forwardRef<
  BuyPlantBottomSheetRef,
  BuyPlantBottomSheetProps
>(({ selected_plant, money, can_afford, on_close, on_continue }, ref) => {
  const snapPoints = useMemo(() => ["40%"], []);
  const [number, setNumber] = useState("1");
  const [is_web_modal_visible, setIsWebModalVisible] = useState(false);
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const getCurrentCost = () =>
    selected_plant ? selected_plant.cost * Number(number || "0") : 0;

  const canAffordCurrent = () => can_afford(getCurrentCost());

  const handleDismiss = () => {
    setNumber("1");
    on_close();
  };

  useImperativeHandle(ref, () => ({
    present: () => {
      if (Platform.OS === "web") {
        setIsWebModalVisible(true);
      } else {
        bottomSheetRef.current?.present();
      }
    },
    dismiss: () => {
      if (Platform.OS === "web") {
        setIsWebModalVisible(false);
        handleDismiss();
      } else {
        bottomSheetRef.current?.dismiss();
      }
    },
  }));

  const ContentView = ({ children }: { children: React.ReactNode }) => (
    <View className="flex-1 py-2.5 px-4" style={{ paddingHorizontal: 15 }}>
      {children}
    </View>
  );

  const Input = Platform.OS === "web" ? TextInput : BottomSheetTextInput;

  const content = selected_plant ? (
    <View className="items-center">
      <View
        className="w-[80px] h-[80px] rounded-3xl mb-4 border items-center justify-center"
        style={{ borderColor: COLORS.lightgreen }}
      >
        <FontAwesome5 name="seedling" size={40} color={COLORS.lightgreen} />
      </View>

      <Text className="text-xl font-bold text-gray-600">
        Buying {selected_plant.name}
      </Text>

      <View
        className="flex-col items-center my-5 w-full gap-2 justify-between"
        style={{ width: 380 }}
      >
        <View className="flex-row justify-between items-center w-full px-4">
          <Text className="text-gray-600 text-2xl font-bold">Amount:</Text>
          <Input
            style={{
              borderWidth: 1,
              borderColor: COLORS.gray300,
              paddingVertical: 8,
              borderRadius: 50,
              width: 100,
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
          width: 340,
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
  );

  if (Platform.OS === "web") {
    return (
      <Modal
        visible={is_web_modal_visible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsWebModalVisible(false);
          handleDismiss();
        }}
      >
        <Pressable
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: COLORS.shadow }}
          onPress={() => {
            setIsWebModalVisible(false);
            handleDismiss();
          }}
        >
          <Pressable
            className="rounded-3xl p-6"
            style={{
              backgroundColor: defaultBackground,
              width: 400,
              maxHeight: "80%",
            }}
            onPress={e => e.stopPropagation()}
          >
            <ContentView>{content}</ContentView>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onDismiss={handleDismiss}
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
        {content}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BuyPlantBottomSheet;
