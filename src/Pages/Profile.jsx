import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import Loader from '../Components/Common/Loader/Loader'
import ProfileComponet from '../Components/ProfileComponet'

function Profile({ currentUser }) {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, res => {
            if (!res?.accessToken) {
                navigate('/')
            } else {
                setLoading(false)
            }
        })
    }, [])

    return (
        loading ? <Loader /> : <ProfileComponet currentUser={currentUser} />
    )
}

export default Profile