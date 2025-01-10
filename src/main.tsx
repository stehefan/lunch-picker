import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useAtomsDebugValue } from 'jotai-devtools'

// eslint-disable-next-line react-refresh/only-export-components
const DebugAtoms = () => {
  useAtomsDebugValue()
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DebugAtoms />
    <App />
  </StrictMode>,
)
