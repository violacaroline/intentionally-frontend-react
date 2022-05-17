import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ProviderAuth } from './context/ProviderAuth'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderAuth>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ProviderAuth>
    </BrowserRouter>
  </React.StrictMode>
)

