
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import MainRoutes from './Routes/MainRoutes.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <MainRoutes/>
  </BrowserRouter>
)