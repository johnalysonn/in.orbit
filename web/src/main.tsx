import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrimeReactProvider } from 'primereact/api'
import Tailwind from 'primereact/passthrough/tailwind'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
        <App />
      </PrimeReactProvider>
    </StrictMode>
  </QueryClientProvider>
)
