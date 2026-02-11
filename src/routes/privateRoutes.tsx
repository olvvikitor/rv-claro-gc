import React from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateProps {
  children: React.ReactNode
}

const Private: React.FC<PrivateProps> = ({ children }) => {
  const accessTokenIntegrado = localStorage.getItem('tokenRVGC')

  if (!accessTokenIntegrado) {
    return <Navigate to="/login" />
  }

  return <>{children} </>
}

export default Private