import { Slot, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider } from '@/lib/auth-context'

export default function RootLayout() {
  return (
      <Stack
        screenOptions={{
            headerShown: false,
        }}>
        <Stack.Screen name="option3" />
        <Stack.Screen name="option4" />
        <Stack.Screen name="option5" />
        <Stack.Screen name="option6" />
        <Stack.Screen name="option7" />
        <Stack.Screen name="option8" />
        <Stack.Screen name="option9" />
        <Stack.Screen name="option10" />
    </Stack>
  );
}
