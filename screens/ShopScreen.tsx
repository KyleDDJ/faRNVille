import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BuyPlantBottomSheet from "@/components/BuyPlantBottomSheet";
import EarningsSummary from "@/components/EarningsSummary";
import PlantCard from "@/components/PlantCard";
import PurchaseConfirmationModal from "@/components/PurchaseConfirmationModal";
import PurchaseSuccessModal from "@/components/PurchaseSuccessModal";
import { defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import { usePlants } from "@/contexts/PlantsContext";
import { Plants } from "@/entities/plant.entities";

const ShopScreen = () => {
  const { buyPlant, canAfford, money } = usePlants();

  const [selected_plant, setSelectedPlant] = useState<Plants | null>(null);
  const [number, onChangeNumber] = React.useState("1");
  const [success_modal_visible, setSuccessModalVisible] = useState(false);
  const [confirmation_modal_visible, setConfirmationModalVisible] =
    useState(false);
  const [purchase_info, setPurchaseInfo] = useState<{
    name: string;
    count: string;
    cost: number;
    plantId: number;
  } | null>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%"], []);

  const handleAddPlant = (plant: Plants) => {
    setSelectedPlant(plant);
    onChangeNumber("1");
    handleOpen();
  };

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    onChangeNumber("1");
  }, []);

  const handleConfirmPurchase = () => {
    if (purchase_info) {
      const purchaseSuccess = buyPlant(
        purchase_info.plantId,
        Number(purchase_info.count)
      );
      console.log("Confirmed purchase:", purchase_info);

      setConfirmationModalVisible(false);

      purchaseSuccess && setSuccessModalVisible(true);
    }
  };

  const getCurrentCost = () => {
    if (!selected_plant) return 0;
    return selected_plant.cost * Number(number || "0");
  };

  const canAffordCurrent = () => {
    return canAfford(getCurrentCost());
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: defaultBackground }}
    >
      <EarningsSummary />
      <View className="flex-1 pt-6 pb-16">
        <FlatList
          data={PLANTS}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <PlantCard plant={item} on_add={handleAddPlant} variant="shop" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        />
      </View>

      <PurchaseConfirmationModal
        visible={confirmation_modal_visible}
        purchase_info={purchase_info}
        on_cancel={() => setConfirmationModalVisible(false)}
        on_confirm={handleConfirmPurchase}
      />

      <PurchaseSuccessModal
        visible={success_modal_visible}
        purchase_info={purchase_info}
        on_close={() => setSuccessModalVisible(false)}
      />
      <BuyPlantBottomSheet
        ref={bottomSheetModalRef}
        selected_plant={selected_plant}
        money={money}
        can_afford={canAfford}
        on_close={() => setSelectedPlant(null)}
        on_continue={info => {
          setPurchaseInfo(info);
          bottomSheetModalRef.current?.dismiss();
          setConfirmationModalVisible(true);
        }}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;
