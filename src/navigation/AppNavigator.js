import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Home, Recipes, Scan, AddFood, AddRecipe,Foods,SearchByName} from '../screens';
import auth from '@react-native-firebase/auth';
import { Storage } from '../service';

const Stack = createStackNavigator();


const AppNavigator = () => {
    const user = auth().currentUser;
    Storage.addUser(user);
    return(
        <Stack.Navigator
            screenOptions = {{
                stackAnimation: "flip",
                stackPresentaiton: "modal",
                headerShown : null
            }}>
            <Stack.Screen name = "Home" component= {Home}/>
            <Stack.Screen name = "Recipes" component= {Recipes}/>
            <Stack.Screen name = "Scan" component= {Scan}/>
            <Stack.Screen name = "AddFood" component = {AddFood}/>
            <Stack.Screen name = "AddRecipe" component = {AddRecipe}/>
            <Stack.Screen name = "Foods" component = {Foods}/>
            <Stack.Screen name= "SearchByName" component = {SearchByName}/>
        </Stack.Navigator>
    )
}
export default AppNavigator;
