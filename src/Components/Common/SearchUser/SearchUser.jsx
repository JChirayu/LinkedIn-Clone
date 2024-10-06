import React from 'react'

function SearchUser({ setSearchInput }) {
    return (
        <div>
            <input type="text"
                placeholder='Search'
                className='bg-transparent ml-2 py-2 focus:outline-none'
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    )
}

export default SearchUser