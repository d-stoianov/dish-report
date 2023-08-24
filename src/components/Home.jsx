import React, { useEffect, useState } from "react"
import DishReportService from "../DishReportService"
import DishesList from "./DishesList"

const Home = () => {
    const service = new DishReportService
    const [dishesOverview, setDishesOverview] = useState([])
    const [dishesDetails, setDishesDetails] = useState([])
    useEffect(() => {
        service.getDishOverview().then(data => setDishesOverview(data))
        service.getDishDetails().then(data => setDishesDetails(data))
    }, [])
    return (
        <div>
            <DishesList dishesOverview={dishesOverview} dishesDetails={dishesDetails} />
        </div>
    )
}

export default Home