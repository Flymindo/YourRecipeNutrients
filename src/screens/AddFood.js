import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { Storage } from '../service';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const post_url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=1STbT8Zsp6d9CcLirJjDRE9UoS6aklojen8h5que';

class AddFood extends Component {
    constructor(props) {
        super(props);
        this.barcodeCode = this.props.route.params.barcode;
        this.recipeName = this.props.route.params.recipeName;
        this.recipeTotalCalory = this.props.route.params.recipeTotalCalory;

        this.state = {
          isLoading: true,
          dataSource: "",
          foodName: "",
          servingCalory: 0,
          calory: 0,
          fdcId: 0,
          servingSize: 0,
          yourAmount: "",
        };
      };



    calculateCalory(amount,servingSize,calory) {
        // console.log(amount)
        let x = parseInt(amount);
        let y = servingSize;
        let z = calory;

        let totalCalory = (x / y) * z;
        console.log(totalCalory);
        this.setState({
            calory: totalCalory
        })
        // return total;
        
    }
   


    componentDidMount(){
        fetch(post_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: '{ "query": ' + '\"' + this.barcodeCode.substring(1,this.barcodeCode.length) + '\"' + ', "dataType": ["Branded"]}'
        })
        .then( (response) => response.json())
        .then ( (responsejson) => {
            // console.log(responsejson)
            if (responsejson.totalHits == 0){
                Alert.alert("The item is unregistered. Please try again with another item")
                this.props.navigation.navigate('Foods');
            }
            else{
                this.setState({
                    foodName: responsejson.foods[0].description,
                    fdcId: responsejson.foods[0].fdcId
                })
                fetch('https://api.nal.usda.gov/fdc/v1/food/' + this.state.fdcId + '?api_key=1STbT8Zsp6d9CcLirJjDRE9UoS6aklojen8h5que')
                .then( response => response.json())
                .then( response => {
                    this.setState({
                        isLoading: false,
                        servingSize: response.servingSize,
                        servingCalory: response.labelNutrients.calories.value
                    })
                })
            }

        })
    }



    

    render() {
        return(
        <View style = {styles.home}>
            <Text style = {styles.header}>Confirmation</Text>
            <Text style = {styles.headertext} > {this.state.foodName}</Text>
            {this.state.isLoading ? 
                <Text style = {styles.infoText}> Loading </Text> :
                <View style = {styles.infoBox}>
                    <Text style = {styles.infoText}> Calory of the food (1 serving size) is {this.state.servingCalory} KCAL </Text>
                    <Text style = {styles.infoText}> Serving Size is {this.state.servingSize} g </Text>
                </View>}
            <TextInput 
                style= {styles.input}
                title = "Enter amount (g)" 
                keyboardType='numeric'
                onChangeText={ text => {
                    this.setState({
                    yourAmount: text
                })
                this.calculateCalory(text,this.state.servingSize,this.state.servingCalory)
                }}
                placeholder = "Insert amount of food (g)"
                placeholderTextColor = 'white'
                value= {this.state.yourAmount}/>
            <Button 
                title= "Click to add your food" 
                onPress = {() => {
                    Storage.addFoods(this.recipeName, this.state.foodName,this.state.calory);
                    Storage.addTotalCalory(this.recipeName, this.recipeTotalCalory, this.state.calory);
                    Alert.alert("Succefully Added");
                    this.props.navigation.navigate('Foods')}}/>
            <Button title= "Go Back to Home" onPress={ () => this.props.navigation.navigate('Home')}></Button>
        </View>
        )}
};



const styles = StyleSheet.create({
    home:{
        display: 'flex',
        flexDirection:'column',
        padding: 30,
        backgroundColor:'#87CEFA',
        height: '100%'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    headertext : {
        display:'flex',
        fontSize : 20,
        marginTop: '20%',
        marginBottom: '10%',
        textAlign: 'center',
        fontWeight:'bold'
    },
    header : {
        display:'flex',
        fontSize : 40,
        marginTop: '20%',
        textAlign: 'center',
        fontWeight:'bold',
        color: 'white'
    },
    infoText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    infoBox:{
        display:'flex',
        paddingTop: 30,
        marginTop: 10,
        borderRadius: 20,
    },
})
export default AddFood;