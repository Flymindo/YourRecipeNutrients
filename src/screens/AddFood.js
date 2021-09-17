import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { Storage } from '../service';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


const post_url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key={YOUR_API_KEY}';

class AddFood extends Component {
    constructor(props) {
        super(props);
        this.barcodeCode = this.props.route.params.barcode;
        this.recipeName = this.props.route.params.recipeName;
        this.recipeTotalCalory = this.props.route.params.recipeTotalCalory;
        // this.isMountedVal = 0;

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
            this.setState({
                isLoading: false,
                foodName: responsejson.foods[0].description,
                fdcId: responsejson.foods[0].fdcId
            })
            
            // this.getServingSize().then( response => {
            //     this.setState({
            //         servingSize: response.servingSize,
            //         servingCalory: response.labelNutrients.calories.value
            //     })
            // })
            fetch('https://api.nal.usda.gov/fdc/v1/food/' + this.state.fdcId + '?api_key={YOUR_API_KEY}')
            .then( response => response.json())
            .then( response => {
                this.setState({
                    servingSize: response.servingSize,
                    servingCalory: response.labelNutrients.calories.value
                })
            })

        })
    }


    // getServingSize () {
    //     return (
    //         // fetch('https://api.nal.usda.gov/fdc/v1/food/' + this.state.fdcId + '?api_key={YOUR_API_KEY}')
    //         fetch('https://api.nal.usda.gov/fdc/v1/food/' + this.state.fdcId + '?api_key=1STbT8Zsp6d9CcLirJjDRE9UoS6aklojen8h5que')
    //         .then( response => response.json())
    //     )
    // }
    

    render() {
        
        return(
        <View style = {styles.AddFood}>
            <Text> Your Food Information Confirmation</Text>
            <Text> The Descrition of the food you scanned is {this.state.foodName}</Text>
            <Text> Calory of the food (1 serving size) is {this.state.servingCalory} KCAL </Text>
            <Text> Serving Size is {this.state.servingSize} g </Text>
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
    AddFood:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})
export default AddFood;