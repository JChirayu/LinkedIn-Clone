import React from 'react'
import PostStatus from './Common/PostStatus/PostStatus'

function HomeComponent({ currentUser }) {

    return (
        <div>
            <PostStatus currentUser={currentUser} />
        </div>
    )
}

export default HomeComponent