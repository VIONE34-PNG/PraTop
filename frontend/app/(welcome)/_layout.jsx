import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    // Usa screenOptions para aplicar a todas as telas neste grupo
    <Stack screenOptions={{ headerShown: false }}>
    </Stack>
  );
}