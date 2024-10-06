import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LikeButton from '../LikeButton/LikeButton'
import { deletePost, getAllUsers, getConnections, getCurrentUser } from '../../../api/FirestoreAPI'

function PostsCard({ posts, getEditData, id }) {
    let navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [isConnected, setIsConnected] = useState(false)

    useMemo(() => {
        getCurrentUser(setCurrentUser)
        getAllUsers(setAllUsers)
    }, [])

    useEffect(() => {
        getConnections(currentUser.id, posts.userId, setIsConnected)
    }, [currentUser.id, posts.userId])
    return (
        isConnected ?
            <div className='w-[38vw] min-h-10vh h-full' >
                <div className='w-full mx-auto my-2 bg-white rounded-lg shadow-md p-3 '>
                    <div className='flex gap-3 justify-between'>
                        <div className='flex gap-3'>
                            {allUsers.filter(item => item.id === posts.userId).map(item => item.imageLink)[0] ? <img
                                className='rounded-full h-14 w-14'
                                src={allUsers.filter(item => item.id === posts.userId).map(item => item.imageLink)[0]} alt="" /> :
                                <svg className='h-14 object-contain bg-white w-14 rounded-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" data-supported-dps="128x128">
                                    <path fill="#e9e5de" d="M0 0h128v128H0z" />
                                    <path d="M88.41 84.67a32 32 0 10-48.82 0 66.13 66.13 0 0148.82 0z" fill="#788fa5" />
                                    <path d="M88.41 84.67a32 32 0 01-48.82 0A66.79 66.79 0 000 128h128a66.79 66.79 0 00-39.59-43.33z" fill="#9eb3c8" />
                                    <path d="M64 96a31.93 31.93 0 0024.41-11.33 66.13 66.13 0 00-48.82 0A31.93 31.93 0 0064 96z" fill="#56687a" />
                                </svg>}
                            <div>
                                <p
                                    className='font-semibold hover:underline cursor-pointer'
                                    onClick={() => navigate('/profile', { state: { userId: posts?.userId, email: posts?.email } })}>{allUsers.filter(item => item.id === posts.userId)[0]?.name}</p>
                                <p >{allUsers.filter(item => item.id === posts.userId).map(item => item.headline)}</p>
                                <p className='text-gray-400 mb-3'>{posts.timeStamp}</p>
                            </div>
                        </div>
                        {posts.userId === currentUser.id ? <div className='flex gap-1'>
                            <button
                                onClick={() => getEditData(posts)}
                                className='hover:bg-gray-300 rounded-full h-11 w-11 items-center flex justify-center'>
                                <svg
                                    fill="#000000" height="25" width="25" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 306.637 306.637" xmlSpace="preserve">
                                    <g>
                                        <g>
                                            <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
			l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"/>
                                            <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
			L265.13,75.602L231.035,41.507z"/>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            <button
                                onClick={() => deletePost(posts.id)}
                                className='hover:bg-gray-300 rounded-full h-11 w-11 items-center flex justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </button>

                        </div> : null}
                    </div>
                    <p className='text-gray-700 mt-3'
                    >{posts.status}</p>

                    <div>
                        <LikeButton userId={currentUser.id} postId={posts.id} currentUser={currentUser} />
                    </div>
                </div>
            </div> : <div></div>
    )
}

export default PostsCard