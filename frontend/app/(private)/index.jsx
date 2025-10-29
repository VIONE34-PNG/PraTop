import NotificacaoImg from "@/assets/images/configuracoes/notificacao.svg";
import "@/assets/styles/global.css";
import { SafeContainer } from "@/components/SafeContainer";
import { TextDarkMode } from "@/components/TextDarkMode";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { AvatarPlaceHolder } from "../../components/AvatarPlaceHolder";
import useConfiguracoes from "../../hooks/useConfiguracoes";

export default function Configurações() {

  const { email, fotoUrl, erro, currentTheme, handleEmailChange, handleToggleTheme, handleGoToHome, handleSubmit } = useConfiguracoes();

  return (
    <SafeContainer>
      <View className="flex-row items-center gap-6 mt-4">
        <View className="">
          <Pressable onPress={handleGoToHome}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="gray" />
          </Pressable>
        </View>

        <TextDarkMode currentTheme={currentTheme} className={"text-2xl font-medium"}>
          Configurações
        </TextDarkMode>
      </View>

      <View className="flex-row items-center gap-8 my-12">
        {fotoUrl ? (
          <Image
            source={{ uri: fotoUrl }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
            accessibilityLabel="Foto do usuário"
            accessible={true}
          />
        ) : (
          <AvatarPlaceHolder email={email || ""} />
        )}

        <View className="flex-col gap-2 justify-center-center">
          <Text className="text-[#DB956C] text-xl font-bold">{email}</Text>
          <TextDarkMode className={"font-light text-md"} currentTheme={currentTheme}>Personal Info</TextDarkMode>
        </View>
      </View>

      <View>
        <TextDarkMode className={"font-medium text-xl mb-10"} currentTheme={currentTheme}>Configurações</TextDarkMode>
        <View className="flex-col gap-10">
          <View className="flex-row justify-between">
            <View className="flex-row gap-6">
              <NotificacaoImg />
              <Text>Notificação</Text>
            </View>

            <Pressable><Text>Botão</Text></Pressable>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row gap-6">
              <NotificacaoImg />
              <Text>Notificação</Text>
            </View>

            <Pressable><Text>Botão</Text></Pressable>
          </View>

          <Pressable className="flex-row gap-6">
            <NotificacaoImg />
            <Text>Compartilhar</Text>
          </Pressable>

          <Pressable className="flex-row gap-6">
            <NotificacaoImg />
            <Text>Suporte</Text>

          </Pressable>

          <Pressable className="flex-row gap-6">
            <NotificacaoImg />
            <Text>Acessibilidade</Text>

          </Pressable>
        </View>
      </View>

    </SafeContainer>
  );
}
