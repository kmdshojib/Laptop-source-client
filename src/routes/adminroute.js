import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner';
import { AuthContext } from '../context/authcontext';

import useAdmin from '../Hooks/useAdmin';


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin,isAdminLoading] = useAdmin(user?.email)
    const location = useLocation()
    if ( isAdminLoading && !loading) {
        return <Spinner />
    }
    if (user && isAdmin) {
        return children
    }
    else {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
}


export default AdminRoute;