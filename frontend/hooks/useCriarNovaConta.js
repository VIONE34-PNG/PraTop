import { useNavigation } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { cadastrarConta } from "../service/UserService";

WebBrowser.maybeCompleteAuthSession();

export default function useCriarNovaConta() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [erro, setErro] = useState(null);
    const [currentTheme, setCurrentTheme] = useState("light");

    const navigation = useNavigation();

    const handleGoToBack = () => {
        navigation.navigate("(auth)", { screen: "index" })
    };

    const handleToggleTheme = () => {
        setCurrentTheme(currentTheme === "light" ? "dark" : "light")
    };

    const handleEmailChange = (text) => {
        setEmail(text);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
            setErro("Digite um e-mail válido");
        } else {
            setErro(null);
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text)
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //TODO: Verificação do email
        if (password !== "" && confirmPassword !== "" && password === confirmPassword) {
            const response = await cadastrarConta({ email, password });

            if (response?.error) {
                setErro(response.error);
            } else {
                setErro(null);
                navigation.navigate("(auth)", {
                    screen: "sucessoMensagem", params: {
                        title: "Conta criada com sucesso!",
                        text: "a sua nova conta"
                    }
                });
            }
        } else {
            setErro("As senhas não são iguais!");
        }
    }

    return {
        email,
        password,
        confirmPassword,
        erro,
        currentTheme,
        handleEmailChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleToggleTheme,
        handleGoToBack,
        handleSubmit
    };
}