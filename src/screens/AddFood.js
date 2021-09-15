import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';




class AddFood extends Component {
    constructor(props) {
        super(props);
        this.barcodeCode = this.props.route.params.barcode;

        this.state = {
          isLoading: true,
          dataSource: "",
          foodName: "",
          calory: ""
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
                // dataSource: responsejson
                foodName: responsejson.foods[0].description,
                calory : this.getNutrients(responsejson)
            })
            console.log(responsejson);
        })

    }
    

    render() {
        
        return(
        <View style = {styles.AddFood}>
            <Text> Your Food Information Confirmation</Text>
            <Text> The Descrition of the food you scanned is {this.state.foodName}</Text>
            <Text> Calory of the food (1 serving amount) : {this.state.calory} KCAL </Text>
            <Button title= "Go Back to Home" onPress={ () => this.props.navigation.navigate('Home')}></Button>
        </View>
        )}
};

// const AddFood = ({navigation, route}) => {

//     return(
//         <View style = {styles.AddFood}>
//             <Text> Your Food Information Confirmation</Text>
//             <Text> Barcode Number: {route.params.barcode} </Text>
//             {/* <Text> Calory of the food (1 serving amount) : {route.params.calory}</Text> */}
//             <Button title= "Go Back to Home" onPress={ () => navigation.navigate('Home')}></Button>
//         </View>
//     )
// };

const styles = StyleSheet.create({
    AddFood:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default AddFood;