import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Platform } from 'react-native';
import { useTheme } from 'styled-components';

import HomeIcon from '@assets/icons/home.svg'
import SettingsIcon from '@assets/icons/settings.svg'
import HomeScreen from '@screens/Home';
import SettingsScreen from '@screens/Settings';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme()
  return (
    <Navigator screenOptions={{ 
      tabBarActiveTintColor: theme.COLORS.GRAY_700,
      tabBarInactiveTintColor: theme.COLORS.GRAY_300,
      tabBarStyle:{      
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 70 : 96,
          paddingBottom: 10,
          paddingTop: 6
      },
      tabBarLabelStyle:{
        fontSize: theme.FONT_SIZE.SM
      }
      }}>
      <Screen
      name="Início"
      component={HomeScreen}
      options={{tabBarIcon: ({ color }) => (
        <HomeIcon stroke={color} width={25} height={25}/>
        
        )}} />
        <Screen
      name="Configurações"
      component={SettingsScreen}
      options={{tabBarIcon: ({ color }) => (
        <SettingsIcon stroke={color} width={25} height={25}/>
        
        )}} />
    </Navigator>
  );
}