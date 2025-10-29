import "@/assets/styles/global.css";

import { ButtonPressable } from "@/components/ButtonPressable";
import { LabelInput } from "@/components/LabelInput";
import { SafeContainer } from "@/components/SafeContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import useCriarNovaConta from "../../hooks/useCriarNovaConta";


export default function CriarNovaConta() {
  const { email, password, confirmPassword, erro, currentTheme, handleEmailChange, handlePasswordChange, handleConfirmPasswordChange, handleToggleTheme, handleGoToBack, handleSubmit } = useCriarNovaConta();

  return (
    <SafeContainer currentTheme={currentTheme}>
      <View className="mb-8">
        <Pressable onPress={handleGoToBack}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color="gray" />
        </Pressable>
      </View>

      <View className="flex justify-center h-11/12">
        <View className="gap-7">
          <Image source={require("@/assets/images/Logo.png")} className="size-28" />
          <Text className={`text-xl font-medium ${currentTheme === 'dark' ? "text-[#FFF3EB]" : "text-[#4B4B4C]"}`}>Cadastrar nova conta</Text>
        </View>

        <View className={`h-[1px] rounded mt-6 mb-8 ${currentTheme === 'dark' ? "bg-[#FFF3EB]" : "bg-[#4B4B4C]"}`} />

        <View className="gap-8">
          <LabelInput
            label="Endereço de e-mail"
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            currentTheme={currentTheme}
          />

          <LabelInput
            label="Senha"
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Digite sua senha"
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

        <View className="mt-6">
          <ButtonPressable onPress={handleSubmit} text="Cadastrar" currentTheme={currentTheme} />
        </View>

        <Pressable onPress={handleToggleTheme}>
          <Text className={`mt-4 text-lg ${currentTheme === "dark" ? "text-white" : "text-blue-500"
            }`}>
            Trocar tema
          </Text>
        </Pressable>
      </View>
    </SafeContainer>
  );
}