import React, { useMemo, useState } from 'react'
import Navbar from '../Components/Common/Navbar/Navbar'
import { getCurrentUser } from '../api/FirestoreAPI'
import Connection from '../Pages/Connection'

function ConnectionLayout() {
    const [currentUser, setCurrentUser] = useState({})
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    return (
        <div>
            <Navbar currentUser={currentUser} />
            <Connection currentUser={currentUser} />
        </div>
    )
}

export default ConnectionLayout