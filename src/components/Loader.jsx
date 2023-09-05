import React from "react"
import "../styles/Loader.css"

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <span className="loader"></span>
            Loading...
        </div>
    )
}

export default Loader