import React,{useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox'


const Profile = () => {

      const [protein,setProtein] = useState(false);

    return(
        <View style = {styles.home}>
            <Text style = {styles.title}>
                Profile
            </Text>
            <CheckBox
            style = {styles.button}
            checked={protein} 
            color="#fc5185" 
            onChange={
                (protein) => {
                    setProtein(true)
                    console.log(protein);
                }}>
                <Text style = {styles.buttonText}> Protein </Text>
            </CheckBox>
        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#87CEFA',
        height:'100%',
        paddingTop:"10%"
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
export default Profile;