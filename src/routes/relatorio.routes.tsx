import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from './app.routes';
import ReportScreen from '@screens/Report';
import { useTheme } from 'styled-components/native';


export type RelatorioStackParamList = {
  Relatorio: undefined;
};

export type RelatorioStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'TabInicioScreen'>,
  NativeStackNavigationProp<RelatorioStackParamList>
>;

const { Navigator, Screen } =
  createNativeStackNavigator<RelatorioStackParamList>();

const RelatorioStack: React.FC = () => {
  const theme = useTheme();
  return (
    <Navigator>
      <Screen
        name="Relatorio"
        component={ReportScreen}
        options={{
          headerStyle: { backgroundColor: theme.COLORS.PRIMARY },
          headerTintColor: theme.COLORS.WHITE,
          headerTitleAlign: 'left',
          headerTitle: 'Relatórios',
        }}
      />
    </Navigator>
  );
};

export default RelatorioStack;
