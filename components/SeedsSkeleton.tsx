import React from "react";
import { FlatList } from "react-native";
import SkeletonCard from "./SkeletonCard";

type SeedsSkeletonProps = {
  count?: number;
};

const SeedsSkeleton: React.FC<SeedsSkeletonProps> = ({ count = 3 }) => (
  <FlatList
    data={Array.from({ length: count })}
    keyExtractor={(_, i) => i.toString()}
    renderItem={() => <SkeletonCard showCost />}
    contentContainerStyle={{ paddingBottom: 64 }}
    showsVerticalScrollIndicator={false}
  />
);

export default SeedsSkeleton;
