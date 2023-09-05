import React from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ redirectPath, children }) => {
    const key = localStorage.getItem("key")
    if (!key) {
        return <Navigate to={redirectPath} replace />
    }

    return children
}

export default ProtectedRoute