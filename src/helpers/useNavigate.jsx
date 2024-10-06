import { useNavigate } from "react-router-dom";
import React from "react";

// let instance = useNavigate()

// export const navigate = (param) => {
//     instance(param)
// }

import React from 'react'

export default function UseNavigate() {
    const instance = useNavigate()


    return (
        <div>useNavigate</div>
    )
}
