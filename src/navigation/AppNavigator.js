import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Home, Login, Recipes, Scan, AddFood, AddRecipe,Foods} from '../screens';
// import Login  from '../screens';
import {Auth} from "../service"

const Stack = createStackNavigator();

const AppNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions = {{
                stackAnimation: "flip",
                stackPresentaiton: "modal",
                headerShown : null
            }}>
            {/* <Stack.Screen 
            name = "Home" 
            component= {Home}
            options = {{
                title: "Home",
                headerRight: () => (<Button title = "Log out" onPress = { () => Auth.signOut()}/>)
            }}/> */}
            <Stack.Screen name = "Home" component= {Home}/>
            <Stack.Screen name = "Recipes" component= {Recipes}/>
            <Stack.Screen name = "Scan" component= {Scan}/>
            <Stack.Screen name = "AddFood" component = {AddFood}/>
            <Stack.Screen name = "AddRecipe" component = {AddRecipe}/>
            <Stack.Screen name = "Foods" component = {Foods}/>
        </Stack.Navigator>
    )
}
export default AppNavigator;
