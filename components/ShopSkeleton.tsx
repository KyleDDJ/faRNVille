import React from "react";
import { FlatList } from "react-native";
import SkeletonCard from "./SkeletonCard";

type ShopSkeletonProps = {
  count?: number;
};

const ShopSkeleton: React.FC<ShopSkeletonProps> = ({ count = 3 }) => (
  <FlatList
    data={Array.from({ length: count })}
    keyExtractor={(_, i) => i.toString()}
    renderItem={() => <SkeletonCard showExtraRow showCost />}
    contentContainerStyle={{ paddingBottom: 64 }}
    showsVerticalScrollIndicator={false}
  />
);

export default ShopSkeleton;
