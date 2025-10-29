import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

// Imports de Fontes e Splash Screen
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Previne o auto-hide da splash screen
SplashScreen.preventAutoHideAsync();

async function loadApplicationAssets() {
    await Font.loadAsync({
        'Inter-Regular': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
        'Inter-Italic': require('../assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf'),
    });
}

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await loadApplicationAssets();
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return <View onLayout={onLayoutRootView} style={{ flex: 1 }} />;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack initialRouteName='(welcome)'>
                <Stack.Screen name="(welcome)" options={{ headerShown: false }} />
                <Stack.Screen name="(public)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(private)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </View>
    );
}