import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Platform } from 'react-native';
import { useTheme } from 'styled-components';

import HomeIcon from '@assets/icons/home.svg'

import ChartBarIcon from '@assets/icons/chart-bar.svg'
import HomeScreen from '@screens/Home';

import ReportScreen from '@screens/Report';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme()

  return (
    <>
      <Navigator screenOptions={{
        tabBarActiveTintColor: theme.COLORS.SECONDARY,
        tabBarInactiveTintColor: theme.COLORS.GRAY_300,
        tabBarStyle: {
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 70 : 96,
          paddingBottom: 10,
          paddingTop: 6,
          backgroundColor: theme.COLORS.PRIMARY
        },
        tabBarLabelStyle: {
          fontSize: theme.FONT_SIZE.SM
        },
      }}>
        <Screen
          name="Início"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <HomeIcon stroke={color} width={25} height={25} />
            ),
            headerStyle: { backgroundColor: theme.COLORS.PRIMARY },
            headerTintColor: theme.COLORS.WHITE,
            headerTitleAlign: 'left',

          }} />
        <Screen
          name="Relatórios"
          component={ReportScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <ChartBarIcon stroke={color} width={25} height={25} />

            ),
            headerStyle: { backgroundColor: theme.COLORS.PRIMARY },
            headerTintColor: theme.COLORS.WHITE
          }} />
      </Navigator>
    </>
  );
}