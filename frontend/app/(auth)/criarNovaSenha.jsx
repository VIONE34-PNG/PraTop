import "@/assets/styles/global.css";

import { ButtonPressable } from "@/components/ButtonPressable";
import { LabelInput } from "@/components/LabelInput";
import { SafeContainer } from "@/components/SafeContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import useCriarNovaSenha from "../../hooks/useCriarNovaSenha";


export default function CriarNovaSenha() {
    const { password, confirmPassword, erro, currentTheme, handlePasswordChange, handleConfirmPasswordChange, handleToggleTheme, handleGoBack, handleSubmit } = useCriarNovaSenha();

    return (
        <SafeContainer currentTheme={currentTheme}>
            <View className="">
                <View className="mb-8">
                    <Pressable onPress={handleGoBack}>
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={32}
                            color="gray" />
                    </Pressable>
                </View>

                <View className="flex justify-center h-11/12">
                    <View className="mb-10 gap-7">
                        <Image source={require("@/assets/images/Logo.png")} className="size-28" />
                        <Text className={`text-xl font-medium ${currentTheme === 'dark' ? "text-[#FFF3EB]" : "text-[#4B4B4C]"}`}>Criar a sua nova senha</Text>
                    </View>

                    <View className="gap-8">
                        <LabelInput
                            label="Nova senha"
                            value={password}
                            onChangeText={handlePasswordChange}
                            placeholder="Digite a sua nova senha"
                            keyboardType="password"
                            secureTextEntry={true}
                            currentTheme={currentTheme}
                        />

                        <View>
                            <LabelInput
                                label="Confirmar senha"
                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                                placeholder="Confirme a sua nova senha"
                                keyboardType="password"
                                secureTextEntry={true}
                                currentTheme={currentTheme}
                            />

                            {!erro ? null : (
                                <Text className="mt-4 text-lg text-center text-red-600">{erro}</Text>
                            )}
                        </View>
                    </View>

                    <View className="flex items-center justify-between mt-5 mb-10">
                        <ButtonPressable onPress={handleSubmit} text="Confirmar" currentTheme={currentTheme} />
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