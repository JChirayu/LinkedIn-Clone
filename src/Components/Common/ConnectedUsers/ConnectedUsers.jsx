import React, { useEffect, useState } from 'react'
import { getConnections } from '../../../api/FirestoreAPI'

function ConnectedUsers({ user, getSelectedUser, currentUser }) {
    const [isConnected, setIsConnected] = useState(false)
    useEffect(() => {
        getConnections(currentUser.id, user.id, setIsConnected)
    }, [currentUser.id, user.id])
    return isConnected ?
        (<div></div>) :
        (<div className='mx-auto'>
            {user.id !== currentUser.id && <div
                className=' bg-white rounded-xl w-60 h-72 flex flex-col mx-2'
                onClick={() => getSelectedUser(user.id)}>
                <div className='bg-[#d9e5e7] flex h-14 mb-7'>
                    <img
                        className='rounded-full h-16 w-16 mt-3 mx-4'
                        src={user.imageLink} alt="" />
                </div>
                <div className='h-32 mb-4 overflow-hidden'>
                    <p className='font-semibold text-lg mx-4'>{user.name}</p>
                    <p className='text-gray-500 mx-4'>{user.headline}</p>
                </div>
                <button
                    className='text-center border-2 text-[#0a66c2] border-[#0a66c2] w-40 rounded-full mx-auto justify-center'
                    onClick={() => getSelectedUser(user.id)}>Connect</button>
            </div>}
        </div>
        )
}

export default ConnectedUsers