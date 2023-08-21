import React, { useState } from "react"
import { AiFillCaretDown, AiFillCaretLeft } from "react-icons/ai"

const DishesList = ({ dishes }) => { // TODO: rename -> DishOverviewItem
    return (
        <ul className="ml-6 mt-2">
            {dishes.map(dish => {
                const [isActive, setIsActive] = useState(false)
                return (
                    <li key={dish.id}>
                        <div
                            className="flex items-center gap-2 cursor-pointer" 
                            onClick={() => setIsActive(!isActive)}
                        >
                            <h1 
                                className="text-xl font-bold">
                                {dish.name}
                            </h1>
                            {isActive ? <AiFillCaretDown /> : < AiFillCaretLeft />}
                        </div>
                        {isActive && 
                            dish.primeCosts.map(el => (
                                <table>
                                    <tr className="text-md">
                                        <td className="w-28">{el.place}</td>
                                        <td className="w-28">{el.primeCost}%</td>
                                    </tr>
                                </table>
                            ))
                        }
                    </li>
                )
            })}
        </ul>
    )
}

export default DishesList