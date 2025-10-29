import "@/assets/styles/global.css";
import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export const SafeContainer = ( {currentTheme, children} ) => {
    return (
        <View className={`flex-1 ${currentTheme === 'dark' ? "bg-gray-900" : "bg-[#FFF3EB]"}`}>
            <SafeAreaView style={{ marginLeft: 24, marginRight: 24, marginBottom: 16 }}>
                {children}
            </SafeAreaView>
        </View>
    )
}
