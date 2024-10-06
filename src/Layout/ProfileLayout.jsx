import React, { useMemo, useState } from 'react'
import Navbar from '../Components/Common/Navbar/Navbar'
import Profile from '../Pages/Profile'
import { getCurrentUser } from '../api/FirestoreAPI'

function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({})

    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    return (
        <div>
            <Navbar />
            <Profile currentUser={currentUser} />
        </div>
    )
}

export default ProfileLayout