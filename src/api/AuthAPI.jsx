import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { GoogleAuthProvider } from 'firebase/auth'

export const LoginAPI = ({ email, password }) => {
    try {
        let res = signInWithEmailAndPassword(auth, email, password)
        return res
    } catch (error) {
        return error
    }
}

export const RegisterAPI = ({ email, password }) => {
    try {
        let res = createUserWithEmailAndPassword(auth, email, password)
        return res
    } catch (error) {
        return error
    }

}

export const GoogleSignInAPI = async () => {
    try {
        let googleProvider = new GoogleAuthProvider()
        let res = await signInWithPopup(auth, googleProvider)
        const credentials = GoogleAuthProvider.credentialFromResult(result)
        const token = credentials.accessToken
        const user = res.user
        console.log('credentials:', credentials)
        console.log('token', token)
        console.log('user:', user)
        return res
    } catch (error) {
        return error
    }
}


export const onLogout = () => {
    try {
        signOut(auth)
    } catch (error) {
        return error
    }
}