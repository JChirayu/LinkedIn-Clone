import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import Loader from '../Components/Common/Loader/Loader'
import ConnectionComponent from '../Components/ConnectionComponent'

function Connection({ currentUser }) {
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
        loading ? <Loader /> : <ConnectionComponent currentUser={currentUser} />
    )
}

export default Connection