import React, { useState } from 'react'
import { Button, Modal } from 'antd'

function FileUploadModal({ modalOpen, setModalOpen, getImage, uploadImage, currentImage }) {

    return (
        <div>
            <Modal
                title="Add a Profile Image"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={uploadImage} className='bg-blue-500' disabled={!currentImage.name}
                    >
                        Upload Image
                    </Button>
                ]}
            >
                <div>
                    <div className='flex items-center flex-col gap-3'>
                        <p>{currentImage.name}</p>
                        <label htmlFor="image-upload" className='border-[1px] border-gray-300 p-2 shadow-xl'>Add an image</label>
                    </div>
                    <input hidden id='image-upload' type={'file'} onChange={getImage} />
                </div>
            </Modal>
        </div>
    )
}

export default FileUploadModal 