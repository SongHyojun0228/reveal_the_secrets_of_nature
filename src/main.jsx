import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './ThemeContext'
import { BrowserRouter } from 'react-router-dom' // BrowserRouter import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* App 컴포넌트를 BrowserRouter로 감쌉니다. */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
