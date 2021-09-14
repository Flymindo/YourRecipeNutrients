import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {Auth} from '../service';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';


const Login = ({navigation}) => {
    return(
        <View style = {styles.login}>
            {/* <TouchableOpacity onPress = { () => navigation.navigate('Home')}>
                <Text>Login</Text>
            </TouchableOpacity>   */}
            <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => Auth.googleLogin().then(() => console.log('Signed in with Google!'))}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    login:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Login;