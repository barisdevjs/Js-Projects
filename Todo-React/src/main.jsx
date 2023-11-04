import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ShoppingCartProvider } from './Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ShoppingCartProvider>
        <App />
    </ShoppingCartProvider>
)
