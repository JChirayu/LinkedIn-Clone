import React, { useEffect, useState } from 'react'
import LoginComponent from '../Components/LoginComponent'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import Loader from '../Components/Common/Loader/Loader'

function Login() {

    let navigate = useNavigate()
    const [loading, setLoader] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, res => {
            if (res?.accessToken) {
                navigate('/home')
            } else {
                setLoader(false)
            }
        })
    }, [])

    return (
        loading ? <Loader /> : <LoginComponent />
    )
}

export default Login