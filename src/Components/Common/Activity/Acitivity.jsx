import React, { useMemo, useState } from 'react';
import { GetStatusAPI, PostStatusAPI } from '../../../api/FirestoreAPI';
import PostsCard from '../PostsCard/PostsCard';
import ModalComponent from '../Modal/Modal';
import { currentDate } from '../../../helpers/useMoment';
import { getUniqueID } from '../../../helpers/getUniqueID';

function Acitivity({ currentUser, currentProfile, allStatus, setAllStatus }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState('')
    const userEmail = localStorage.getItem('userEmail')
    const [expanded, setExpanded] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currentPost, setCurrentPost] = useState({})

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: currentDate('LLL'),
            email: userEmail,
            name: currentUser.name,
            postID: getUniqueID(),
            userId: currentUser.id,
        }
        await PostStatusAPI(object)
        await setModalOpen(false)
        await setStatus('')
    }

    const getEditData = (posts) => {
        setModalOpen(true)
        setStatus(posts?.status)
        setCurrentPost(posts)
        setIsEdit(true)
    }

    const updateStatus = () => {
        updatePost(currentPost.id, status)
        setModalOpen(false)
        toast.success('Post updated successfully')
    }

    useMemo(() => {
        GetStatusAPI(setAllStatus)
    }, [])
    return (
        <div className={expanded ? `h-full w-[40vw] mx-auto bg-white rounded-xl relative top-4 p-2 pb-7 shadow-sm` : `h-[40vh] w-[40vw] mx-auto bg-white rounded-xl relative top-4 p-2 pb-7 shadow-sm overflow-scroll overflow-x-hidden`}>
            <div className='flex justify-between'>
                <h1 className='text-2xl mx-10 my-5'>Activity</h1>
                <div className='flex flex-col'>
                    {Object.values(currentProfile).length === 0 || currentProfile.name == currentUser.name ? <button
                        className=' border-2 border-[#0a66c2] text-[#0a66c2] h-10 m-5 w-36 rounded-full hover:bg-gray-200'
                        onClick={() => { setModalOpen(true) }}
                    >Create a post</button> : null}
                    <button
                        className='hover:bg-gray-100 rounded-full mx-auto w-24 border-2'
                        onClick={toggleExpanded}>{!expanded ? <p>Show more</p> : <p>Show less</p>}</button>
                </div>
            </div>
            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setStatus={setStatus}
                status={status}
                sendStatus={sendStatus}
                isEdit={isEdit}
                text={'what do you want to talk about?'}
                updateStatus={updateStatus}
            />
            <div className='grid grid-flow-row justify-items-center'>
                {allStatus.filter((post) => {
                    if (Object.values(currentProfile).length === 0) {
                        return (post.email === currentUser.email)
                    } else {
                        return (post.email === currentProfile.email)
                    }
                }).map((posts, index) => {
                    return (
                        <div key={index}>
                            <PostsCard posts={posts} getEditData={getEditData} />
                        </div>
                    )
                })}
            </div>
        </div>)
}

export default Acitivity