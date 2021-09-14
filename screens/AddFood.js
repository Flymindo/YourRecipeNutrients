import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

const AddFood = ({navigation}) => {
    return(
        <View style = {styles.AddFood}>
            <Text> Screen to add scanned a food to your recipes</Text>
            <TouchableOpacity onPress = { () => navigation.navigate('Recipes')}>
                <Text>Your Recipes</Text>
            </TouchableOpacity>   
        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default AddFood;