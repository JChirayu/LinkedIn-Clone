import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { uploadPostImageAPI } from '../../../api/ImageUpload';
const ModalComponent = ({ modalOpen, setModalOpen, status, setStatus, sendStatus, isEdit, text, updateStatus, setCurrentImage }) => {
    return (
        <>
            <Modal
                title="Create a post"
                centered
                width={770}
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => {
                    setStatus('')
                    setModalOpen(false)
                }}
                footer={[
                    <Button
                        key="submit"
                        className='bg-blue-500'
                        type="primary"
                        disabled={status.length > 0 ? false : true}
                        onClick={isEdit ? updateStatus : sendStatus}
                    >
                        {isEdit ? <div>Update</div> : <div>Post</div>}
                    </Button>,
                ]}
            >
                <textarea
                    className='border-none bg-white outline-none text-black text-lg w-full h-[20vh] overflow-visible resize-none'
                    type="text"
                    placeholder={text}
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                />
                <label htmlFor="pic" className='cursor-pointer'>
                    <svg
                        className='fill-[#378fe9] w-10 mx-auto absolute'
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
                </label>
                <input type="file" id='pic' hidden onChange={(e) => uploadPostImageAPI(e.target.files[0], setPostImage)} />

            </Modal>
        </>
    );
};
export default ModalComponent;