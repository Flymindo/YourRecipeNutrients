import React, {Component, useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList,SafeAreaView, Button,ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Storage } from '../service';

class Foods extends Component {
    state = {
        foods: []
    }

    constructor(props) {
        super(props);
        this.parentName = this.props.route.params.recipeName;
        this.recipeTotalCalory = this.props.route.params.totalCalory;
    //     this.data = 
    //     firestore()
    //     .collection('Recipes')
    //     .doc(this.parentName)
    //     .collection('Foods')
    //     .onSnapshot(querySnapshot => {
    //         let foods = [];
    //         querySnapshot.forEach(documentSnapshot => {
    //           foods.push( documentSnapshot.data() )
    //         })
    //         this.setState({foods});
    //   })
    }

    componentDidMount(){
        firestore()
        .collection('Recipes')
        .doc(this.parentName)
        .collection('Foods')
        .onSnapshot(querySnapshot => {
            let foods = [];
            querySnapshot.forEach(documentSnapshot => {
              foods.push( documentSnapshot.data() )
            })
            this.setState({foods});
      })
    }
    
    render() {
        
        return(
        <View style = {styles.home}>
            <Text style = {styles.headertext}> Foods List</Text>
            <ScrollView>
                {this.state.foods.map( (food, index) => 
                <View style= {styles.scroll} key={index}> 
                    <TouchableOpacity>
                        <Text>{food.Name}</Text>
                        <Text>Calory is {food.Calory} KCAL</Text>
                        <Button title = "DELETE" onPress = { () => {
                            Storage.subtractTotalCalory(this.parentName,this.recipeTotalCalory,food.Calory);
                            Storage.deleteFood(this.parentName,food.Name);
                        }}/> 
                    </TouchableOpacity>
                </View>
                )}
                <Button title= "Add a food" onPress = { () => {
                    this.props.navigation.navigate('Scan', {
                    recipeName: this.parentName,
                    recipeTotalCalory: this.recipeTotalCalory

                })}}/>
            </ScrollView>
        </View>
        )}
};

const styles = StyleSheet.create({
    home:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    headertext : {
        fontSize : 30,
    }
    
})
export default Foods