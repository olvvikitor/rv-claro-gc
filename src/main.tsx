import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { QueryProvider } from './providers/QueryProvider'
import Rotas from './routes/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <Rotas />
    </QueryProvider>
  </React.StrictMode>
)
