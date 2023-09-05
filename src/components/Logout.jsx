import React, { useState } from "react"
import DishReportService from "@/services/DishReportService"
import { KeyService } from "@/services/KeyService"

const Nav = ({ handleUserLogout }) => {
    const service = new DishReportService()
    const keyService = new KeyService()
    
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        setIsLoading(true)

        const keys = keyService.loadKeys()
        if (await service.logout(keys)) {
            setIsLoading(false)
            handleUserLogout()
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