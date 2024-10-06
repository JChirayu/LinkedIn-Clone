import React, { useMemo, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { onLogout } from '../../../api/AuthAPI';
import { getAllUsers, getCurrentUser } from '../../../api/FirestoreAPI';

const items = [
    {
        label: <div></div>,
        key: '0',
    },
    {
        label: <div>My Profile</div>,
        key: '1'
    },
    {
        label: <div onClick={onLogout}>Log out</div>,
        key: '2',
    },
];

const ProfileDropDown = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState([])
    const handleProfileClick = () => {
        navigate('/profile');
    };

    useMemo(() => {
        getCurrentUser(setCurrentUser)
        // getAllUsers(setAllUsers)
    })
    return (
        <Dropdown
            menu={{
                items: [
                    {
                        ...items[0],
                        label: <div className='flex gap-3 mb-4' onClick={handleProfileClick}>
                            {currentUser.imageLink ? <img
                                className='h-10 w-10 rounded-full '
                                src={currentUser.imageLink} /> : <div className='bg-gray-300 rounded-full w-10 h-10'>
                                <svg className='rounded-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" data-supported-dps="128x128">
                                    <path fill="#e9e5de" d="M0 0h128v128H0z" />
                                    <path d="M88.41 84.67a32 32 0 10-48.82 0 66.13 66.13 0 0148.82 0z" fill="#788fa5" />
                                    <path d="M88.41 84.67a32 32 0 01-48.82 0A66.79 66.79 0 000 128h128a66.79 66.79 0 00-39.59-43.33z" fill="#9eb3c8" />
                                    <path d="M64 96a31.93 31.93 0 0024.41-11.33 66.13 66.13 0 00-48.82 0A31.93 31.93 0 0064 96z" fill="#56687a" />
                                </svg>
                            </div>}
                            <p className='w-40'>{currentUser.headline}</p>
                        </div>
                    },
                    {
                        ...items[1],
                        label: <div className='text-center border-2 text-[#0a66c2] border-[#0a66c2] w-40 rounded-full mx-auto' onClick={handleProfileClick}>My Profile</div>,
                    },
                    items[2],
                ],
            }}
            trigger={['click']}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Me
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
};

export default ProfileDropDown;
