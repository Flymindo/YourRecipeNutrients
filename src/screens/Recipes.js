import React, {Component, useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList,SafeAreaView, Button,ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Storage } from '../service';

class Recipes extends Component {
    state = {
        recipes: []
    }
    constructor(props) {
        super(props);
        this.data = 
        firestore()
        .collection('Recipes')
        .onSnapshot(querySnapshot => {
            let recipes = [];
            querySnapshot.forEach(documentSnapshot => {
              recipes.push( documentSnapshot.data() )
            })
            this.setState({recipes});
      })
    }
    
    render() {
        
        return(
        <View style = {styles.home}>
            <Text style = {styles.headertext}> Recipes List </Text>
            <ScrollView>
                {this.state.recipes.map( (recipe, index) => 
                <View style = {styles.scroll} key={index}> 
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate("Foods",{
                        recipeName: recipe.Name,
                        totalCalory: recipe.TotalCalory
                    })} >
                        <Text>{recipe.Name}     Total Calory is {recipe.TotalCalory} KCAL</Text>
                        <Button title= "DELETE" onPress = { () => Storage.deleteRecipe(recipe.Name)}/>
                    </TouchableOpacity>
                </View>
                )}
            </ScrollView>
            <Button title= "Add a recipe" onPress = { () => this.props.navigation.navigate("AddRecipe")}/>
        </View>
        )}
};

const styles = StyleSheet.create({
    home:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    scroll:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    headertext : {
        fontSize : 30,
    }
})
export default Recipes;