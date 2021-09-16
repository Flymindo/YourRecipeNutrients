import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Storage } from '../service';
import { Alert } from 'react-native';


const AddRecipe = ({navigation}) => {
    const [recipeName, setRecipeName] = React.useState("")

    return(
        <View style = {styles.home}>
            <Text>Your Recipes</Text>
            <TextInput
            style={styles.input}
            onChangeText={setRecipeName}
            value={recipeName}/>
            <Button 
            title= "Save the Recipe"
            onPress = {() => {
                Storage.addRecipes(recipeName);
                Alert.alert("Succefully Added");
                navigation.goBack();

            }}
            />  
            {/* <Button title= 'Sign out' onPress = { () => Auth.signOut()}/> */}

        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})
export default AddRecipe;