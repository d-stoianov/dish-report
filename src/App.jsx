import React, { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import DishReportService from "@/services/DishReportService"
import { KeyService } from "@/services/KeyService"
import DishesOverviewList from "@/pages/DishesOverviewList"
import DishDetails from "@/pages/DishDetails"
import Login from "@/pages/Login"
import Logout from "@/components/Logout"
import ProtectedRoute from "@/utils/ProtectedRoute"
import { AnimatePresence } from "framer-motion"

const App = () => {
    const service = new DishReportService
    const keyService = new KeyService()
    const [dishesOverview, setDishesOverview] = useState([])

    const [selectedDish, setSelectedDish] = useState(null)

    function handleRowClick(id, department) {
        setSelectedDish(dishesOverview.getDishById(id))
        navigate(`/dish/${department}/${id}`)
    }

    const [user, setUser] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (userData) => {
        setUser(userData)
    }

    const handleLogout = () => {
        keyService.clearKeys()
        setUser(null)
        navigate("/")
    }

    useEffect(() => {
        const keys = keyService.loadKeys()
        if (user || !keys.allErrors()) {
            navigate("/dish")
            setIsLoading(true)
            service.getDishOverview(keys)
            .then(overviewData => {
                if (overviewData.hasData()) {
                    setDishesOverview(overviewData)
                } else {
                    handleLogout()
                }
            })
            .catch(error => {
                console.log(error)
                handleLogout()
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
    }, [user])

    return (
        <>  
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route index element={<Login handleUserLogin={handleLogin} />} />
                    <Route
                        path="/dish"
                        element={
                            <ProtectedRoute redirectPath="/">
                                <Logout handleUserLogout={handleLogout} />
                                <DishesOverviewList handleRowClick={handleRowClick} isLoading={isLoading} dishesOverview={dishesOverview.items} />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/dish/:department/:id"
                        element={
                            <ProtectedRoute redirectPath="/">
                                <Logout handleUserLogout={handleLogout} />
                                <DishDetails selectedDish={selectedDish} />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </>
    )
}

export default App