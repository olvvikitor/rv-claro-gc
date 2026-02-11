import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../styles/index.css'
import LoginPage from '../features/Auth/pages/LoginPage'

const Rotas: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default Rotas
