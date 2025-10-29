// app/(app)/_layout.jsx

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

// Use o seu hook customizado de cores/tema, se tiver
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AppLayout() {
  const colorScheme = useColorScheme();
  
  return (
    // Usa um Tabs Navigator
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
      
      {/* 2. Tela de Perfil/Configurações (settings.jsx dentro da pasta (app)) */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
      
      {/* Se você tiver rotas que não devem ser abas (ex: uma tela de detalhes),
          você pode escondê-las, e elas usam o layout pai (Stack)
      <Tabs.Screen name="[details]" options={{ href: null }} />
      */}
      
    </Tabs>
  );
}