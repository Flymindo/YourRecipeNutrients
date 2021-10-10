import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import { StyleSheet, Text, View,  Alert, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Auth } from '../service';




const SignUp = ({navigation}) => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    return(
        <View style = {styles.signUp}>
            <TextInput 
                style= {styles.input}
                onChangeText={ text => {
                    setName(text)
                }}
                placeholder = "Your Full Name"
                placeholderTextColor = 'white'
                value= {name}/>
            <TextInput 
                style= {styles.input}
                onChangeText={ text => {
                    setEmail(text)
                }}
                placeholder = "Your Email"
                placeholderTextColor = 'white'
                value= {email}/>
            <TextInput 
                style= {styles.input}
                onChangeText={ text => {
                    setPassword(text)
                }}
                placeholder = "Password"
                placeholderTextColor = 'white'
                value= {password}/>
            <TouchableOpacity style = {styles.button} onPress = { () => {
                Auth.signUp(name,email,password)
                }}>
                <Text style= {styles.buttonText}> Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} onPress = { () => {
                navigation.goBack()
                }}>
                <Text style= {styles.buttonText}> Go Back to Home</Text>
            </TouchableOpacity>
            

        </View>
    )
}

const styles = StyleSheet.create({
    signUp:{
        display: 'flex',
        flexDirection:'column',
        padding: 30,
        backgroundColor:'#87CEFA',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
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

export default SignUp;