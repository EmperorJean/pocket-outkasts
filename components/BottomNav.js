import React from 'react'
import MissionsScreen from '../screens/missions.screens';
import OutkastsScreen from '../screens/outkasts.screens';
import HomeScreen from '../screens/home.screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NordTheme } from '../components/theme';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
    return (
        <Tab.Navigator
            initialRouteName="My Outkasts"
            screenOptions={{
                tabBarActiveTintColor: NordTheme.primary,
                tabBarInactiveTintColor: NordTheme.text,
                tabBarStyle: { backgroundColor: NordTheme.container },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="My Outkasts"
                component={OutkastsScreen}
                options={{
                    tabBarLabel: 'Outkasts',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="people" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Missions In-Progress"
                component={MissionsScreen}
                options={{
                    tabBarLabel: 'Missions',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="format-list-bulleted" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Login"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Login',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="login" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNav