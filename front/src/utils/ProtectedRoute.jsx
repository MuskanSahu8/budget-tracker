import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const {isAuthenticated,loading}=useAuth();

    console.log("Auth",isAuthenticated, "loading", loading )
    if(loading){
      return<>
      <div>
        <h1>loading...</h1>
      </div>
      </>
    }
    if(!isAuthenticated){
        return <Navigate to="/signin" replace/>
    }
  return <Outlet />
}

export default ProtectedRoute
