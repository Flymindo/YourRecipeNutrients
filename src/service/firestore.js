import firestore from '@react-native-firebase/firestore';


let currentUserId;;


const addUser = (user) =>{
    firestore().collection('Users').doc(user.uid).set({
        Name: user.displayName,
        Email: user.email,
    })
    currentUserId = user.uid;
}

const addRecipes = (recipeName) =>{
    firestore().collection('Users').doc(currentUserId).collection('Recipes').doc(recipeName).set({
        Name : recipeName,
        TotalCalory: 0
    });
}

const addFoods = (recipeName, foodName, calory) =>{
    firestore().collection('Users').doc(currentUserId).collection('Recipes').doc(recipeName).collection('Foods').doc(foodName).set({
        Name: foodName,
        Calory: calory
    });
}

const addTotalCalory = (recipeName, totalCalory, calory) =>{
    total = totalCalory + calory;
    firestore().collection('Users').doc(currentUserId).collection('Recipes').doc(recipeName).update({
        TotalCalory: total
    })
}

const subtractTotalCalory = (recipeName, totalCalory, calory) =>{
    total = totalCalory - calory;
    firestore().collection('Users').doc(currentUserId).collection('Recipes').doc(recipeName).update({
        TotalCalory: total
    })
}

const deleteRecipe = (recipeName) =>{
    firestore().collection('Users').doc(currentUserId).collection('Recipes').doc(recipeName).delete();
}

const deleteFood = (recipeName,foodName) =>{
    firestore().collection('Users').doc(currentUserId).collection('Recipes').doc(recipeName).collection('Foods').doc(foodName).delete();
}


const Storage = {
    addUser,
    addRecipes,
    addFoods,
    addTotalCalory,
    subtractTotalCalory,
    deleteFood,
    deleteRecipe
}

export default Storage;