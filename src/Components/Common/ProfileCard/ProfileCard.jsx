import React, { useMemo, useState } from 'react'
import Acitivity from '../Activity/Acitivity'
import About from '../About/About'
import { useLocation } from 'react-router-dom'
import { getSingleUser, getUserStatus } from '../../../api/FirestoreAPI'
import { uploadImageAPI } from '../../../api/ImageUpload'
import FileUploadModal from '../FileUploadModal/FileUploadModal'


function ProfileCard({ currentUser, onEdit }) {

    let location = useLocation()
    const [allStatus, setAllStatus] = useState([])
    const [currentProfile, setCurrentProfile] = useState({})
    const [currentImage, setCurrentImage] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const getImage = (e) => {
        setCurrentImage(e.target.files[0])
    }
    const uploadImage = () => {
        uploadImageAPI(currentImage, currentUser?.id, setModalOpen, setCurrentImage)
    }
    useMemo(() => {
        if (location?.state?.userId) {
            getUserStatus(setAllStatus, location?.state?.userId)
        }
        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email)
        }
    }, [])
    console.log(currentProfile)
    return (
        <div>
            <FileUploadModal modalOpen={modalOpen} setModalOpen={setModalOpen} getImage={getImage} uploadImage={uploadImage} currentImage={currentImage} />
            <div className='w-[50vw] h-[59v] rounded-xl bg-white mx-auto'>
                <div className=' h-[70vh] rounded-xl'>
                    <div className='h-60 mb-16 bg-[#d9e5e7] rounded-t-xl '>
                        <button
                            className='ml-[45vw] relative top-7 bg-white w-11 h-11 rounded-full flex justify-center items-center'
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                id="camera"><path
                                    fill="none"
                                    d="M0 0h24v24H0V0z">
                                </path>
                                <circle cx="12" cy="12" r="3" fill='gray'>
                                </circle>
                                <path
                                    fill='gray'
                                    d="M20 4h-3.17l-1.24-1.35c-.37-.41-.91-.65-1.47-.65H9.88c-.56 0-1.1.24-1.48.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z">
                                </path>
                            </svg>
                        </button>
                        <button
                            onClick={() => setModalOpen(true)}
                            className='w-52 h-52 mx-10 top-16 relative rounded-full flex justify-center items-center bg-white border-white border-2'
                        >
                            {Object.values(currentProfile).length === 0 ?
                                <img className='rounded-full h-52 w-52 outline outline-2 outline-gray-300 outline-offset-4 object-contain' src={currentUser.imageLink} alt="Profile" /> :
                                currentProfile?.imageLink ?
                                    <img className='rounded-full h-52 w-52 outline outline-2 outline-gray-300 outline-offset-4 object-contain'
                                        src={Object.values(currentProfile).length === 0 ? currentUser?.imageLink : currentProfile.imageLink}
                                        alt="Profile image" /> :
                                    <div></div>
                            }


                        </button>
                    </div>
                    {Object.values(currentProfile).length === 0 || currentProfile.name === currentUser.name ? <button
                        onClick={onEdit}
                        className='bg-white w-14 h-14 ml-[45vw] flex items-center justify-center rounded-full hover:bg-gray-100'
                    >
                        <svg
                            fill="#000000"
                            height="30px" width="30px"
                            version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
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
                    </button> : null}
                    <div className='grid grid-cols-3 gap-2'>
                        <div className='col-span-2 mt-5'>
                            <p className='font-semibold text-4xl mx-7'>{Object.values(currentProfile).length === 0 ? currentUser.name : currentProfile?.name}</p>
                            <p className='font-normal mx-7 text-2xl m-3 mt-5'>{Object.values(currentProfile).length === 0 ? currentUser.headline : currentProfile?.headline}</p>
                            <p className='text-xl mx-7 text-gray-500'>{Object.values(currentProfile).length === 0 ? currentUser.country : currentProfile?.country}, {Object.values(currentProfile).length === 0 ? currentUser.city : currentProfile?.city}</p>
                        </div>
                        <div className='mt-5'>
                            <p className='font-semibold text-xl m-3'>{Object.values(currentProfile).length === 0 ? currentUser.college : currentProfile?.college}</p>
                            <p className='font-medium mx-3'>{Object.values(currentProfile).length === 0 ? currentUser.company : currentProfile?.company}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Acitivity currentUser={currentUser} currentProfile={currentProfile} allStatus={allStatus} setAllStatus={setAllStatus} />
            <About currentUser={currentUser} currentProfile={currentProfile} />
        </div>
    )
}

export default ProfileCard