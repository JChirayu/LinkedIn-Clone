import React, { useMemo, useState } from 'react'
import Home from '../Pages/Home'
import Navbar from '../Components/Common/Navbar/Navbar'
import { getCurrentUser } from '../api/FirestoreAPI'

function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
    getCurrentUser(setCurrentUser)
  }, [])
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Home currentUser={currentUser} />
    </div>
  )
}

export default HomeLayout