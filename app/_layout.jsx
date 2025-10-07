import { Slot, Stack, useRouter } from 'expo-router';
import { AuthProvider } from '@/lib/auth-context'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
