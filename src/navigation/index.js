import React, {useState, useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';


const AppContainer =  () =>  {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
    GoogleSignin.configure({
        webClientId: '756717195653-pb7k5q0tnhppppsj2mf5kd7odojrm6u5.apps.googleusercontent.com'
        });
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount

     
    }, []);
  
    if (initializing) return null;

  
    return (
      <NavigationContainer>
          {user ? <AppNavigator/> : <AuthNavigator/>}
      </NavigationContainer>
    );

}
export default AppContainer;