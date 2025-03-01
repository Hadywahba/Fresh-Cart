import React from 'react'
import { Navigate } from 'react-router-dom'
import Home from '../../Home/Home'

export default function Auth(props) {
    if(localStorage.getItem("getToken")){
        return <Navigate to={'/'}  />
    }
    else{
        return props.children
    }

}
