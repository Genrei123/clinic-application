import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorModal from './components/ErrorModal.tsx'
import SuccessModal from './components/SuccessModal.tsx'
import Slider from './components/Slider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Slider />
  </StrictMode>,
)
