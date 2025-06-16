import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
function PrivateRoute({allowedroles}) {
    const{currentuser,loading}=useAuth()
    if(loading){
        return <div className="text-center p-4">Loading user data...</div>;
    }

    if (!currentuser) {
        // If no user is logged in, redirect to the login page
        console.warn("User not authenticated. Redirecting to login.");
        return <Navigate to="/login" replace />; // 'replace' prevents adding to history stack
    }
     if (allowedroles && !allowedroles.includes(currentuser.role)) {
        // If the user's role is not in the allowedRoles array, redirect them
        console.warn(`User with role "${currentuser.role}" attempted to access restricted content. Redirecting.`);
        
        // Decide where to redirect unauthorized users:
        // - To their appropriate dashboard:
        if (currentuser.role === 'employer') {
            return <Navigate to="/employer" replace />;
        } else if (currentuser.role === 'jobseeker') {
            return <Navigate to="/" replace />;
        }else if(currentuser.role==='admin'){
            return<Navigate to="/admin" replace/>
        }
        // - Or to a generic unauthorized page, or even the home page
        return <Navigate to="/" replace />;
    }

    // 4. If authenticated and authorized, render the child routes/components
    return <Outlet />;

}

export default PrivateRoute
