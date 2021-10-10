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
        TotalCalory: 0,
        TotalCarboHydrate: 0,
        TotalProtein: 0,
        TotalFat : 0,
    });
}

const addFoods = (recipeName, foodName, calory,carboHydrate,protein,fat) =>{
    firestore().collection('Users').doc(currentUserId).collection('Recipes').doc(recipeName).collection('Foods').doc(foodName).set({
        Name: foodName,
        Calory: calory,
        CarboHydrate : carboHydrate,
        Protein: protein,
        Fat: fat,
    });
}

const addTotalNutrients = (recipeName, totalCalory, calory, totalCarboHydrate, carboHydrate, totalProtein, protein,totalFat, fat) =>{
    totalCal = totalCalory + calory;
    totalPro = totalProtein + protein;
    totalFat = totalFat + fat;
    totalCarbo = totalCarboHydrate + carboHydrate;
    firestore().collection('Users').doc(currentUserId).collection('Recipes').doc(recipeName).update({
        TotalCalory: totalCal,
        TotalProtein: totalPro,
        TotalFat: totalFat,
        TotalCarboHydrate: totalCarbo,
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
    addTotalNutrients,
    subtractTotalCalory,
    deleteFood,
    deleteRecipe
}

export default Storage;