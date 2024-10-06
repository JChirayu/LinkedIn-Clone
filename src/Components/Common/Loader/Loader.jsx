import React from 'react'
import { Space, Spin } from 'antd'

function Loader() {
    return (
        <div className='h-[100vh] flex items-center justify-center'>
            <Space size='middle' />
            <Spin size='large' />
        </div>
    )
}

export default Loader