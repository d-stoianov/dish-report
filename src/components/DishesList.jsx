import React, { useState } from "react"
import { AiFillCaretDown, AiFillCaretLeft } from "react-icons/ai"

const DishesList = ({ dishes }) => { // TODO: rename -> DishOverviewItem
    return (
        <ul className="ml-6 mt-2">
            {dishes.map(dish => {
                const [isActive, setIsActive] = useState(false)
                return (
                    <li key={dish.id} className="my-4">
                        <div
                            className="flex items-center gap-2" 
                        >
                            <h1 
                                onClick={() => setIsActive(!isActive)}
                                className="text-xl font-semibold cursor-pointer"
                            >
                                {dish.name}
                            </h1>
                            <div>
                                {isActive ? <AiFillCaretDown /> : < AiFillCaretLeft />}
                            </div>
                        </div>
                        {isActive && 
                        <table>
                            <thead>
                                <tr>
                                    <td>City</td>
                                    <td>Price</td>
                                </tr>
                            </thead>
                            {dish.primeCosts.map(el => (
                                <tbody>
                                    <tr>
                                        <td>{el.place}</td>
                                        <td>{el.primeCost} %</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                        }
                    </li>
                )
            })}
        </ul>
    )
}

export default DishesList