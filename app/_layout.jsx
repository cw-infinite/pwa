import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,

      }}>
        <Stack.Screen name="index" 

          // screenOptions={{
          //   headerShown: true,

          // }}
          options={{ 
            headerShown: true,
            title: 'BlankBack' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}
