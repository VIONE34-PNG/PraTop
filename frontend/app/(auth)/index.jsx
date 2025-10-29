import "@/assets/styles/global.css";

import { ButtonPressable } from "@/components/ButtonPressable";
import { CheckboxInput } from "@/components/CheckboxInput";
import { LabelInput } from "@/components/LabelInput";
import { SafeContainer } from "@/components/SafeContainer";
import useLogin from "@/hooks/useLogin";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";


export default function Login() {
  const { email, password, erro, currentTheme, isSubmitting, handleEmailChange, handlePasswordChange, handleToggleTheme, handleGoToHome, handleGoToEsqueciSenha, handleGoToCriarConta, handleSubmit, handleSubmitGoogle } = useLogin();

  /*
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
      androidClientId:
        process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      profileImageSize: 150
    })
  })
  */

  return (
    <SafeContainer currentTheme={currentTheme}>
      <View className="mb-8">
        <Pressable onPress={handleGoToHome}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color="gray" />
        </Pressable>
      </View>

      <View className="">
        <View className="mb-10 gap-7">
          <Image source={require("@/assets/images/Logo.png")} className="size-28" />
          <Text className={`text-xl font-medium ${currentTheme === 'dark' ? "text-[#FFF3EB]" : "text-[#4B4B4C]"}`}>Entre com a sua conta</Text>
        </View>

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
        </View>

        <View className="flex-row items-center justify-between mt-5 mb-10">
          <View className="flex-row items-center gap-1">
            <CheckboxInput
              label="Manter conexão"
              checked={false}
              onChange={(val) => console.log("Checkbox está:", val)}
              color="#EC6F25"
              size={28}
              labelClassName="text-lg text-black"
              currentTheme={currentTheme}
            />
            <Text className={`text-base font-light ${currentTheme === "light" ? "text-[#4B4B4C]" : "text-[#FFF3EB]"}`}>
              Manter conexão
            </Text>
          </View>

          <Pressable onPress={handleGoToEsqueciSenha}>
            <Text className="text-[#EC6F25] font-medium">Esqueci a minha senha!</Text>
          </Pressable>
        </View>

        {!erro ? null : (
              <Text className="mb-4 text-lg text-center text-red-600">{erro}</Text>
            )}

        <View className="flex-col gap-5">
          <ButtonPressable onPress={handleSubmit} text="Login" currentTheme={currentTheme} />
          <Text
            className={`text-base font-medium text-center ${currentTheme === "light" ? "text-[#4B4B4C]" : "text-[#FFF3EB]"}`
            }>
            Ou
          </Text>
          <ButtonPressable
            onPress={handleSubmit}
            text="Entrar com o Google"
            removeBackground={true}
            disabled={isSubmitting}
            buttonClassName="border"
            textClassName="text-lg"
            iconName="google"
            currentTheme={currentTheme}
          />

          <View className="items-center">
            <Text className={`text-center w-42 break-words ${currentTheme === "dark" ? "text-[#FFF3EB]" : "text-[#4B4B4C]"}`}>
              Não tem uma conta?{' '}
              <Text className="text-[#EC6F25]" onPress={handleGoToCriarConta}>
                Crie a sua conta.
              </Text>
            </Text>
          </View>
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