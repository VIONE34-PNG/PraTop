import { useNavigation } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { cadastrarNovaSenha } from "../service/UserService";

WebBrowser.maybeCompleteAuthSession();

export default function useCriarNovaSenha() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [erro, setErro] = useState(null);
    const [currentTheme, setCurrentTheme] = useState("light");

    const navigation = useNavigation();

    const handleToggleTheme = () => {
        setCurrentTheme(currentTheme === "light" ? "dark" : "light")
    };

    const handleGoBack = () => {
        navigation.navigate('(auth)', { screen: 'confirmarCodigo' })
    };

    const handlePasswordChange = (text) => {
        setPassword(text)
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (password !== "" && confirmPassword !== "" && password === confirmPassword) {
                const token = await SecureStore.getItemAsync("jwt_token");
                if (token) {
                    const response = await cadastrarNovaSenha({ token, novaPassword: password });
                    if (response?.error) {
                        setErro(response.error);
                    } else {
                        setErro(null);
                        navigation.navigate("(auth)", {
                            screen: "sucessoMensagem", params: {
                                title: "Senha alterada com sucesso!",
                                text: "sua conta com a nova senha"
                            }
                        });
                    }
                } else {
                    setErro("Nenhum token encontrado");
                }
            }else{
                setErro("As senhas não são iguais!");
            }
        } catch (error) {
            setErro("Erro de comunicação com o servidor!");
        }
    };

    return {
        password,
        confirmPassword,
        erro,
        currentTheme,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleToggleTheme,
        handleGoBack,
        handleSubmit
    };
}
