import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from './app.routes';
import HomeScreen from '@screens/Home';
import FormScreen from '@screens/Home/Form';
import { useTheme } from 'styled-components/native';
import { ITimes } from 'src/context/times';


export type InicioStackParamList = {
  Inicio: undefined;
  Form: {
    onSubmit: (item: ITimes) => void
    isRenew?: boolean,
    item?: ITimes,

  }
};

export type InicioStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'TabInicioScreen'>,
  NativeStackNavigationProp<InicioStackParamList>
>;

const { Navigator, Screen } =
  createNativeStackNavigator<InicioStackParamList>();

const InicioStack: React.FC = () => {
  const theme = useTheme();
  return (
    <Navigator>
      <Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: theme.COLORS.PRIMARY },
          headerTintColor: theme.COLORS.WHITE,
          headerTitleAlign: 'left',
          headerTitle: 'Início',
        }}
      />

      <Screen
        name="Form"
        component={FormScreen}
        options={{
          headerStyle: { backgroundColor: theme.COLORS.PRIMARY },
          headerTintColor: theme.COLORS.WHITE,
          headerTitleAlign: 'left',
          headerTitle: '',
        }}
      />
    </Navigator>
  );
};

export default InicioStack;
