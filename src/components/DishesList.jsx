import React, { useState } from "react"
import { AiFillCaretDown, AiFillCaretLeft } from "react-icons/ai"

const DishesList = ({ dishes }) => { // TODO: rename -> DishOverviewItem
    return (
        <ul className="m-4">
            {dishes.map(dish => {
                const [isActive, setIsActive] = useState(true)
                return (
                    <li key={dish.id} className="my-4 flex justify-center">
                        <div className="w-[500px]">
                            <div
                                className="flex items-center gap-2" 
                            >
                                <h1 
                                    onClick={() => setIsActive(!isActive)}
                                    className="text-xl font-semibold cursor-pointer"
                                >
                                    {dish.name}
                                </h1>
                                <div className="cursor-pointer" onClick={() => setIsActive(!isActive)}>
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
                                <tbody>
                                    {dish.primeCosts.map(el => (
                                            <tr>
                                                <td>{el.place}</td>
                                                <td>{el.primeCost} %</td>
                                            </tr>
                                    ))}
                                </tbody>
                            </table>}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default DishesList