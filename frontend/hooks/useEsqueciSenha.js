import { useNavigation } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { enviarToken } from "../service/UserService";

export default function useEsqueciSenha() {
    const [email, setEmail] = useState('');
    const [erro, setErro] = useState(null);
    const [currentTheme, setCurrentTheme] = useState("light");

    const navigation = useNavigation();

    const handleToggleTheme = () => {
        const newTheme = currentTheme === "light" ? "dark" : "light";
        setCurrentTheme(newTheme);
    };

    const handleGoBack = () => {
        navigation.navigate('(auth)', { screen: 'index' })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await enviarToken(email);
            if (response?.error) {
                setErro(response.error);
            } else {
                setErro(null);
                if (response?.jwt) {
                    await SecureStore.setItemAsync('jwt_token', response.jwt);
                    navigation.navigate('(auth)', { screen: 'confirmarCodigo'});
                }
            }
        } catch (error) {
            setErro("Erro de comunicação com o servidor!");
        }
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    return {
        email,
        erro,
        currentTheme,
        setCurrentTheme,
        setEmail,
        handleSubmit,
        handleEmailChange,
        handleToggleTheme,
        handleGoBack
    };
}
