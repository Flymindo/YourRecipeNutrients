import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Recipes');


const addRecipes = (recipeName) =>{
    usersCollection.doc(recipeName).set({
        Name : recipeName,
        TotalCalory: 0
    });
}

const addFoods = (recipeName, foodName, calory) =>{
    usersCollection.doc(recipeName).collection('Foods').doc(foodName).set({
        Name: foodName,
        Calory: calory
    });
}

const addTotalCalory = (recipeName, totalCalory, calory) =>{
    total = totalCalory + calory;
    usersCollection.doc(recipeName).update({
        TotalCalory: total
    })
}

const subtractTotalCalory = (recipeName, totalCalory, calory) =>{
    total = totalCalory - calory;
    usersCollection.doc(recipeName).update({
        TotalCalory: total
    })
}

const deleteRecipe = (recipeName) =>{
    usersCollection.doc(recipeName).delete();
}

const deleteFood = (recipeName,foodName) =>{
    usersCollection.doc(recipeName).collection('Foods').doc(foodName).delete();
}


const Storage = {
    addRecipes,
    addFoods,
    addTotalCalory,
    subtractTotalCalory,
    deleteFood,
    deleteRecipe
}

export default Storage;