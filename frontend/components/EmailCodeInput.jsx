import { TextInput } from "react-native"

export const EmailCodeInput = ({
    value,
    onChangeText,
    inputClassName = "flex-6 h-18 pl-4 pr-4 border-2 rounded-2xl text-2xl text-center font-medium",
    currentTheme,
    ...props
}) => {
    return (
        <TextInput
            className={`will-change-variable ${inputClassName} ${currentTheme === 'dark' ? "border-[#FFF3EB] text-[#FFF3EB]" : "border-[#6B6E6C] text-[#6B6E6C]"}`}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="gray"
            secureTextEntry={false}
            keyboardType="numeric"
            maxLength={1}
            {...props}
        />
    )
}