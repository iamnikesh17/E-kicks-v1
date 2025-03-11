import React from 'react'
import {useSelector} from "react-redux"
import { Navigate } from 'react-router-dom';
const AdminRoutes = ({children}) => {
    const {userInfo}=useSelector((state)=>state.auth);
    
    // Check if user is admin, otherwise redirect to home page

  return userInfo && userInfo.role==="admin"?children:<Navigate to="/" />
}

export default AdminRoutes