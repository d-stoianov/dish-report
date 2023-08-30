import React, { useState } from "react"
import DishReportService from "@/services/DishReportService"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Login = ({ handleUserLogin }) => {
    const service = new DishReportService()
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        const res = await service.login(username, password)
        if (res.httpCode === 200) {
            handleUserLogin({
                username: username,
                password: password
            })
            navigate("/dish")
        }
    }

    return (
        <motion.div 
            className="flex flex-col items-center justify-center px-8 py-32 md:p-0 md:h-screen"
            
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div className="w-full md:w-[50%] bg-white rounded-lg shadow">
                <div className="p-8 space-y-6">
                    <h1 className="text-xl font-bold text-gray-900">
                        Sign in
                    </h1>
                    <form 
                        onSubmit={handleLogin}
                        className="space-y-6"
                    >
                        <div>
                            <label 
                                htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Username
                            </label>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                required={true}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" 
                            />
                        </div>
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                required={true}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full text-black bg-primary-600 text-sm px-5 py-2.5 text-center"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default Login