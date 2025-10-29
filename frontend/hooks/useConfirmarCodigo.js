import { useNavigation } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useRef, useState } from "react";
import { verificarToken } from "../service/UserService";

export default function useConfirmarCodigo() {
    const [code, setCode] = useState('');
    const [pieceCode, setPieceCode] = useState(['', '', '', '', '', '']);
    const [erro, setErro] = useState(null);
    const [currentTheme, setCurrentTheme] = useState("light");

    const inputs = useRef([]);
    const navigation = useNavigation();

    const handleToggleTheme = () => {
        const newTheme = currentTheme === "light" ? "dark" : "light";
        setCurrentTheme(newTheme);
    };

    const handleGoBack = () => {
        navigation.navigate('(auth)', { screen: 'esqueciSenha' })
    };

    const handlePieceCodeChange = (text, index) => {
        const newCode = [...pieceCode];
        newCode[index] = text.slice(-1);
        setPieceCode(newCode);

        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    useEffect(() => {
        setCode(pieceCode.join(""));
    }, [pieceCode]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await SecureStore.getItemAsync("jwt_token");
            if (token) {
                const response = await verificarToken({ token, code });
                if (response?.error) {
                    setErro(response.error);
                } else {
                    setErro(null);
                    navigation.navigate("(auth)", { screen: "criarNovaSenha" });
                }
            } else {
                setErro("Nenhum token encontrado");
            }
        } catch (error) {
            setErro("Erro de comunicação com o servidor!");
        }
    };

    return {
        code,
        pieceCode,
        inputs,
        erro,
        currentTheme,
        handleSubmit,
        handlePieceCodeChange,
        handleToggleTheme,
        handleGoBack
    };
}
