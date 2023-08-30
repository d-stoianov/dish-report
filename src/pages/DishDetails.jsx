import React from "react"
import Accordion from "@/components/Accordion"
import { Link, useParams } from "react-router-dom"
import { BiSolidChevronLeft } from "react-icons/bi"
import { motion } from "framer-motion"

const DishDetails = ({ dishesDetails }) => {
    const { id } = useParams()

    const title = dishesDetails.length && dishesDetails.find(dishDetails => {
        return dishDetails.id == id
    }).name

    const ingredients = dishesDetails.length && dishesDetails.find(dishDetails => {
        return dishDetails.id == id
    }).ingredients

    return (
        <motion.div 
            className="m-4"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div className="flex justify-center items-center gap-3">
                <Link to="/dish">
                    <BiSolidChevronLeft />
                </Link>
                <h1 className="text-xl font-semibold">
                    {title}
                </h1>
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
        </motion.div>
    )
}

export default DishDetails