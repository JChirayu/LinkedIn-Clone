import React, { useState } from 'react'
import { editProfile } from '../../../api/FirestoreAPI'

function EditProfile({ onEdit, currentUser }) {
    const [editInput, setEditInput] = useState(currentUser)

    const getInput = (e) => {
        const { name, value } = e.target
        setEditInput({ ...editInput, [name]: value })
    }

    const updateProfileData = (e) => {
        e.preventDefault()
        editProfile(currentUser?.id, editInput)
        onEdit()
    }
    return (
        <div className='flex justify-center h-[100%] bg-[#f4f2ee]'>
            <form onSubmit={updateProfileData} className='w-[50vw] h-[100%] rounded-xl bg-white flex flex-col'>
                <button onClick={onEdit} className='self-start mx-5 my-2 border-2 border-[#0a66c2] text-[#0a66c2] h-10 m-5 w-36 hover:bg-gray-200'>Back</button>
                <p className='mx-7 mb-5 text-gray-600'>* indicates required</p>
                <div className='flex flex-col'>
                    <label
                        htmlFor=""
                        className='mx-7 text-xl text-gray-500'
                    >Name*</label>
                    <input
                        type="text"
                        name='name'
                        className='h-10 border-2 m-2 mx-5 mb-14 p-5 text-xl'
                        onChange={getInput}
                        value={editInput.name}
                        required
                    />
                    <label
                        htmlFor=""
                        className='mx-7 text-xl text-gray-500'
                    >Headline*</label>
                    <input
                        type="text"
                        name='headline'
                        className='h-10 border-2 m-2 mx-5 mb-14 p-5 text-xl'
                        onChange={getInput}
                        value={editInput.headline}
                        required
                    />
                    <label
                        htmlFor=""
                        className='mx-5 text-xl text-gray-500'
                    >Company</label>
                    <input
                        type="text"
                        name='company'
                        className='h-10 border-2 m-2 mx-5 mb-14 p-5 text-xl'
                        onChange={getInput}
                        value={editInput.company}
                    />
                    <label
                        htmlFor=""
                        className='mx-5 text-lg text-gray-500'
                    >Industry</label>
                    <input
                        type="text"
                        name='industry'
                        className='h-10 border-2 m-2 mx-5 mb-14 p-5 text-xl'
                        onChange={getInput}
                        value={editInput.industry}
                    />
                    <p className='text-3xl font-semibold mx-5'>Education</p>
                    <label
                        htmlFor=""
                        className='mx-5 text-lg text-gray-500'
                    >Education*</label>
                    <input
                        type="text"
                        name='college'
                        className='h-10 border-2 m-2 mx-5 mb-14 p-5 text-xl'
                        onChange={getInput}
                        value={editInput.college}
                        required
                    />
                    <p className='text-3xl font-semibold mx-5'>Location</p>
                    <label
                        htmlFor=""
                        className='mx-5 text-lg text-gray-500'
                    >Country</label>
                    <input
                        type="text"
                        name='country'
                        className='h-10 border-2 m-2 mx-5 mb-8 p-5 text-xl'
                        onChange={getInput}
                        value={editInput.county}
                    />
                    <label
                        htmlFor=""
                        className='mx-5 text-lg text-gray-500'
                    >City</label>
                    <input
                        type="text"
                        name='city'
                        className='h-10 border-2 m-2 mx-5 mb-14 p-5 text-xl'
                        onChange={getInput}
                        value={editInput.city}
                    />
                    <label
                        htmlFor=""
                        className='text-3xl font-semibold mx-5'
                    >About</label>
                    <textarea
                        type="text"
                        name='about'
                        className='h-40 border-2 m-2 mx-5 mb-14 p-5 text-xl'
                        onChange={getInput}
                        value={editInput.about}
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='rounded-xl mx-auto bg-blue-700 text-white h-14 m-5 text-xl font-semibold w-40'
                >Save</button>
            </form>
        </div>
    )
}

export default EditProfile