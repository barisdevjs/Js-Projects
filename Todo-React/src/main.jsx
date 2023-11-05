import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TaskProvider } from './Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <TaskProvider>
        <App />
    </TaskProvider>
)
