import "@/assets/styles/global.css";
import { SafeContainer } from "@/components/SafeContainer";
import { window } from "@/constants/sizes";
import { renderItem } from "@/utils/render-item";
import { useNavigation } from "expo-router";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

export default function Home() {
  const navigation = useNavigation();
  const progress = useSharedValue(0);

  const carouselData = useMemo(() => defaultDataWith6Colors, []);

  const handleGoToLogin = () => {
    navigation.navigate("(auth)", { screen: "login" });
  };

  const handleGoToConfiguration = () => {
    navigation.navigate("(private)", { screen: "index" });
  };

  return (
    <SafeContainer>
      <View className="gap-8">
        <View>
          <Text className="text-2xl font-semibold mb-4">Bem-vindo</Text>
          <Text className="text-base text-gray-500">
            Explore os destaques do aplicativo no carrossel abaixo.
          </Text>
        </View>

        <View
          id="carousel-component"
          dataSet={{ kind: "basic-layouts", name: "parallax" }}
        >
          <Carousel
            autoPlayInterval={2000}
            data={carouselData}
            height={258}
            loop
            pagingEnabled
            snapEnabled
            width={window.width}
            style={{ width: window.width }}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            onProgressChange={progress}
            renderItem={renderItem({ rounded: true })}
          />
        </View>

        <View className="gap-4">
          <Pressable onPress={handleGoToLogin} className="py-3">
            <Text className="font-sans text-[#DB956C]">
              Ir para a tela de login
            </Text>
          </Pressable>

          <Pressable onPress={handleGoToConfiguration} className="py-3">
            <Text className="font-sans text-[#DB956C]">
              Ir para a tela de configurações
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeContainer>
  );
}
