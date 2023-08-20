import { createRoot } from 'react-dom/client'
import React from "react"
import Home from "./components/Home"

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(<Home />);