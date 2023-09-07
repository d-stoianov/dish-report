import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BiSolidChevronLeft } from "react-icons/bi"
import { motion } from "framer-motion"
import Loader from "@/components/Loader"
import DishReportService from "@/services/DishReportService"

const DishDetails = ({ selectedDish }) => {
    const { department, id } = useParams()
    const service = new DishReportService()
    const [dishDetails, setDishDetails] = useState([{}])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        service.getDishDetails(department, id)
        .then(res => setDishDetails(res))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))

    }, [])

    return (
        <motion.div 
            className="p-4 flex flex-col w-full justify-center items-center gap-4"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {
                isLoading ? <Loader /> : <>
                <div className="flex justify-center items-center gap-3">
                    <Link to="/dish">
                        <BiSolidChevronLeft />
                    </Link>
                    <h1 className="text-xl font-semibold">
                        {selectedDish ? selectedDish.name : ""}
                    </h1>
                </div>
                    <table className="w-full md:w-[70%]">
                        <thead>
                            <tr>
                                <td>Ingredient</td>
                                <td>Cost</td>
                            </tr>
                        </thead>
                        <tbody>
                            {dishDetails.map((ingredient, idx) => (
                                <tr key={idx}>
                                    <td>{ingredient.name}</td>
                                    <td>?</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }
        </motion.div>
    )
}

export default DishDetails