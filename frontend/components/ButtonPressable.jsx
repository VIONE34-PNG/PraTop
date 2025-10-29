import { Image, Pressable, Text } from 'react-native';

export const ButtonPressable = ({
    text,
    onPress,
    buttonClassName,
    textClassName,
    currentTheme,
    iconName = "",
    removeBackground,
    disabled,
    ...props
}) => {

    const baseButtonClassName = "will-change-variable w-full py-3 rounded-2xl";
    const baseTextClassName = "will-change-variable text-center text-2xl text-[#FFF3EB] font-semibold";

    const icons = {
        google: require("@/assets/images/IconGoogle.png"),
        apple: require("@/assets/images/IconApple.png")
    }

    return (
        <Pressable 
            onPress={onPress} 
            disabled={disabled}
            className={`flex-row justify-center items-center gap-4 
                ${baseButtonClassName} 
                ${removeBackground && currentTheme === "dark" ? "border-[#FFF3EB]" 
                : removeBackground ? "": "bg-[#EC6F25]"} ${buttonClassName}`
            }>
            {iconName !== "" ? (
                <Image source={icons[iconName]} className="size-8"/>
            ) : null}
            <Text className={`${baseTextClassName} ${textClassName} ${removeBackground && currentTheme === "light" ? "!text-[#4B4B4C]" : ""}`}>
                {text}
            </Text>
        </Pressable>
    )
}