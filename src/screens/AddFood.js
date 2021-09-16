import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { Storage } from '../service';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';



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
          calory: "",
        //   servingAmount: 0,
        //   yourAmount: 0,
        };
      };

    getNutrients(response) {
        var calory = ""
        arr = response.foods[0].foodNutrients;
        // console.log(arr);
        for (var i=0; i< arr.length; i++){
            if (arr[i].nutrientName == "Energy"){
              calory = arr[i].value;
            }
        }
        return calory;
    }


    componentDidMount(){
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: '{ "query": ' + '\"' + this.barcodeCode.substring(1,this.barcodeCode.length) + '\"' + '}'
        })
        .then( (response) => response.json())
        .then ( (responsejson) => {
            this.setState({
                isLoading: false,
                foodName: responsejson.foods[0].description,
                calory : this.getNutrients(responsejson)
            })
        })

    }
    

    render() {
        
        return(
        <View style = {styles.AddFood}>
            <Text> Your Food Information Confirmation</Text>
            <Text> The Descrition of the food you scanned is {this.state.foodName}</Text>
            <Text> Calory of the food (1 serving amount) is {this.state.calory} KCAL </Text>
            {/* <TextInput 
                style= {styles.input} 
                keyboardType='number-pad'
                onChangeText={(text)=> this.setState(text)} 
                value= {this.state.servingAmount}/> */}
            <Button 
                title= "Click to add your food" 
                onPress = {() => {
                    // console.log(this.state.servingAmount)
                    Storage.addFoods(this.recipeName, this.state.foodName,this.state.calory)
                    Storage.addTotalCalory(this.recipeName, this.recipeTotalCalory, this.state.calory)
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