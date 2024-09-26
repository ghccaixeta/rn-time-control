import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { StatusBar } from 'expo-status-bar';


export function Routes(){
    return(
        <NavigationContainer>
            <AppRoutes />
            <StatusBar />
        </NavigationContainer>
    );
}