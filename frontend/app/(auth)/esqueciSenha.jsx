import EsqueciSenhaImg from "@/assets/images/esqueciSenha.svg";
import "@/assets/styles/global.css";
import { ButtonPressable } from "@/components/ButtonPressable";
import { LabelInput } from "@/components/LabelInput";
import { SafeContainer } from "@/components/SafeContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { TextDarkMode } from "../../components/TextDarkMode";
import useEsqueciSenha from "../../hooks/useEsqueciSenha";

export default function EsqueciSenha() {
    const { email, erro, currentTheme, handleSubmit, handleEmailChange, handleToggleTheme, handleGoBack } = useEsqueciSenha();

    return (
        <SafeContainer currentTheme={currentTheme}>

            <View className="flex-row items-center justify-between mb-8">
                <Pressable onPress={handleGoBack}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={32}
                        color="gray" />
                </Pressable>
                <Text className={`text-xl font-medium ${currentTheme === 'dark' ? "text-[#FFF3EB]" : "text-[#4B4B4C]"}`}>Esqueci a senha</Text>
                <Image source={require("@/assets/images/Logo.png")} className="size-12" />
            </View>

            <View className="flex justify-center h-11/12">
                <View className="">
                    <View className="flex items-center justify-center">
                        <EsqueciSenhaImg className="w-full h-full" />
                    </View>

                    <View className="h-12 my-10">
                        <TextDarkMode
                            currentTheme={currentTheme}
                            className={`text-base text-center`}>
                            Digite o seu e-mail cadastrado. Enviaremos um link para redefinir sua senha diretamente na sua caixa de entrada.
                        </TextDarkMode>
                    </View>

                    <View className="gap-8">
                        <View>
                            <LabelInput
                                label="Endereço de e-mail"
                                value={email}
                                onChangeText={handleEmailChange}
                                placeholder="Digite seu e-mail"
                                keyboardType="email-address"
                                currentTheme={currentTheme}
                            />

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