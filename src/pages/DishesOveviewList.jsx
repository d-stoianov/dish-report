import React from "react"
import Accordion from "@/components/Accordion"
import { Link } from "react-router-dom"
import Loader from "@/components/Loader"
import { motion } from "framer-motion"

const DishesOveviewList = ({ isLoading, departments, dishesOverview }) => {

    return (
        <motion.div 
            className="m-4"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {isLoading ? <Loader/> : departments.map(department => (
                <Accordion title={`${department} - ${dishesOverview[0]?.RestorauntGroup}`} key={"1"}>
                    <table
                        className="cursor-pointer"
                    >
                        <thead>
                            <tr>
                                <td>Dish</td>
                                <td>Prime Cost</td>
                            </tr>
                        </thead>
                        <tbody>
                            {dishesOverview.map(dish => (
                                <tr key={dish.DishId}>
                                    <td>{dish.DishName}</td>
                                    <td>{(dish["ProductCostBase.Percent"] * 100).toFixed(4).replace(/\.?0*$/, '')} %</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Accordion>
            ))}
        </motion.div>
    )
}

export default DishesOveviewList