import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = () =>{
        authService.logout()
        .then(()=>{
            dispatch(logout());
        })
    }
  return (
    <button onClick={()=>logoutHandler()} className='inline-block py-2 px-6 duration-200 hover:bg-blue-100 rounded-full'>LogOut</button>
  )
}

export default LogoutBtn
