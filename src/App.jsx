import React, { useEffect, useState } from "react"
import { Route, createRoutesFromElements, RouterProvider, createHashRouter } from "react-router-dom"
import DishReportService from "@/services/DishReportService"
import DishesOveviewList from "@/pages/DishesOveviewList"
import DishDetails from "@/pages/DishDetails"
import Login from "@/pages/Login"
import Logout from "@/components/Logout"
import ProtectedRoute from "@/utils/ProtectedRoute"

const App = () => {
    const service = new DishReportService
    const [dishesOverview, setDishesOverview] = useState([])
    const [dishesDetails, setDishesDetails] = useState([])

    const [user, setUser] = useState(null)

    const handleLogin = (userData) => {
        setUser(userData)
    }

    const handleLogout = () => {
        setUser(null)
    }

    useEffect(() => {
        service.getDishOverview().then(data => setDishesOverview(data))
        service.getDishDetails().then(data => setDishesDetails(data))
    }, [user])

    const router = createHashRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route
                    index
                    path="/"
                    element={<Login handleUserLogin={handleLogin} />} 
                />

                <Route path="/dish">
                    <Route
                        path="/dish"
                        element={
                            <ProtectedRoute redirectPath="/" user={user}>
                                <Logout handleUserLogout={handleLogout} />
                                <DishesOveviewList dishesOverview={dishesOverview} />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path=":id"
                        element={
                            <ProtectedRoute redirectPath="/" user={user}>
                                <Logout handleUserLogout={handleLogout} />
                                <DishDetails dishesDetails={dishesDetails} />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Route>
        )
    )

    return (
        <>  
            <RouterProvider router={router} />
        </>
    )
}

export default App