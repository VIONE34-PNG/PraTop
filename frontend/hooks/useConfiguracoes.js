import { useNavigation } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { buscarPorToken, login } from "../service/UserService";

export default function useConfiguracoes() {
    const [id, setId] = useState(null);
    const [email, setEmail] = useState("");
    const [fotoUrl, setFotoUrl] = useState("");
    const [erro, setErro] = useState(null);
    const [currentTheme, setCurrentTheme] = useState("light");

    const navigation = useNavigation();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await SecureStore.getItemAsync("jwt_token");
                if (!token) return navigation.navigate("(auth)", { screen: "index" });
                
                const response = await buscarPorToken(token);
                if (response) {
                    setId(response.id);
                    setEmail(response.email);
                    setFotoUrl(response.fotoUrl);
                }

            } catch (error) {
                console.error("Erro ao buscar token:", error);
            }
        };

        fetchToken();
    }, []);

    const handleGoToHome = () => {
        navigation.navigate("(public)", { screen: "index" });
    };

    const handleToggleTheme = () => {
        setCurrentTheme(currentTheme === "light" ? "dark" : "light")
    };

    const handleEmailChange = (text) => {
        setEmail(text)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ email, password });
            if (response?.error) {
                setErro(response.error);
            } else {
                setErro(null);
                await SecureStore.setItemAsync('jwt_token', response.jwt)
                navigation.navigate('(private)', { screen: 'index' });
            }
        } catch (error) {
            setErro("Erro de comunicação com o servidor!");
        }
    }

    return {
        email,
        fotoUrl,
        erro,
        currentTheme,
        handleEmailChange,
        handleToggleTheme,
        handleGoToHome,
        handleSubmit
    };
}
