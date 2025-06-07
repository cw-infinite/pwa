import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, StyleSheet, Image,Text
 } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarShowLabel: false

            }}
        >
            <Tabs.Screen name='index' 
                
                options={{
                    tabBarIcon: ({size ,color}) => <Ionicons name='home' size={size}/>,
                    title: "",
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
                            <Image
                                source={require('../../assets/images/bblogo2.png')} // adjust path accordingly
                                style={{ width: 45, height: 45, marginRight: 10 }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>BlankBack</Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen name='cashback' 
                options={{

                    tabBarIcon: ({size ,color}) => <Ionicons name='search' size={size}/>
                }}
            />
            <Tabs.Screen name='add' 
                options={{
                    tabBarIconStyle: styles.middleIcon,

                    tabBarIcon: ({size ,color}) => <Ionicons name='add-circle-outline' size={70}/>
                }}
            />
            <Tabs.Screen name='profile' options={{
                    tabBarIcon: ({size ,color}) => <Ionicons name='person' size={size}/>
                }}
            />
            <Tabs.Screen name='money' options={{
                    tabBarIcon: ({size ,color}) => <Ionicons name='wallet' size={size}/>
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabs: {
        height: 60,
    },
    navIcons: {
        bottom: 20,
        width: 40,
        height: 40,
        
        borderRadius:25,
    },
    middleIcon: {
        bottom: 40,
        width: 80,
        height: 80,
        borderRadius: 40,
      backgroundColor: '#FFFFFF',
    },
});