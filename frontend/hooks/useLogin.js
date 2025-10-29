import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { useState } from "react";
import { login } from "../service/UserService";

WebBrowser.maybeCompleteAuthSession();

export default function useLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState(null);
    const [currentTheme, setCurrentTheme] = useState("light");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();

    const handleGoToHome = () => {
        navigation.navigate("(public)", { screen: "index" });
    };

    const handleGoToEsqueciSenha = () => {
        navigation.navigate("(auth)", { screen: "esqueciSenha" });
    };

    const handleGoToCriarConta = () => {
        navigation.navigate("(auth)", { screen: "criarNovaConta" });
    };

    const handleToggleTheme = () => {
        setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    // 🔧 Função principal de login
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setErro(null);

        try {
            const response = await login({ email, password });
            console.log("Resposta do backend:", response);

            // Caso o backend retorne erro
            if (response?.error) {
                setErro(response.error);
                setIsSubmitting(false);
                return;
            }

            // Caso o backend retorne JWT (login bem-sucedido)
            if (response?.jwt) {
                // 🔐 Armazena o token dependendo da plataforma
                if (Platform.OS === "web") {
                    localStorage.setItem("jwt_token", response.jwt);
                } else {
                    await SecureStore.setItemAsync("jwt_token", response.jwt);
                }

                setErro(null);
                navigation.navigate("(private)", { screen: "index" });
            } else {
                setErro("Erro inesperado ao fazer login.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setErro("Erro de comunicação com o servidor!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        email,
        password,
        erro,
        currentTheme,
        isSubmitting,
        setCurrentTheme,
        setEmail,
        setPassword,
        handleSubmit,
        handleEmailChange,
        handlePasswordChange,
        handleToggleTheme,
        handleGoToHome,
        handleGoToEsqueciSenha,
        handleGoToCriarConta,
    };
}
