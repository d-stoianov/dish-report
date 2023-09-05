import React, { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import DishReportService from "@/services/DishReportService"
import DishesOveviewList from "@/pages/DishesOveviewList"
import DishDetails from "@/pages/DishDetails"
import Login from "@/pages/Login"
import Logout from "@/components/Logout"
import ProtectedRoute from "@/utils/ProtectedRoute"
import { AnimatePresence } from "framer-motion"

const App = () => {
    const service = new DishReportService
    const [departments, setDepartments] = useState([])
    const [dishesOverview, setDishesOverview] = useState([])
    // const [dishesDetails, setDishesDetails] = useState([])

    const [user, setUser] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = (userData) => {
        setUser(userData)
    }

    const handleLogout = () => {
        setUser(null)
    }

    useEffect(() => {
        const key = localStorage.getItem("key")

        if (user || key) {
            service.getDishOverview(key).then(data => setDishesOverview(data))
            service.getDepartments(key).then(data => setDepartments(data))
            navigate("/dish")
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
                                <DishesOveviewList departments={departments} dishesOverview={dishesOverview} />
                            </ProtectedRoute>
                        } 
                    />
                    {/* <Route 
                        path="/dish/:id"
                        element={
                            <ProtectedRoute redirectPath="/">
                                <Logout handleUserLogout={handleLogout} />
                                <DishDetails dishesDetails={dishesDetails} />
                            </ProtectedRoute>
                        }
                    /> */}
                </Routes>
            </AnimatePresence>
        </>
    )
}

export default App