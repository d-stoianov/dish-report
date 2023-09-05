import React from "react"
import DishReportService from "@/services/DishReportService"
import { useNavigate } from "react-router-dom"

const Nav = ({ handleUserLogout }) => {
    const service = new DishReportService()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const key = localStorage.getItem("key")
        const res = await service.logout(key)
        if (res.ok) {
            localStorage.removeItem("key")
            handleUserLogout()
            navigate("/")
        }
    }

    return (
        <div className="flex justify-end items-center p-2 px-10">
                <h1 className="text-md cursor-pointer" 
                    onClick={handleLogout}
                >
                    Log out
                </h1>
        </div>
    )
}

export default Nav