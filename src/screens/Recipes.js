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
        this.isMountedVal = 0;
    //     this.data = 
    //     firestore()
    //     .collection('Recipes')
    //     .onSnapshot(querySnapshot => {
    //         let recipes = [];
    //         querySnapshot.forEach(documentSnapshot => {
    //           recipes.push( documentSnapshot.data() )
    //         })
    //         this.setState({recipes});
    //   })
    }
    componentDidMount(){
        this.isMountedVal = 1;
        firestore()
        .collection('Recipes')
        .onSnapshot(querySnapshot => {
            let recipes = [];
            querySnapshot.forEach(documentSnapshot => {
              recipes.push( documentSnapshot.data() )
            })
            if (this.isMountedVal)
                this.setState({recipes});
      })
    }

    componentWillUnmount(){
        this.isMountedVal = 0;
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
                    <Text style={styles.name}>{recipe.Name}</Text>
                    <Text style={styles.text}>Total Calorie is {Math.floor(recipe.TotalCalory,2)} KCAL</Text>
                    <Button 
                    title= "DELETE" 
                    onPress = { () => Storage.deleteRecipe(recipe.Name)}/>
                </TouchableOpacity>
            </View>
            )}
        </ScrollView>
        <Button 
        // style = {styles.button}
        title= "Add a recipe" 
        onPress = { () => this.props.navigation.navigate("AddRecipe")}/>
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
name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
},  
text: {
    textAlign: 'center'
},
headertext : {
    display:'flex',
    fontSize : 40,
    marginTop: '20%',
    textAlign: 'center',
    fontWeight:'bold'
},
button: {
    display: 'flex', 
    color: 'white',
}
})
export default Recipes;