import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#F8F8F8",
    textAlign: "center",
  },
});

export const renderItem = ({ rounded = false } = {}) => ({ item }) => {
  const backgroundColor =
    typeof item === "string"
      ? item
      : item?.backgroundColor || "#EC6F25";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderRadius: rounded ? 28 : 0,
          marginHorizontal: rounded ? 16 : 0,
        },
      ]}
    >
      {typeof item === "object" && item !== null ? (
        <>
          {item?.title ? (
            <Text style={styles.title}>{item.title}</Text>
          ) : null}
          {item?.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}
          {item?.children}
        </>
      ) : null}
    </View>
  );
};
