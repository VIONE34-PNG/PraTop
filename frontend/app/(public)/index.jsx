import "@/assets/styles/global.css";
import { SafeContainer } from "@/components/SafeContainer";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Pressable, Text } from "react-native";

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
  };

  const navigation = useNavigation();

  const handleGoToLogin = () => {
    navigation.navigate('(auth)', {screen: 'login'}); 
  };

  const hangleGoToConfiguration = () => {
    navigation.navigate('(private)', {screen: 'index'}); 
  };

 const hangleGoToCarrosel = () => {
    navigation.navigate('(private)', {screen: 'carrosel'}); 
  };  

  return (
    <SafeContainer>
      <Pressable onPress={handleGoToLogin}>
        <Text className="font-sans">
          Ir para a tela de login
        </Text>
      </Pressable>

      <Pressable onPress={hangleGoToConfiguration}>
        <Text className="font-sans">
          Ir para a tela de configurações
        </Text>
      </Pressable>

      <Pressable onPress={hangleGoToCarrosel}>
        <Text className="font-sans">
          Ir para a tela do carrosel
        </Text>
      </Pressable>
    </SafeContainer>
  );
}
