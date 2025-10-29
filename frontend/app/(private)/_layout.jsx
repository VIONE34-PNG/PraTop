import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function PrivateLayout() {
  const colorScheme = useColorScheme();
  return (
    // Usa screenOptions para aplicar a todas as telas neste grupo
    <Tabs
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho acima das abas
        tabBarActiveTintColor: colorScheme === 'dark' ? '#FF6B6B' : '#EC6F25', // Cor da sua marca
      }}
    >

      {/* 1. Tela Home (index.jsx dentro da pasta (app)) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="carrosel"
        options={{
          href: null,
        }}
      />

      {/* Se você tiver rotas que não devem ser abas (ex: uma tela de detalhes),
          você pode escondê-las, e elas usam o layout pai (Stack)
      <Tabs.Screen name="[details]" options={{ href: null }} />
      */}

    </Tabs>
  );
}