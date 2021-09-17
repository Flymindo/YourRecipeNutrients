import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {Auth} from '../service';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';


const Login = ({navigation}) => {
    return(
        <View style = {styles.login}>
            <Image style = {styles.logo} source={require('../components/Logo.png')} />
            <GoogleSigninButton
            style={styles.signIn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => Auth.googleLogin().then(() => console.log('Signed in with Google!'))}
            />

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
    }
})

export default Login;