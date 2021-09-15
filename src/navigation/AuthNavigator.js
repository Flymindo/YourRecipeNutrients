import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Home,Login, Recipes} from '../screens';
// import Login  from '../screens';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions = {{
                headerShown : null
            }}>
            <Stack.Screen name = "Login" component= {Login}/>
        </Stack.Navigator>
    )
}
export default AuthNavigator;