import React, { useEffect, useState } from "react"
import { Route, createRoutesFromElements, RouterProvider, createHashRouter } from "react-router-dom"
import DishReportService from "@/services/DishReportService"
import DishesOveviewList from "@/pages/DishesOveviewList"
import DishDetails from "@/pages/DishDetails"

const App = () => {
    const service = new DishReportService
    const [dishesOverview, setDishesOverview] = useState([])
    const [dishesDetails, setDishesDetails] = useState([])
    useEffect(() => {
        service.getDishOverview().then(data => setDishesOverview(data))
        service.getDishDetails().then(data => setDishesDetails(data))
    }, [])

    const router = createHashRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route
                    index
                    element={<DishesOveviewList dishesOverview={dishesOverview} />} 
                />
                <Route 
                    path=":id"
                    element={<DishDetails dishesDetails={dishesDetails} />}
                />
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    )
}

export default App