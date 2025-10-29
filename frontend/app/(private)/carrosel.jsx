import "@/assets/styles/global.css";

import { SafeContainer } from "@/components/SafeContainer";
import Carrosel from "@/hooks/useCarrosel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function CarroselScreen() {
  const navigation = useNavigation();

  return (
    <SafeContainer>
      <View className="flex-row items-center gap-4 mt-4 mb-8">
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color="gray" />
        </Pressable>
        <Text className="text-2xl font-semibold text-[#4B4B4C]">
          Destaques
        </Text>
      </View>

      <Carrosel />
    </SafeContainer>
  );
}
