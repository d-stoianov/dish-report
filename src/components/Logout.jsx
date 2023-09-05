import React, { useState } from "react"
import DishReportService from "@/services/DishReportService"
import { useNavigate } from "react-router-dom"

const Nav = ({ handleUserLogout }) => {
    const service = new DishReportService()
    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        setIsLoading(true)

        const key = localStorage.getItem("key")
        const res = await service.logout(key)
        if (res.ok) {
            setIsLoading(false)
            localStorage.removeItem("key")
            handleUserLogout()
            navigate("/")
        }
    }

    return (
        <div className="flex justify-end items-center p-2 px-10">
                <button 
                    className="text-md cursor-pointer" 
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    Log out
                </button>
        </div>
    )
}

export default Nav