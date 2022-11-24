import React, { createContext } from 'react';
import {app} from '../firebase/firebase'

import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export const AuthContext = createContext()
const auth = getAuth(app)

const UserContext = ({children}) => {
    
    // Register the user

    const signUp = (email, password) => {
       return createUserWithEmailAndPassword(auth, email, password) 
    }

    // user sign in
    const signIn = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const authInfo ={signIn,signUp}
    return ( 
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default UserContext;