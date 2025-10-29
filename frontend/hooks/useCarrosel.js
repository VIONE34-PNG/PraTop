import React from "react";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

import { window } from "@/constants/sizes";
import { renderItem } from "@/utils/render-item";

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

export default function Carrosel() {
  const progress = useSharedValue(0);

  return (
    <View
      id="carousel-component"
      style={{
        width: window.width,
        alignSelf: "center",
      }}
      accessible
      accessibilityLabel="Carrossel de destaques"
    >
      <Carousel
        autoPlay
        autoPlayInterval={2000}
        data={defaultDataWith6Colors}
        height={258}
        loop
        pagingEnabled
        snapEnabled
        width={window.width}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={renderItem({ rounded: true })}
      />
    </View>
  );
}
