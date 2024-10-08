import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Platform, Pressable } from 'react-native';
import { useTheme } from 'styled-components';

import HomeIcon from '@assets/icons/home.svg'
import PlusIcon from '@assets/icons/plus.svg'
import ChartBarIcon from '@assets/icons/chart-bar.svg'
import HomeScreen from '@screens/Home';
import { Modalize } from 'react-native-modalize';
import TimesForm from 'src/components/organisms/TimesForm';
import ReportScreen from '@screens/Report';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme()

  // Cria a referência do modal
  const modalizeRef = useRef<Modalize>(null);

  // Função para abrir o modal
  const openModal = () => {
    modalizeRef.current?.open();
  };

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
            headerRight: () => <Pressable style={{ padding: 12 }} onPress={openModal}><PlusIcon stroke={theme.COLORS.WHITE} /></Pressable>

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

      <Modalize adjustToContentHeight ref={modalizeRef}>
        <TimesForm modalRef={modalizeRef} />
      </Modalize>
    </>
  );
}