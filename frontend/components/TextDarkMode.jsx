import { Text } from "react-native";

export const TextDarkMode = ({
    className,
    currentTheme,
    children
}) => {
    return (
        <Text className={`${className} ${currentTheme === 'dark' ? "text-[#FFF3EB]" : "text-[#4B4B4C]"}`}>
            {children}
        </Text>
    );
}