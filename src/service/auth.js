import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const googleLogin = async() => {
    // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const signUp = (fullName, email, password) => {
    if (!fullName || !email || !password){
        Alert.alert("Please enter all fields")
    }

    return auth().createUserWithEmailAndPassword(email,password)
    .then( cred => {
        const {uid} = cred.user;

        auth().currentUser.updateProfile({
            displayName: fullName
        })
        return uid;
    })
    .catch( err => Alert.alert(err.code, err.message))    
}

const signIn = (email,password) => {
    if (!email || !password){
        Alert.alert("Please enter all fields")
    }

    return auth().signInWithEmailAndPassword(email, password)
    .then( () => {})
    .catch( error => Alert.alert(error.code, error.message));
}

const forgetPassword = () => {
    if (!email){
        Alert.alert("Please enter your email")
    }
    return auth().sendPasswordResetEmail(email);
}

const signOut = () => {
    return auth().signOut();
}

const Auth = {
    signUp,
    signIn,
    forgetPassword,
    signOut,
    googleLogin
}


export default Auth;