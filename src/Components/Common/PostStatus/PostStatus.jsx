import React, { useState, useMemo } from 'react'
import ModalComponent from '../Modal/Modal';
import { PostStatusAPI, GetStatusAPI, updatePost, getConnections } from '../../../api/FirestoreAPI';
import PostsCard from '../PostsCard/PostsCard';
import { currentDate } from '../../../helpers/useMoment';
import { getUniqueID } from '../../../helpers/getUniqueID';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { uploadPostImageAPI } from '../../../api/ImageUpload';

function PostStatus({ currentUser }) {
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState('')
    const [allStatus, setAllStatus] = useState([])
    const userEmail = localStorage.getItem('userEmail')
    const [isEdit, setIsEdit] = useState(false)
    const [currentPost, setCurrentPost] = useState({})
    const [currentImage, setCurrentImage] = useState({})
    const [postImage, setPostImage] = useState('')

    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: currentDate('LLL'),
            email: userEmail,
            name: currentUser.name,
            postID: getUniqueID(),
            userId: currentUser.id,
            imageLink: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
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
    }

    useMemo(() => {
        GetStatusAPI(setAllStatus)
    }, [])
    return (
        <div className='bg-[#f4f2ee] min-h-[100vh] h-[100%] flex justify-center w-full'>
            <div className='bg-white w-60 h-60 my-8 rounded-xl cursor-pointer sticky top-20' onClick={() => navigate('/profile')}>
                <div className='bg-[#d9e5e7] h-16 flex justify-center rounded-t-xl'>
                    {currentUser.imageLink ? <img className='rounded-full h-20 w-20 outline outline-2 outline-gray-300 outline-offset-4 object-contain mt-8 bg-white' src={currentUser.imageLink} alt="Profile image" /> :
                        <svg className='rounded-full h-20 w-20 outline outline-2 outline-gray-300 outline-offset-4 object-contain mt-8 bg-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" data-supported-dps="128x128">
                            <path fill="#e9e5de" d="M0 0h128v128H0z" />
                            <path d="M88.41 84.67a32 32 0 10-48.82 0 66.13 66.13 0 0148.82 0z" fill="#788fa5" />
                            <path d="M88.41 84.67a32 32 0 01-48.82 0A66.79 66.79 0 000 128h128a66.79 66.79 0 00-39.59-43.33z" fill="#9eb3c8" />
                            <path d="M64 96a31.93 31.93 0 0024.41-11.33 66.13 66.13 0 00-48.82 0A31.93 31.93 0 0064 96z" fill="#56687a" />
                        </svg>}
                </div>
                <p className='mt-14 text-center font-semibold text-lg'>{currentUser.name}</p>
                <p className='text-center text-gray-500 h-20 overflow-clip'>{currentUser.headline}</p>
            </div>
            <div className='mx-10'>
                <div className='w-[38vw] mx-auto bg-white rounded-xl relative top-7 shadow-sm'>
                    <div className='flex'>
                        {currentUser?.imageLink ? <img className='h-16 object-contain bg-white w-20 rounded-full mx-5 mt-4 o' src={currentUser.imageLink} alt="Profile image" /> :
                            <svg className='h-16 object-contain bg-white w-20 rounded-full mx-5 mt-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" data-supported-dps="128x128">
                                <path fill="#e9e5de" d="M0 0h128v128H0z" />
                                <path d="M88.41 84.67a32 32 0 10-48.82 0 66.13 66.13 0 0148.82 0z" fill="#788fa5" />
                                <path d="M88.41 84.67a32 32 0 01-48.82 0A66.79 66.79 0 000 128h128a66.79 66.79 0 00-39.59-43.33z" fill="#9eb3c8" />
                                <path d="M64 96a31.93 31.93 0 0024.41-11.33 66.13 66.13 0 00-48.82 0A31.93 31.93 0 0064 96z" fill="#56687a" />
                            </svg>}
                        <button
                            className='border-[1px] border-gray-400 mt-5 rounded-full w-full mx-4 h-12 my-auto px-4 text-start text-gray-600'
                            onClick={() => {
                                setIsEdit(false)
                                setModalOpen(true)
                            }}
                        >Start a post!</button>
                    </div>
                    <div className='flex justify-between my-3 px-5'>
                        <button className='m-3 flex'>
                            <svg
                                className='fill-[#378fe9] w-7 mx-auto'
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1"
                                viewBox="0 0 100 125"
                                x="0px"
                                y="0px">
                                <title>04</title>
                                <g data-name="Group">
                                    <path data-name="Compound Path" d="M8.1,39.81V82.1a10,10,0,0,0,10,10H81.9a10,10,0,0,0,10-10V39.81a10,10,0,0,0-10-10H18.1A10,10,0,0,0,8.1,39.81Zm4,42.29V74.86l21.8-13.8,24.73,27H18.1A6,6,0,0,1,12.1,82.1Zm69.81,6H64L53.21,76.26,70.1,63.35,87.9,77.52V82.1A6,6,0,0,1,81.9,88.1ZM18.1,33.81H81.9a6,6,0,0,1,6,6v32.6L71.37,59.24a2,2,0,0,0-2.46,0L50.5,73.3,35.71,57.12a2,2,0,0,0-2.55-.34L12.1,70.12V39.81A6,6,0,0,1,18.1,33.81Z" />
                                    <path data-name="Compound Path" d="M52.25,60a9.54,9.54,0,1,0-9.54-9.54A9.55,9.55,0,0,0,52.25,60Zm0-15.08a5.54,5.54,0,1,1-5.54,5.54A5.55,5.55,0,0,1,52.25,44.92Z" />
                                    <path data-name="Path" d="M17.05,20.86a2,2,0,0,0,2,2h61.9a2,2,0,0,0,0-4H19.05A2,2,0,0,0,17.05,20.86Z" />
                                    <path data-name="Path" d="M74,11.9a2,2,0,1,0,0-4H26a2,2,0,1,0,0,4Z" />
                                </g>
                            </svg>
                            <h1 className='font-semibold mx-2 my-1'>Media</h1>
                        </button>
                        <button className='m-3 flex'>
                            <svg
                                className='fill-[#c98a2d] w-7 mx-auto'
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                x="0px"
                                y="0px"
                                viewBox="-434 236 90 112.5"
                                xmlSpace="preserve">
                                <g>
                                    <path d="M-355.4,255.5c-1.1-1.1-2.4-1.6-3.8-1.6h-5.4v-4.1c0-1.9-0.7-3.5-2-4.8c-1.3-1.3-2.9-2-4.8-2h-2.7c-1.9,0-3.5,0.7-4.8,2   c-1.3,1.3-2,2.9-2,4.8v4.1h-16.3v-4.1c0-1.9-0.7-3.5-2-4.8c-1.3-1.3-2.9-2-4.8-2h-2.7c-1.9,0-3.5,0.7-4.8,2c-1.3,1.3-2,2.9-2,4.8   v4.1h-5.4c-1.5,0-2.7,0.5-3.8,1.6c-1.1,1.1-1.6,2.3-1.6,3.8v54.4c0,1.5,0.5,2.7,1.6,3.8c1.1,1.1,2.3,1.6,3.8,1.6h59.8   c1.5,0,2.7-0.5,3.8-1.6c1.1-1.1,1.6-2.4,1.6-3.8v-54.4C-353.8,257.9-354.3,256.6-355.4,255.5z M-375.5,249.9h5.4v9.6h-5.4V249.9z    M-408.1,249.8h5.4v9.6h-5.4V249.8z M-406.8,313.7H-419v-12.2h12.2V313.7z M-406.8,298.8H-419v-13.6h12.2V298.8z M-406.8,282.5   H-419v-12.2h12.2V282.5z M-390.5,313.7h-13.6v-12.2h13.6V313.7z M-390.5,298.8h-13.6v-13.6h13.6V298.8z M-390.5,282.5h-13.6v-12.2   h13.6V282.5z M-374.2,313.7h-13.6v-12.2h13.6V313.7z M-374.2,298.8h-13.6v-13.6h13.6V298.8z M-374.2,282.5h-13.6v-12.2h13.6V282.5z    M-359.2,313.7h-12.2v-12.2h12.2V313.7z M-359.2,298.8h-12.2v-13.6h12.2V298.8z M-359.2,282.5h-12.2v-12.2h12.2V282.5z" />
                                </g>
                            </svg>
                            <h1 className='font-semibold mx-2 my-1'>Event</h1>
                        </button>
                        <button className='m-3 flex'>
                            <svg
                                className='fill-[#e06847] w-7 mx-auto'
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1"
                                viewBox="0 0 100 125"
                                x="0px"
                                y="0px">
                                <g>
                                    <rect x="55" y="39" width="22" height="6" />
                                    <rect x="55" y="55" width="22" height="6" />
                                    <rect x="23" y="71" width="54" height="6" />
                                    <rect x="23" y="23" width="54" height="6" />
                                    <path d="M27,62H42a4,4,0,0,0,4-4V42a4,4,0,0,0-4-4H27a4,4,0,0,0-4,4V58A4,4,0,0,0,27,62Zm2-18H40V56H29Z" />
                                </g>
                            </svg>
                            <h1 className='font-semibold mx-2 my-1'>Write Article</h1>
                        </button>
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
                        setCurrentImage={setCurrentImage}
                        uploadPostImageAPi={uploadPostImageAPI}
                        setPostImage={setPostImage}
                    />
                </div>
                <div className='grid grid-flow-row justify-items-center mt-10'>
                    {allStatus.map((posts, index) => {
                        return (
                            <div key={index}>
                                <PostsCard posts={posts} getEditData={getEditData} />
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default PostStatus