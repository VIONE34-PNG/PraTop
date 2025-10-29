import Logo from "@/assets/images/Logo.png";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Image, Pressable, Text, View } from "react-native";

export default function Welcome() {
  const navigation = useRouter();

  const handleContinue = async () => {
    try {
      await SecureStore.setItemAsync("seenWelcome", "true");
      navigation.navigate('(public)', { screen: 'index' }); 
    } catch (e) {
      console.warn("Erro ao salvar welcome flag:", e);
    }
  };

  return (
    <View className="items-center justify-center flex-1 px-6 bg-white dark:bg-black">
      
      {/* Logo */}
      <Image source={Logo} className="w-40 h-40 mb-8" resizeMode="contain" />

      {/* Título */}
      <Text className="mb-4 text-3xl font-bold text-center text-gray-800 dark:text-white">
        Bem-vindo ao PraTop
      </Text>

      {/* Subtítulo */}
      <Text className="mb-10 text-lg text-center text-gray-600 dark:text-gray-300">
        O melhor sistema para gerenciar suas tarefas e produtos.
      </Text>

      {/* Botão para avançar */}
      <Pressable
        onPress={handleContinue}
        className="bg-[#EC6F25] px-8 py-4 rounded-2xl"
      >
        <Text className="text-lg font-semibold text-center text-white">
          Começar
        </Text>
      </Pressable>
    </View>
  );
}
