import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from 'sonner'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster id='global' position='bottom-center' theme='dark' expand />
    <Toaster id='confirm' position='top-center' theme='dark' />
  </StrictMode>
)
