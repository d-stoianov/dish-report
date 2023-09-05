import React from "react"
import { Navigate } from "react-router-dom"
import { KeyService } from "@/services/KeyService"

const ProtectedRoute = ({ redirectPath, children }) => {
    const keyService = new KeyService()
    if (!keyService.hasKeys()) {
        return <Navigate to={redirectPath} replace />
    }

    return children
}

export default ProtectedRoute