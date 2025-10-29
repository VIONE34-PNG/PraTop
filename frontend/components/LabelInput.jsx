import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const LabelInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    containerClassName = "",
    labelClassName = "text-[#6B6E6C] text-lg mb-2",
    inputClassName = "border-2 rounded-[18] pl-4 pr-4 h-16",
    currentTheme,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <View className={containerClassName}>
            <Text accessibilityLabel={label} className={`${labelClassName} ${currentTheme === 'dark' ? "text-[#FFF3EB]" : ""}`}>
                {label}
            </Text>
            {secureTextEntry === true ? (
                <View className='relative w-full'>
                    <TextInput
                        className={`will-change-variable ${inputClassName} ${currentTheme === 'dark' ? "border-[#FFF3EB] text-[#FFF3EB]" : "border-[#6B6E6C] text-[#6B6E6C]"}`}
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor="gray"
                        secureTextEntry={!showPassword}
                        {...props}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} className="absolute top-0 right-0 items-center justify-center w-12 h-full">
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color={currentTheme === 'light' ? 'gray' : '#FFF3EB'}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <TextInput
                    className={`will-change-variable ${inputClassName} ${currentTheme === 'dark' ? "border-[#FFF3EB] text-[#FFF3EB]" : "border-[#6B6E6C] text-[#6B6E6C]"}`}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="gray"
                    secureTextEntry={secureTextEntry}
                    {...props}
                />
            )}
        </View>
    );
};