import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,ScrollView} from 'react-native';
import { Storage } from '../service';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import api_key from '../../api';


//TODO
//Search Food by typing a name and show lists of related products in a list view



const post_url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + api_key;

class SearchByName extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isLoading: true,
          productName: "",
          foods: []
        };
      };
   


    search(){
        if (this.state.productName != ""){
            fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + api_key + '&query=' + this.state.productName)
            .then( (response) => response.json())
            .then ( (responsejson) => {
                this.setState({
                    foods: responsejson.foods
                })
                if (responsejson.totalHits == 0){
                    Alert.alert("The item is unregistered. Please try again with another item")
                    this.props.navigation.navigate('Foods');
                }
            })
        }
    }


    componentDidMount(){
        
        this.search();
    }



    

    render() {
        return(
        <View style = {styles.home}>
            {/* <Text style = {styles.header} > {this.state.foodName}</Text>
            {this.state.isLoading ? 
                <Text style = {styles.infoText}> Loading </Text> :
                <View style = {styles.infoBox}>
                    <Text style = {styles.infoText}> Calory of the food (1 serving size) is {this.state.servingCalory} KCAL </Text>
                    <Text style = {styles.infoText}> Serving Size is {this.state.servingSize} g </Text>
                </View>} */}
            <TextInput 
                style= {styles.input}
                title = "Enter the Name" 
                onChangeText={ text => {
                    this.setState({
                    productName: text
                })
                }}
                
                placeholder = "Enter the Name"
                placeholderTextColor = 'white'
                value= {this.state.productName}/>
            <Button 
                title= "Search" 
                onPress = {() => {
                    this.search();
                    Alert.alert("Search");}}/>
            <ScrollView>
                {this.state.foods.map( (food, index) => 
                <View style= {styles.scroll} key={index}> 
                    <TouchableOpacity>
                        <Text style = {styles.name}>{food.description} </Text>
                        <Text style = {styles.name}>{food.brandName} </Text>
                    </TouchableOpacity>
                </View>
                )}
            </ScrollView>
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
        fontSize : 30,
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
    scroll:{
        display:'flex',
        paddingTop: 30,
        backgroundColor:'white',
        marginTop: 10,
        borderRadius: 20,
    },
    name: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },  
})
export default SearchByName;