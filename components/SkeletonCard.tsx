import { COLORS } from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, View } from "react-native";

type SkeletonCardProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  marginTop?: number;
  marginBottom?: number;
  showExtraRow?: boolean;
  showButton?: boolean;
  showTimer?: boolean;
  showCost?: boolean;
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  width = "90%",
  height = 120,
  borderRadius = 16,
  marginTop = 9,
  marginBottom = 5,
  showExtraRow = false,
  showButton = false,
  showTimer = false,
  showCost = false,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={
        {
          width,
          maxWidth: Platform.OS === "web" ? 600 : undefined,
          height,
          borderRadius,
          marginTop,
          marginBottom,
          backgroundColor: COLORS.gray200,
          opacity,
          alignSelf: "center",
        } as any
      }
    >
      <View style={{ flexDirection: "row", padding: 12 }}>
        <View
          style={{
            width: 120,
            height: 100,
            borderRadius: 12,
            backgroundColor: COLORS.gray300,
            marginRight: 12,
          }}
        />

        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "50%",
                height: 20,
                backgroundColor: COLORS.gray300,
                borderRadius: 8,
                marginTop: 20,
              }}
            />
            {showButton && (
              <View
                style={{
                  width: "25%",
                  height: 20,
                  backgroundColor: COLORS.gray300,
                  borderRadius: 10,
                }}
              />
            )}
          </View>
          <View
            style={{
              width: "50%",
              height: 14,
              backgroundColor: COLORS.gray300,
              borderRadius: 7,
            }}
          />

          {showCost && (
            <View
              style={{
                width: "50%",
                height: 10,
                backgroundColor: COLORS.gray300,
                borderRadius: 4,
              }}
            />
          )}

          {showTimer && (
            <View
              style={{
                width: "100%",
                height: 10,
                backgroundColor: COLORS.gray300,
                borderRadius: 4,
              }}
            />
          )}

          {showExtraRow && (
            <View
              style={{
                width: "30%",
                height: 25,
                backgroundColor: COLORS.gray300,
                borderRadius: 15,
                marginTop: 8,
                alignSelf: "flex-end",
              }}
            />
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default SkeletonCard;
