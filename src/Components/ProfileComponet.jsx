import React, { useState } from 'react'
import ProfileCard from './Common/ProfileCard/ProfileCard'
import EditProfile from './Common/EditProfile/EditProfile'

function ProfileComponet({ currentUser }) {
    const [edit, setEdit] = useState(false)

    const onEdit = () => {
        setEdit(prev => !prev)
    }
    return (
        <div className='flex flex-col h-[100%] bg-[#f4f2ee]'>
            {edit ? <EditProfile onEdit={onEdit} currentUser={currentUser} /> : <ProfileCard currentUser={currentUser} onEdit={onEdit} />}
        </div>
    )
}

export default ProfileComponet