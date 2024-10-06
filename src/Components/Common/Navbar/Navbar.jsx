import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropDown from '../ProfileDropDown/ProfileDropDown';
import ProfileDropDown from '../ProfileDropDown/ProfileDropDown';
import SearchUser from '../SearchUser/SearchUser';
import { getAllUsers } from '../../../api/FirestoreAPI';


function Navbar({ currentUser }) {
    const [activeNavItem, setActiveNavItem] = useState(0);
    const [isSearch, setIsSearch] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [users, setUsers] = useState([])

    const navigate = useNavigate()
    const profilePopup = () => {

    }

    const navItems = [
        {
            name: 'Home',
            link: '/home',
            img: <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="m23 9v2h-2v7c0 1.7-1.3 3-3 3h-4v-6h-4v6h-4c-1.7 0-3-1.3-3-3v-7h-2v-2l11-7z"></path>
                <path d="m20 2h-3v3.2l3 1.9z"></path>
            </svg>,
            active: false
        }, {
            name: 'Connections',
            link: '/connection',
            img: <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="rgba(0,0,0,0.6)">
                <path d="m12 16v6h-9v-6c0-1.7 1.3-3 3-3h3c1.7 0 3 1.3 3 3zm5.5-3c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5 1.6 3.5 3.5 3.5zm1 2h-2c-1.4 0-2.5 1.1-2.5 2.5v4.5h7v-4.5c0-1.4-1.1-2.5-2.5-2.5zm-11-13c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z"></path>
            </svg>,
            active: false
        }, {
            name: 'Jobs',
            link: '/jobs',
            img: <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="rgba(0,0,0,0.6)"><path d="m17 6v-1c0-1.7-1.3-3-3-3h-4c-1.7 0-3 1.3-3 3v1h-5v4c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-4zm-8-1c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v1h-6zm10 9c1.2 0 2.3-.5 3-1.4v4.4c0 1.7-1.3 3-3 3h-14c-1.7 0-3-1.3-3-3v-4.4c.7.9 1.8 1.4 3 1.4z"></path></svg>,
            active: false
        },
        {
            name: 'Messaging',
            link: '/messaging',
            img: <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="rgba(0,0,0,0.6)">
                <path d="M16 3H8C6.14348 3 4.36301 3.77847 3.05025 5.16416C1.7375 6.54984 1 8.42923 1 10.3889C1 12.3485 1.7375 14.2279 3.05025 15.6136C4.36301 16.9993 6.14348 17.7778 8 17.7778H12V22L20.16 16.3106C21.0512 15.639 21.7751 14.7495 22.2697 13.7183C22.7643 12.687 23.0148 11.5446 23 10.3889C23 8.42923 22.2625 6.54984 20.9497 5.16416C19.637 3.77847 17.8565 3 16 3ZM8 11.7083C7.75277 11.7083 7.5111 11.631 7.30554 11.486C7.09998 11.341 6.93976 11.1349 6.84515 10.8938C6.75054 10.6527 6.72579 10.3874 6.77402 10.1315C6.82225 9.87553 6.9413 9.64043 7.11612 9.4559C7.29093 9.27137 7.51366 9.14571 7.75614 9.0948C7.99861 9.04389 8.24995 9.07002 8.47835 9.16988C8.70676 9.26975 8.90199 9.43886 9.03934 9.65585C9.17669 9.87283 9.25 10.1279 9.25 10.3889C9.25 10.7388 9.1183 11.0744 8.88388 11.3219C8.64946 11.5693 8.33152 11.7083 8 11.7083ZM12 11.7083C11.7528 11.7083 11.5111 11.631 11.3055 11.486C11.1 11.341 10.9398 11.1349 10.8452 10.8938C10.7505 10.6527 10.7258 10.3874 10.774 10.1315C10.8222 9.87553 10.9413 9.64043 11.1161 9.4559C11.2909 9.27137 11.5137 9.14571 11.7561 9.0948C11.9986 9.04389 12.2499 9.07002 12.4784 9.16988C12.7068 9.26975 12.902 9.43886 13.0393 9.65585C13.1767 9.87283 13.25 10.1279 13.25 10.3889C13.25 10.7388 13.1183 11.0744 12.8839 11.3219C12.6495 11.5693 12.3315 11.7083 12 11.7083ZM16 11.7083C15.7528 11.7083 15.5111 11.631 15.3055 11.486C15.1 11.341 14.9398 11.1349 14.8452 10.8938C14.7505 10.6527 14.7258 10.3874 14.774 10.1315C14.8222 9.87553 14.9413 9.64043 15.1161 9.4559C15.2909 9.27137 15.5137 9.14571 15.7561 9.0948C15.9986 9.04389 16.2499 9.07002 16.4784 9.16988C16.7068 9.26975 16.902 9.43886 17.0393 9.65585C17.1767 9.87283 17.25 10.1279 17.25 10.3889C17.25 10.7388 17.1183 11.0744 16.8839 11.3219C16.6495 11.5693 16.3315 11.7083 16 11.7083Z"></path>
            </svg>,
            active: false
        }, {
            name: 'Notification',
            link: '/notification',
            img: <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="rgba(0,0,0,0.6)">
                <path d="M13.7 19C13.9 19.3 14 19.6 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 19.6 10.1 19.3 10.3 19H2V18C2 17 2.4 16.1 3.2 15.2L4.2 14H19.9L20.9 15.2C21.7 16.2 22.1 17.1 22.1 18V19H13.7ZM18.2 7.4C17.8 4.3 15.1 2 12 2C8.9 2 6.2 4.3 5.8 7.4L5 13H19L18.2 7.4Z"></path>
            </svg>,
            active: false
        },

        {
            name: <ProfileDropDown currentUser={currentUser} />,
            img: <div className='bg-gray-300 rounded-full w-6 h-6' onClick={profilePopup}>
                {<svg className='rounded-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" data-supported-dps="128x128">
                    <path fill="#e9e5de" d="M0 0h128v128H0z" />
                    <path d="M88.41 84.67a32 32 0 10-48.82 0 66.13 66.13 0 0148.82 0z" fill="#788fa5" />
                    <path d="M88.41 84.67a32 32 0 01-48.82 0A66.79 66.79 0 000 128h128a66.79 66.79 0 00-39.59-43.33z" fill="#9eb3c8" />
                    <path d="M64 96a31.93 31.93 0 0024.41-11.33 66.13 66.13 0 00-48.82 0A31.93 31.93 0 0064 96z" fill="#56687a" />
                </svg>}
            </div>,
            active: false
        },
    ];

    const handleItemClick = (index) => {
        setActiveNavItem(index);
    };

    const handleSearch = () => {
        if (searchInput !== '') {
            let searched = users.filter((user) => {
                return Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredUsers(searched)
        } else {
            setFilteredUsers(users)
        }
    }

    useEffect(() => {
        let debounced = setTimeout(() => {
            handleSearch()
        }, 1000);

        return () => clearTimeout(debounced)
    }, [searchInput])

    useEffect(() => {
        getAllUsers(setUsers)
    }, [])

    const openUser = (user) => {
        navigate('/profile', { state: { id: user.id, email: user.email } })
    }
    return (
        <div className='grid grid-cols-2 px-44 py-1 sticky top-0 bg-white z-10'>
            <div className='flex items-center mx-auto'>
                <img className='mx-2 w-10 h-10' src="linkedin.png" alt="" />

                <div className='bg-gray-100 w-[100%] rounded-md flex relative'>
                    <svg
                        className='w-10'
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 101 101" id="search">
                        <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z">
                        </path>
                    </svg>
                    <SearchUser setSearchInput={setSearchInput} />
                    {searchInput.length === 0 ? (<div></div>) :
                        (<div className='bg-white absolute w-96 max-h-[50vh] top-14 rounded-lg overflow-y-scroll overflow-x-hidden box-border'>
                            {filteredUsers.length === 0 ? <div className='m-10 text-center text-lg'>No result found!</div> : filteredUsers.map(user => (<div onClick={() => openUser(user)} className='flex py-8 px-4 items-center hover:bg-gray-100 h-10 cursor-pointer'>
                                <p className='text-lg text-gray-600 w-full'>{user.name}</p>
                                <p className='py-3 w-full h-10 text-sm text-gray-400'>{user.headline ? Object.values(user.headline).slice(0, 20) : ''}...</p>
                                <img className='rounded-full h-10 w-10' src={user.imageLink} alt="" />
                            </div>))}
                        </div>)}
                </div>
            </div>
            <ul className='flex'>
                {navItems.map((item, index) => (
                    <button key={index} className='mx-4 flex flex-col cursor-pointer' onClick={() => {
                        handleItemClick(index);
                        navigate(item.link);
                    }}>
                        <li className='mx-auto'>{item.img}</li>
                        <li className={activeNavItem === index ? `border-b-2 border-blue-600` : 'border-b-0'}>{item.name}</li>
                    </button>
                ))}
            </ul>

        </div>
    );
}

export default Navbar;
