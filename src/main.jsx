import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SidebarProvider } from './context/sidebarContext.jsx'
import 'primereact/resources/themes/lara-light-cyan/theme.css';

import { PrimeReactProvider } from "primereact/api"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarProvider>
    <PrimeReactProvider value={{ unstyled: false }}>
      <App />
    </PrimeReactProvider>
    </SidebarProvider>
  </StrictMode>,
)
