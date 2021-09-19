import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Storage } from '../service';
import { Alert } from 'react-native';


const AddRecipe = ({navigation}) => {
    const [recipeName, setRecipeName] = React.useState("")

    return(
        <View style = {styles.home}>
            <Text style={styles.recipeTitle}>Your Recipes</Text>
            <TextInput
            style={styles.input}
            onChangeText={setRecipeName}
            value={recipeName}
            placeholder = "Insert name of recipe"/>
            <Button 
            style={styles.input}
            title= "Save the Recipe"
            onPress = {() => {
                Storage.addRecipes(recipeName);
                Alert.alert("Succefully Added");
                navigation.goBack();

            }}
            />  

        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'#87CEFA',
        height: '100%'
    },
    input: {
        display: 'flex',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginBottom: '10%',
        backgroundColor: 'white'
    },
    recipeTitle: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
        marginTop: '40%',
        marginBottom: '10%'
    },
    infoText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },  
})
export default AddRecipe;