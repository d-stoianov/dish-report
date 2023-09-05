import React, { useState } from "react"
import { AiFillCaretDown, AiFillCaretLeft } from "react-icons/ai"

const Accordion = ({title, children, defaultActive}) => {
    const [isActive, setIsActive] = useState(defaultActive ?? true)
    return (
        <li className="my-4 flex justify-center">
            <div className="w-full md:w-[48rem]">
                <div className="flex items-center gap-2">
                    <h1 
                        onClick={() => setIsActive(!isActive)}
                        className="text-xl font-semibold cursor-pointer"
                    >
                        {title}
                    </h1>
                    <div className="cursor-pointer" onClick={() => setIsActive(!isActive)}>
                        {isActive ? <AiFillCaretDown /> : < AiFillCaretLeft />}
                    </div>
                </div>
                {
                isActive && children
                }
            </div>
        </li>
    )
}

export default Accordion