import { Text, View } from "react-native";

export const AvatarPlaceHolder = ({ email, tamanho = 64 }) => {
  const inicial = email ? email.charAt(0).toUpperCase() : '?';

  const corFundo = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

  return (
    <View
      style={{
        width: tamanho,
        height: tamanho,
        borderRadius: tamanho / 2,
        backgroundColor: corFundo,
        justifyContent: "center",
        alignItems: "center",
      }}
      accessibilityLabel={`Avatar do usuário, inicial ${inicial}`}
      accessible={true}
    >
      <Text style={{ color: "white", fontSize: tamanho / 2, fontWeight: "bold" }}>
        {inicial}
      </Text>
    </View>
  );
}