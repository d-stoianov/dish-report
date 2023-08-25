import React from "react"
import Accordion from "@/components/Accordion"
import { Link } from "react-router-dom"

const DishesOveviewList = ({ dishesOverview }) => {

    return (
        <ul className="m-4">
            {dishesOverview.map(dishOverview => {
                return (
                        <Accordion title={dishOverview.name} key={dishOverview.id}>
                            <Link to={dishOverview.id.toString()}>
                                <table
                                    className="cursor-pointer"
                                >
                                    <thead>
                                        <tr>
                                            <td>City</td>
                                            <td>Price</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dishOverview.primeCosts.map(el => (
                                            <tr key={el.place}>
                                                <td>{el.place}</td>
                                                <td>{el.primeCost} %</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Link>
                        </Accordion>
                    )}
                )
            }
        </ul>
    )
}

export default DishesOveviewList