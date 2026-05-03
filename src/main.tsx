import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "@/context/ContextProvider.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	  <AuthProvider>
		  <BrowserRouter>
			  <App />
			  <Toaster/>
		  </BrowserRouter>
	  </AuthProvider>
  </StrictMode>,
)
