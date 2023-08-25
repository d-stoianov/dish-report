import React, { useEffect, useState } from "react"
import { Route, createRoutesFromElements, RouterProvider, createHashRouter } from "react-router-dom"
import DishReportService from "../DishReportService"
import DishesList from "./DishesList"
import DishDetails from "./DishDetails"

const Home = () => {
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
                    element={<DishesList dishesOverview={dishesOverview} />} 
                />
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    )
}

export default Home