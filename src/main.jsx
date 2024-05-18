import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Router as Routes } from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Routes />
    </StrictMode>
)
