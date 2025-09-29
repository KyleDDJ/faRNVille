import React from "react";
import { FlatList } from "react-native";
import SkeletonCard from "./SkeletonCard";

type FarmSkeletonProps = {
  count?: number;
};

const FarmSkeleton: React.FC<FarmSkeletonProps> = ({ count = 3 }) => (
  <FlatList
    data={Array.from({ length: count })}
    keyExtractor={(_, i) => i.toString()}
    renderItem={() => <SkeletonCard showButton showTimer />}
    contentContainerStyle={{ paddingBottom: 120 }}
    showsVerticalScrollIndicator={false}
  />
);

export default FarmSkeleton;
