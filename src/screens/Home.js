import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image} from 'react-native';
import { Auth } from '../service';


const Home = ({navigation}) => {


    return(
        <View style = {styles.home}>
            <Text style = {styles.title}>
                Nutrient Calculator
            </Text>
            
            <TouchableOpacity
                style = {styles.button}
                onPress = { () => navigation.navigate('Recipes')}>
                    <Text style= {styles.buttonText}> Recipes </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} onPress = { () => Auth.signOut()}>
                <Text style= {styles.buttonText}> Sign Out</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#87CEFA',
        height:'100%',
        paddingTop:"30%"
    }, 
    title: {
        display: 'flex',
        width:"100%", 
        textAlign: "center", 
        marginBottom: 300, 
        fontSize: 50, 
        fontWeight: 'bold', 
        color: 'white', },
    button: {
        display: 'flex', 
        margin: "5%",
        backgroundColor: 'white',
        width: '30%',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
    }

})
export default Home;