import React, { useState } from "react"
import { AiFillCaretDown, AiFillCaretLeft } from "react-icons/ai"

const DishesList = ({ dishes }) => { // TODO: rename -> DishOverviewItem
    return (
        <ul>
            {dishes.map(dish => {
                const [isActive, setIsActive] = useState(false)
                return (
                    <li key={dish.id}>   
                        <div className="flex items-center gap-2">
                            <h1 className="cursor-pointer" onClick={() => setIsActive(!isActive)}>
                                {dish.name}
                            </h1>
                            {isActive ? <AiFillCaretDown /> : < AiFillCaretLeft />}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default DishesList