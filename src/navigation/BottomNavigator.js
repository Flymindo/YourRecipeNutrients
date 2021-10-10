import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppNavigator from './AppNavigator';
import {Profile} from '../screens'

const Tab = createBottomTabNavigator();


const BottomNavigator = () => {
    return(
        <Tab.Navigator
        screenOptions= {{
            headerShown : null
        }}>
            <Tab.Screen 
                name= "AppNavigator"
                component = {AppNavigator}/>
            <Tab.Screen name= "profile" component = {Profile}/>

        </Tab.Navigator>
    )
}
export default BottomNavigator;