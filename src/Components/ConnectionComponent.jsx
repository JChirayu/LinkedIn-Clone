import React, { useEffect, useState } from 'react'
import { addConnection, getAllUsers, getConnections, getCurrentUser } from '../api/FirestoreAPI'
import ConnectedUsers from './Common/ConnectedUsers/ConnectedUsers'

function ConnectionComponent({ currentUser }) {
    const [users, setUsers] = useState([])

    const getSelectedUser = (id) => {
        addConnection(currentUser.id, id)
    }
    useEffect(() => {
        getAllUsers(setUsers)
    }, [])

    return (
        <div className='bg-[#f4f2ee] min-h-[100vh] h-[100%] flex justify-center w-full'>
            <div className='flex h-full mt-7 flex-wrap'>
                {users.map(user => <ConnectedUsers user={user} getSelectedUser={getSelectedUser} currentUser={currentUser} />)}
            </div>
        </div>
    )
}

export default ConnectionComponent