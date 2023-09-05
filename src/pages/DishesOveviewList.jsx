import React from "react"
import Accordion from "@/components/Accordion"
import { Link } from "react-router-dom"
import Loader from "@/components/Loader"
import { motion } from "framer-motion"

const DishesOveviewList = ({ isLoading, dishesOverview }) => {

    return (
        <motion.div 
            className="p-4 flex flex-col w-full justify-center items-center gap-4"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {isLoading ? <Loader/> : dishesOverview.map((el, idx) => (
                <Accordion title={`${el.department} - ${el.group}`} key={idx}>
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
                            {el.dishes.map(dish => (
                                <tr key={dish.id}>
                                    <td>{dish.name}</td>
                                    <td>{(dish.cost * 100).toFixed(4).replace(/\.?0*$/, '')} %</td>
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