import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { Auth } from '../service';

const Home = ({navigation}) => {
    return(
        <View style = {styles.home}>
            {/* <Text>Your Recipes</Text> */}
            <TouchableOpacity onPress = { () => navigation.navigate('Recipes')}>
                <Text>Your Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = { () => navigation.navigate('Scan')}>
                <Text>Scan Barcode</Text>
            </TouchableOpacity>      
            <Button title= 'Sign out' onPress = { () => Auth.signOut()}/>

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
export default Home;