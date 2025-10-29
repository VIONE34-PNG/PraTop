import ConfirmarCodigoImg from "@/assets/images/confirmarCodigoSenha.svg";
import "@/assets/styles/global.css";
import { ButtonPressable } from "@/components/ButtonPressable";
import { EmailCodeInput } from "@/components/EmailCodeInput";
import { SafeContainer } from "@/components/SafeContainer";
import { TextDarkMode } from "@/components/TextDarkMode";
import useConfirmarCodigo from "@/hooks/useConfirmarCodigo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

export default function ConfirmarCodigo() {
    const { code, pieceCode, inputs, erro, currentTheme, handleSubmit, handlePieceCodeChange, handleToggleTheme, handleGoBack } = useConfirmarCodigo();

    return (
        <SafeContainer currentTheme={currentTheme}>
            <View className="flex-row items-center justify-between mb-8">
                <Pressable onPress={handleGoBack}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={32}
                        color="gray" />
                </Pressable>
                <Text className={`text-xl font-medium ${currentTheme === 'dark' ? "text-[#FFF3EB]" : "text-[#4B4B4C]"}`}>Confirmar código</Text>
                <Image source={require("@/assets/images/Logo.png")} className="size-12" />
            </View>

            <View className="flex justify-center h-11/12">
                <View className="">
                    <View className="flex items-center justify-center">
                        <ConfirmarCodigoImg className="w-full h-full" />
                    </View>

                    <View className="flex items-center my-8 h-14">
                        <TextDarkMode
                            currentTheme={currentTheme}
                            className={`w-72 text-2xl text-center font-bold`}>
                            Verifique a sua caixa de entrada!
                        </TextDarkMode>
                    </View>

                    <View className="gap-8">
                        <View>
                            <TextDarkMode currentTheme={currentTheme} className="mb-2 text-lg">
                                Insira o código
                            </TextDarkMode>

                            <View className="flex-row gap-4">
                                {pieceCode.map((text, index) => (
                                    <EmailCodeInput
                                        key={index}
                                        ref={(ref) => (inputs.current[index] = ref)}
                                        onChangeText={(text) => handlePieceCodeChange(text, index)}
                                        currentTheme={currentTheme}
                                    />
                                ))}
                                
                            </View>

                            {!erro ? null : (
                                <Text className="mt-4 text-lg text-center text-red-600">{erro}</Text>
                            )}
                        </View>

                        <ButtonPressable onPress={handleSubmit} text="Enviar Código" currentTheme={currentTheme} />
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