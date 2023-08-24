import React, { useState } from "react"
import Accordion from "./Accordion"

const DishesList = ({ dishesOverview, dishesDetails }) => { // TODO: rename -> DishOverviewItem

    return (
        <ul className="m-4">
            {dishesOverview.map(dishOverview => {
                const [showDetails, setShowDetails] = useState(false)
                return (
                        <Accordion title={dishOverview.name} key={dishOverview.id}>
                            {
                                !showDetails ?

                                <table
                                    className="cursor-pointer"
                                    onClick={() => setShowDetails(true)}
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

                                :

                                <ul>
                                    {   
                                        dishesDetails.find(dishDetails => {
                                            return dishDetails.id === dishOverview.id
                                        }).ingredients.map(ingredient => {
                                            return (
                                                <Accordion
                                                    title={ingredient.name}
                                                    defaultActive={false}
                                                    key={ingredient.name}
                                                >
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <td>City</td>
                                                                <td>Price</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {ingredient.costs.map(el => (
                                                                <tr key={el.place}>
                                                                    <td>{el.place}</td>
                                                                    <td>{el.cost} %</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </Accordion>
                                            )
                                        })
                                    }
                                </ul>
                            }
                        </Accordion>
                    )}
                )
            }
        </ul>
    )
}

export default DishesList