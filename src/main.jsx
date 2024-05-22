import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Router as Routes } from './router'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <Routes />
        </Provider>
    </StrictMode>
)
