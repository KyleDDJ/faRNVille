import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BuyPlantBottomSheet from "@/components/BuyPlantBottomSheet";
import EarningsSummary from "@/components/EarningsSummary";
import PlantCard from "@/components/PlantCard";
import PurchaseConfirmationModal from "@/components/PurchaseConfirmationModal";
import PurchaseSuccessModal from "@/components/PurchaseSuccessModal";
import ShopSkeletonCard from "@/components/ShopSkeleton";
import { defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import { usePlants } from "@/contexts/PlantsContext";
import { Plants, PurchaseInfo } from "@/entities/plant.entities";

/* Screen: ShopScreen
 * Main Expo Router screen for buying plants
 */
const ShopScreen: React.FC = () => {
  /* Contexts */
  const { buyPlant, canAfford, money } = usePlants();

  /* Local state */
  const [loading, setLoading] = useState(true);
  const [selected_plant, setSelectedPlant] = useState<Plants | null>(null);
  const [success_modal_visible, setSuccessModalVisible] = useState(false);
  const [confirmation_modal_visible, setConfirmationModalVisible] =
    useState(false);
  const [purchase_info, setPurchaseInfo] = useState<PurchaseInfo | null>(null);

  /* Bottom Sheet ref */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  /*
   * DOCU: Open Bottom Sheet for adding a plant
   */
  const handleAddPlant = (plant: Plants) => {
    setSelectedPlant(plant);
    handleOpen();
  };

  /*
   * DOCU: Present the Bottom Sheet
   */
  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  /*
   * DOCU: Confirm purchase and show success modal if applicable
   */
  const handleConfirmPurchase = () => {
    if (purchase_info) {
      const purchaseSuccess = buyPlant(
        purchase_info.plantId,
        Number(purchase_info.count)
      );

      setConfirmationModalVisible(false);
      purchaseSuccess && setSuccessModalVisible(true);
    }
  };

  /*
   * DOCU: Set loading state timeout
   */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  /*
   * DOCU: Render ShopScreen content
   */
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: defaultBackground }}
    >
      <EarningsSummary />

      <View className="flex-1 pt-6 pb-16">
        {loading ? (
          <ShopSkeletonCard />
        ) : (
          <FlatList
            data={PLANTS}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <PlantCard plant={item} on_add={handleAddPlant} variant="shop" />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 64 }}
          />
        )}
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
        on_continue={purchaseInfo => {
          setPurchaseInfo(purchaseInfo);
          bottomSheetModalRef.current?.dismiss();
          setConfirmationModalVisible(true);
        }}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;
