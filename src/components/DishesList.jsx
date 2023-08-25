import React, { useState } from "react"
import Accordion from "./Accordion"

const DishesList = ({ dishesOverview }) => { // TODO: rename -> DishOverviewItem

    return (
        <ul className="m-4">
            {dishesOverview.map(dishOverview => {
                return (
                        <Accordion title={dishOverview.name} key={dishOverview.id}>
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
                        </Accordion>
                    )}
                )
            }
        </ul>
    )
}

export default DishesList