import React, { useState } from 'react'
import { LoginAPI, GoogleSignInAPI } from '../api/AuthAPI'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function LoginComponent() {
    const [visible, setVisible] = useState(false)
    const [credentials, setCredentials] = useState({ email: '', password: '' })

    const login = async () => {
        try {
            let res = await LoginAPI(credentials)
            toast.success('Signed In to LinkedIn!')
            localStorage.setItem('userEmail', res.user.email)
            navigate('/home')
        } catch (error) {
            toast.error('Please check your credentials')
        }
    }

    const googleSignIn = async () => {
        try {
            let res = await GoogleSignInAPI()
            navigate('/home')
            postUserData({ name: credentials.name, email: credentials.email })

        } catch (error) {
            return error
        }

    }

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            await login()
        }
    }
    const navigate = useNavigate()
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            onKeyDown={handleKeyPress}
            className='bg-[#f3f2f0] h-[100vh]'
        >
            <svg
                className='w-32 p-10 box-content'
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 84 21"
                preserveAspectRatio="xMinYMin meet"
                version="1.1"
                focusable="false"
                style={{ color: "#0a66c2" }}>
                <g stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd">
                    <path
                        d="M19.479,0 L1.583,0 C0.727,0 0,0.677 0,1.511 L0,19.488 C0,20.323 0.477,21 1.333,21 L19.229,21 C20.086,21 21,20.323 21,19.488 L21,1.511 C21,0.677 20.336,0 19.479,0"
                        transform="translate(63.000000, 0.000000)">
                    </path>
                    <path d="M82.479,0 L64.583,0 C63.727,0 63,0.677 63,1.511 L63,19.488 C63,20.323 63.477,21 64.333,21 L82.229,21 C83.086,21 84,20.323 84,19.488 L84,1.511 C84,0.677 83.336,0 82.479,0 Z M71,8 L73.827,8 L73.827,9.441 L73.858,9.441 C74.289,8.664 75.562,7.875 77.136,7.875 C80.157,7.875 81,9.479 81,12.45 L81,18 L78,18 L78,12.997 C78,11.667 77.469,10.5 76.227,10.5 C74.719,10.5 74,11.521 74,13.197 L74,18 L71,18 L71,8 Z M66,18 L69,18 L69,8 L66,8 L66,18 Z M69.375,4.5 C69.375,5.536 68.536,6.375 67.5,6.375 C66.464,6.375 65.625,5.536 65.625,4.5 C65.625,3.464 66.464,2.625 67.5,2.625 C68.536,2.625 69.375,3.464 69.375,4.5 Z"
                        fill="currentColor">
                    </path>
                </g>
                <g>
                    <path d="M60,18 L57.2,18 L57.2,16.809 L57.17,16.809 C56.547,17.531 55.465,18.125 53.631,18.125 C51.131,18.125 48.978,16.244 48.978,13.011 C48.978,9.931 51.1,7.875 53.725,7.875 C55.35,7.875 56.359,8.453 56.97,9.191 L57,9.191 L57,3 L60,3 L60,18 Z M54.479,10.125 C52.764,10.125 51.8,11.348 51.8,12.974 C51.8,14.601 52.764,15.875 54.479,15.875 C56.196,15.875 57.2,14.634 57.2,12.974 C57.2,11.268 56.196,10.125 54.479,10.125 L54.479,10.125 Z"
                        fill="currentColor">
                    </path>
                    <path
                        d="M47.6611,16.3889 C46.9531,17.3059 45.4951,18.1249 43.1411,18.1249 C40.0001,18.1249 38.0001,16.0459 38.0001,12.7779 C38.0001,9.8749 39.8121,7.8749 43.2291,7.8749 C46.1801,7.8749 48.0001,9.8129 48.0001,13.2219 C48.0001,13.5629 47.9451,13.8999 47.9451,13.8999 L40.8311,13.8999 L40.8481,14.2089 C41.0451,15.0709 41.6961,16.1249 43.1901,16.1249 C44.4941,16.1249 45.3881,15.4239 45.7921,14.8749 L47.6611,16.3889 Z M45.1131,11.9999 C45.1331,10.9449 44.3591,9.8749 43.1391,9.8749 C41.6871,9.8749 40.9121,11.0089 40.8311,11.9999 L45.1131,11.9999 Z"
                        fill="currentColor">
                    </path>
                    <polygon
                        fill="currentColor"
                        points="38 8 34.5 8 31 12 31 3 28 3 28 18 31 18 31 13 34.699 18 38.241 18 34 12.533">
                    </polygon>
                    <path
                        d="M16,8 L18.827,8 L18.827,9.441 L18.858,9.441 C19.289,8.664 20.562,7.875 22.136,7.875 C25.157,7.875 26,9.792 26,12.45 L26,18 L23,18 L23,12.997 C23,11.525 22.469,10.5 21.227,10.5 C19.719,10.5 19,11.694 19,13.197 L19,18 L16,18 L16,8 Z"
                        fill="currentColor">
                    </path>
                    <path
                        d="M11,18 L14,18 L14,8 L11,8 L11,18 Z M12.501,6.3 C13.495,6.3 14.3,5.494 14.3,4.5 C14.3,3.506 13.495,2.7 12.501,2.7 C11.508,2.7 10.7,3.506 10.7,4.5 C10.7,5.494 11.508,6.3 12.501,6.3 Z"
                        fill="currentColor">
                    </path>
                    <polygon
                        fill="currentColor"
                        points="3 3 0 3 0 18 9 18 9 15 3 15">
                    </polygon>
                </g>
            </svg>
            <div className=' mx-[38%] shadow-lg bg-white flex flex-col p-10 rounded-lg'>
                <h1 className='font-semibold text-4xl'>Sign in</h1>
                <h2>Stay updated on your professional world</h2>
                <input
                    className='border-[1px]
                 border-black my-3 h-16 p-3 text-xl rounded-md'
                    type="email"
                    placeholder='Email'
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
                <div className='border-[1px] border-black my-3 h-16 flex justify-between p-3 text-xl rounded-md'>
                    <input
                        placeholder="Password"
                        type={visible ? `text` : `password`}
                        className='focus:outline-none w-full'
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                    <button className='font-semibold text-[#0a66c2]' onClick={() => setVisible(prev => !prev)}>show</button>
                </div>
                <a href='' className='font-semibold text-[#0a66c2] w-full items-start'>Forgot password?</a>
                <button
                    className='rounded-full bg-blue-700 text-white h-14 my-6'
                    onClick={login}
                    type='submit'
                >Sign in</button>
                <div className='flex mx-auto'>
                    <hr className='w-40 my-3' /><span className='mx-5'>or</span><hr className='w-40 my-3' />
                </div>
                <button
                    className='rounded-full border-2 h-14 my-6 grid grid-cols-6 py-3'
                    onClick={googleSignIn}
                >
                    <div className='font-medium col-span-5 ml-14 text-xl'>Sign in with Google</div>
                    <svg className=''
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="34px"
                        height="34px"
                        x="0"
                        y="0"
                        preserveAspectRatio="xMinYMin meet"
                        focusable="false">
                        <g>
                            <path
                                d="M12.1,5.8c1.6-0.1,3.1,0.5,4.3,1.6l2.6-2.7c-1.9-1.8-4.4-2.7-6.9-2.7c-3.8,0-7.2,2-9,5.3l3,2.4C7.1,7.2,9.5,5.7,12.1,5.8z"
                                style={{ fill: "rgb(233, 68, 53)" }}>
                            </path>
                            <path
                                d="M5.8,12c0-0.8,0.1-1.6,0.4-2.3l-3-2.4C2.4,8.7,2,10.4,2,12c0,1.6,0.4,3.3,1.1,4.7l3.1-2.4C5.9,13.6,5.8,12.8,5.8,12z"
                                style={{ fill: "rgb(248, 187, 21)" }}>
                            </path>
                            <path
                                d="M15.8,17.3c-1.2,0.6-2.5,1-3.8,0.9c-2.6,0-4.9-1.5-5.8-3.9l-3.1,2.4C4.9,20,8.3,22.1,12,22c2.5,0.1,4.9-0.8,6.8-2.3L15.8,17.3z"
                                style={{ fill: " rgb(52, 167, 81)" }}>
                            </path>
                            <path
                                d="M22,12c0-0.7-0.1-1.3-0.2-2H12v4h6.1v0.2c-0.3,1.3-1.1,2.4-2.2,3.1l3,2.4C21,17.7,22.1,14.9,22,12z"
                                style={{ fill: "rgb(84, 125, 190)" }}>
                            </path>
                        </g>
                    </svg>
                </button>
                <div
                    className='mx-auto'
                >New to LinkedIn ?
                    <a href=""
                        onClick={() => navigate('/register')}
                        className='font-semibold text-[#0a66c2]'
                    >&nbsp;Join now</a>
                </div>
            </div>
        </form>
    )
}

export default LoginComponent