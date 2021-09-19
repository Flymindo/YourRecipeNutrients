import React, {Component, useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList,SafeAreaView, Button,ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Storage } from '../service';
import auth from '@react-native-firebase/auth';



class Foods extends Component {
    state = {
        foods: []
    }

    constructor(props) {
        super(props);
        this.parentName = this.props.route.params.recipeName;
        this.recipeTotalCalory = this.props.route.params.totalCalory;
        this.isMountedVal = 0;

    }

    componentDidMount(){
        this.isMountedVal = 1;
        const uid =auth().currentUser.uid;
        firestore()
        .collection('Users')
        .doc(uid)
        .collection('Recipes')
        .doc(this.parentName)
        .collection('Foods')
        .onSnapshot(querySnapshot => {
            let foods = [];
            querySnapshot.forEach(documentSnapshot => {
              foods.push( documentSnapshot.data() )
            })
            if(this.isMountedVal)
                this.setState({foods});
      })
    }
    componentWillUnmount(){
        this.isMountedVal = 0;
    }
    
    render() {
        
        return(
        <View style = {styles.home}>
            <Text style = {styles.headertext}> Foods List</Text>
            <ScrollView>
                {this.state.foods.map( (food, index) => 
                <View style= {styles.scroll} key={index}> 
                    <TouchableOpacity>
                        <Text style = {styles.name}>{food.Name}</Text>
                        <Text style = {styles.text}>Calory is {food.Calory} KCAL</Text>
                        <Button title = "DELETE" onPress = { () => {
                            Storage.subtractTotalCalory(this.parentName,this.recipeTotalCalory,food.Calory);
                            Storage.deleteFood(this.parentName,food.Name);
                        }}/> 
                    </TouchableOpacity>
                </View>
                )}
            </ScrollView>
            {/* <Button title= "Add a food" onPress = { () => {
                    this.props.navigation.navigate('Scan', {
                    recipeName: this.parentName,
                    recipeTotalCalory: this.recipeTotalCalory

                })}}/> */}
            <TouchableOpacity
                style = {styles.button}
                onPress = { () => {
                this.props.navigation.navigate('Scan', {
                recipeName: this.parentName,
                recipeTotalCalory: this.recipeTotalCalory

            })}}>
                <Text style = {styles.buttonText}> Add a Food (Barcode Scan)</Text>
            </TouchableOpacity>
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
    scroll:{
        display:'flex',
        paddingTop: 30,
        backgroundColor:'white',
        marginTop: 10,
        borderRadius: 20,
    },
    headertext : {
        display:'flex',
        fontSize : 40,
        marginTop: '20%',
        textAlign: 'center',
        fontWeight:'bold'
    },
    name: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },  
    text: {
        textAlign: 'center'
    },
    button: {
        display: 'flex', 
        margin: "10%"
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    }
})
export default Foods