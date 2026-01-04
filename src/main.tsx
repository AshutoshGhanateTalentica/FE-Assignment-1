import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './store'
import './styles/global.css'
import { AnnouncerProvider } from './contexts/AnnouncerContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AnnouncerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AnnouncerProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
