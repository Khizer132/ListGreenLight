import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './redux/store.js'
import { StepNavigationProvider } from './components/context/StepNavigationContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StepNavigationProvider>
          <App />
          <Toaster position="top-right" />
        </StepNavigationProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
