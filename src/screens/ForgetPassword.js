import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Auth } from '../service';




const ForgetPassword = ({navigation}) => {
    const [email,setEmail] = useState();

    return(
        <View style = {styles.home}>
            <TextInput 
                style= {styles.input}
                onChangeText={ text => {
                    setEmail(text)
                }}
                placeholder = "Email Address"
                placeholderTextColor = 'white'
                value= {email}/>

            <TouchableOpacity
                style = {styles.button}
                onPress = { () => {
                Auth.forgetPassword(email);
                Alert.alert('Sent a Password Reset Email');
                navigation.goBack()
                }}>
                    <Text style= {styles.buttonText}> Send a Reset Email </Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        display: 'flex',
        flexDirection:'column',
        padding: 30,
        backgroundColor:'#87CEFA',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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

export default ForgetPassword;