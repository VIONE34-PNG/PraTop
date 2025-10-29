import { useNavigation } from "expo-router";
import { useState } from "react";

export default function useSucessoTrocaSenha() {
    const [currentTheme, setCurrentTheme] = useState("light");
    const navigation = useNavigation();

    const handleToggleTheme = () => {
        const newTheme = currentTheme === "light" ? "dark" : "light";
        setCurrentTheme(newTheme);
    };

    const handleGoHome = async (e) => {
        e.preventDefault();
        console.log("Sucesso!");
        navigation.navigate("(auth)", {screen: "index"});

        // try {
        //     const response = await loginUsuario({ email, password });

        //     if(response !== null){
        //         alert(response);
        //         const setor = await encontrarSetorUsuarioEmail(email);

        //         if(setor !== null) {
        //             router.push(`backoffice/home?setor=${setor}`);
        //         }

        //     } else {
        //         setErro(response);
        //     }
        // } catch (error) {
        //     console.log(error);
        //     setErro("Erro de comunicação com o servidor!");
        // }
    };

    return {
        currentTheme,
        handleToggleTheme,
        handleGoHome,
    };
}