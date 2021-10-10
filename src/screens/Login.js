import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity} from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { TextInput } from 'react-native-gesture-handler';
import { Auth } from '../service';




const Login = ({navigation}) => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    return(
        <View style = {styles.login}>
            <Image style = {styles.logo} source={require('../components/Logo.png')} />
            <TextInput 
                style= {styles.input}
                textContentType = 'username'
                onChangeText={ text => {
                    setEmail(text)
                }}
                placeholder = "Email Address"
                placeholderTextColor = 'white'
                value= {email}/>
            <TextInput 
                style= {styles.input}
                textContentType = 'password'
                onChangeText={ text => {
                    setPassword(text)
                }}
                placeholder = "Password"
                placeholderTextColor = 'white'
                secureTextEntry = {true}
                value= {password}/>

            <TouchableOpacity
                style = {styles.button}
                onPress = { () => Auth.signIn(email,password)}>
                    <Text style= {styles.buttonText}> Login </Text>
            </TouchableOpacity>

            <GoogleSigninButton
            style={styles.signIn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
                Auth.googleLogin().then(() => {
                    Alert.alert("Logged In !")})
                }}
            />
            <TouchableOpacity
                style = {styles.button}
                onPress = { () => navigation.navigate('SignUp')}>
                    <Text style= {styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.button}
                onPress = { () => navigation.navigate('ForgetPassword')}>
                    <Text style= {styles.buttonText}> Forget Password </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    login:{
        display: 'flex',
        flexDirection:'column',
        padding: 30,
        backgroundColor:'#87CEFA',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        display:'flex',
        alignItems: 'center',
        alignContent: 'center'
    },
    signIn: {
        width: 192, 
        height: 48,
        marginTop: 10,
        borderRadius: 20,
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})

export default Login;