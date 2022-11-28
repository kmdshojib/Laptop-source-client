import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase'

import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'

export const AuthContext = createContext()
const auth = getAuth(app)

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()
    // Register the user

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // user sign in
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    // log out an user
    const logOut = () => {
        signOut(auth)
    }
    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }
    // updating current user
    const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            console.log("currentUser", currentUser)
        })
        return () => unSubscribe
    })

   
    const authInfo = { signIn, signUp, logOut, updateUserProfile, user, loading,googleSignIn }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default UserContext;