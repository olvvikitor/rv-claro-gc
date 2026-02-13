import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import DashboardPage from '../features/dashboard/pages/Dashboard'
import Layout from '../layout/Layout'
import Private from './privateRoutes'



const Rotas: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Private><Layout /></Private>    } >
        <Route index path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Rotas
