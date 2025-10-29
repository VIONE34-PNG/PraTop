import "@/assets/styles/global.css";

import SucessoMensagemImg from "@/assets/images/sucessoMensagem.svg";
import { ButtonPressable } from "@/components/ButtonPressable";
import { SafeContainer } from "@/components/SafeContainer";
import { TextDarkMode } from "@/components/TextDarkMode";
import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import useSucessoTrocaSenha from "../../hooks/useSucessoTrocaSenha";


export default function SucessoMensagem() {
    const { title, text } = useLocalSearchParams();
    const { currentTheme, handleToggleTheme, handleGoHome } = useSucessoTrocaSenha();

    return (
        <SafeContainer currentTheme={currentTheme}>
            <View className="flex justify-center h-full">
                <View className="">
                
                    <View className="flex items-center justify-center">
                        <SucessoMensagemImg className="w-full h-full" />
                    </View>

                    <View className="gap-8 my-12">
                        <TextDarkMode
                            currentTheme={currentTheme}
                            className={"text-2xl font-bold text-center"}>
                            {title}
                        </TextDarkMode>

                        <TextDarkMode
                            currentTheme={currentTheme}
                            className={"text-lg font-medium text-center"}>
                            Agora você pode acessar {text}. Lembre-se de mantê-la segura e não compartilhá-la com ninguém.
                        </TextDarkMode>
                    </View>

                    <View className="flex-row items-center justify-between mt-5 mb-10">
                        <ButtonPressable onPress={handleGoHome} text="Voltar à Tela Inicial" currentTheme={currentTheme} />
                    </View>

                    <Pressable onPress={handleToggleTheme}>
                        <Text className={`mt-4 text-lg ${currentTheme === "dark" ? "text-white" : "text-blue-500"
                            }`}>
                            Trocar tema
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeContainer>
    );
}