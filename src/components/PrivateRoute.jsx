import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('auth')
      if (authData) {
        const { timestamp } = JSON.parse(authData)
        const now = Date.now()
        const twelveHours = 12 * 60 * 60 * 1000

        if (now - timestamp < twelveHours) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('auth')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoute

