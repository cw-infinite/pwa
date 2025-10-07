import { Slot, Stack, useRouter, Redirect, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/lib/auth-context'
import { View, StyleSheet, Image,Text, TouchableOpacity, 
 } from "react-native";

export default function RootLayout() {
  const {user, isLoading, signOut} = useAuth();
  // const segments = useSegments();
  console.log(user, isLoading);

  if (!user && !isLoading) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/signin" />;
  }

  
  return (
      <Stack
              screenOptions={{
                  headerShown: true,
  
              }}>
          {/* Optionally configure static options outside the route.*/}
              {/* <Stack.Screen name="index" options={{
                  // tabBarIcon: ({size ,color}) => <Ionicons name='home' size={size}/>,
                  title: "",
                  headerLeft: () => (
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
                          <Image
                              source={require('../../assets/images/bblogo2.png')} // adjust path accordingly
                              style={{ width: 45, height: 45, marginRight: 10 }}
                              resizeMode="contain"
                          />
                          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sharperk</Text>
                          <TouchableOpacity style={styles.socialButton} onPress={signOut}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sign Out</Text>

                          </TouchableOpacity>
                      </View>
                  ),
              }} /> */}
              <Stack.Screen name="index" />
              <Stack.Screen name="success" />
  
          </Stack>
  );

 
}
 const styles = StyleSheet.create({
 
  socialButton: {
    backgroundColor: '#FFFFFF', // White
    borderWidth: 1,
    borderColor: '#D1D5DB', // Light grey border
    borderRadius: 12,
    paddingVertical: 7,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});