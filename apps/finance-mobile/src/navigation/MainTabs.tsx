
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import { HomeScreen } from '../screens/HomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
 

export type MainTabParamList = {
    Inicio: undefined;
    Resumen: undefined;
    Add: undefined;
    Historial: undefined;
    Ajustes: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs({ onLogout }: { onLogout: () => void }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#1976FF",
                tabBarInactiveTintColor: "#94A3B8",
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopColor: "#E6EEF8",
                    height: 72,
                    paddingBottom: 10,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: "800",
                },
                tabBarIcon: ({ color, focused }) => {
                    let iconName: any = "ellipse";
                    if (route.name === "Inicio") iconName = "home";
                    if (route.name === "Resumen") iconName = "analytics";
                    if (route.name === "Historial") iconName = "time";
                    if (route.name === "Ajustes") iconName = "settings";
                    if (route.name === "Add") iconName = "add";
                    return (
                        <Ionicons
                            name={iconName}
                            size={focused ? 24 : 22}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Inicio">
                {(props) => <HomeScreen {...props} onLogout={onLogout} />}
            </Tab.Screen>
            <Tab.Screen name="Resumen" component={DashboardScreen} />
            <Tab.Screen
                name="Add"
                component={DashboardScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: () => (
                        <View
                            style={{
                                width: 58,
                                height: 58,
                                borderRadius: 29,
                                backgroundColor: "#1976FF",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 28,
                                shadowColor: "#1976FF",
                                shadowOpacity: 0.35,
                                shadowRadius: 14,
                                shadowOffset: { width: 0, height: 10 },
                                elevation: 10,
                            }}
                        >
                            <Ionicons name="add" size={28} color="#fff" />
                        </View>
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        // Aquí puedes abrir un modal QuickAdd o navegar a una screen del Stack
                        // Por ahora: no hace nada
                    },
                }}
            />
            <Tab.Screen name="Historial" component={HistoryScreen} />
            <Tab.Screen name="Ajustes" component={SettingsScreen} />
        </Tab.Navigator>
    )
}