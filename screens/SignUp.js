import React, {useState,useEffect} from 'react';

import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';


const SignUp = ({navigation}) => {
    return(
        <View style = {styles.signUp}>
            {/* <Input place */}
            <TouchableOpacity onPress = { () => navigation.navigate('Home')}>
                <Text>Login</Text>
            </TouchableOpacity>  

        </View>
    )
}

const styles = StyleSheet.create({
    signUp:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SignUp;