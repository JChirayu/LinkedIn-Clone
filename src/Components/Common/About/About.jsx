import React, { useState } from 'react';
import ModalComponent from '../Modal/Modal';
import { editProfile } from '../../../api/FirestoreAPI';

function About({ currentUser, currentProfile }) {
    const [expanded, setExpanded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [userAbout, setUserAbout] = useState('')


    const updateAbout = async () => {
        editProfile(currentUser?.id, { ...currentUser, about: userAbout })
        await setModalOpen(false)
        await setUserAbout('')
    }

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    let aboutText = '';
    if (currentUser && Object.values(currentProfile).length === 0) {
        aboutText = currentUser.about || '';
    } else if (currentProfile) {
        aboutText = currentProfile.about || '';
    }


    const truncatedText = aboutText.slice(0, 300);

    return (
        <div className='w-[40vw] mx-auto bg-white rounded-xl m-10 shadow-sm pb-10'>
            <div className='flex justify-between'>
                <p className='text-2xl mx-7 my-7'>About</p>
                {Object.values(currentProfile)?.length === 0 || currentProfile.name === currentUser.name ? <button
                    onClick={() => setModalOpen(true)}
                    className='bg-white h-14 my-4 mx-7 w-14 flex items-center justify-center rounded-full hover:bg-gray-100'
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
            </div>
            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                status={userAbout}
                setStatus={setUserAbout}
                sendStatus={updateAbout}
                text={'About'}
            />
            <div className='font-normal mx-5'>
                {expanded ? aboutText : truncatedText}
                {!expanded && aboutText?.length > 300 && (
                    <button className='text-blue-500 ' onClick={toggleExpanded}>
                        ...Read More
                    </button>
                )}
                {expanded && aboutText.length > 300 && (
                    <button className='text-gray-500'
                        onClick={toggleExpanded}
                    >&nbsp;Show less</button>
                )}
            </div>
        </div>
    );
}

export default About;
