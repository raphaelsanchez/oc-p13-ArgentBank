import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Router as Routes } from './router'
import { persistor, store } from './store'

/**
 * Renders the main application component.
 * @returns {JSX.Element} The rendered main application component.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes />
            </PersistGate>
        </Provider>
    </StrictMode>
)
