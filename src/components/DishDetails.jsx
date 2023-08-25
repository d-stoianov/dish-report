import React from "react"
import Accordion from "./Accordion"
import { Link, useParams } from "react-router-dom"
import { TiArrowBackOutline } from "react-icons/ti"

const DishDetails = ({ dishesDetails }) => {
    const { id } = useParams()

    const title = dishesDetails.length && dishesDetails.find(dishDetails => {
        return dishDetails.id == id
    }).name

    const ingredients = dishesDetails.length && dishesDetails.find(dishDetails => {
        return dishDetails.id == id
    }).ingredients

    return (
        <ul className="m-4">
            <div className="flex justify-center items-center gap-3">
                <h1 className="text-xl font-semibold">
                    {title}
                </h1>
                <Link to="/">
                    <TiArrowBackOutline />
                </Link>
            </div>
            {   
                ingredients && ingredients.map(ingredient => {
                    return (
                        <Accordion
                            title={ingredient.name}
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
    )
}

export default DishDetails