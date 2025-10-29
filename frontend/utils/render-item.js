import React from "react";
import { View } from "react-native";

export function renderItem({ rounded = false } = {}) {
  return ({ item }) => (
    <View
      style={{
        flex: 1,
        borderRadius: rounded ? 24 : 0,
        backgroundColor: item,
        marginHorizontal: 12,
      }}
    />
  );
}
