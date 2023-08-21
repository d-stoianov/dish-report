import React, { useEffect, useState } from "react"
import DishReportService from "../DishReportService"
import DishesList from "./DishesList"

const Home = () => {
    const service = new DishReportService
    const [dishes, setDishes] = useState([])
    useEffect(() => {
        service.getDishOverview().then(data => setDishes(data))
    }, [])
    return (
        <div>
            <DishesList dishes={dishes} />
        </div>
    )
}

export default Home