import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('authToken')
  const userRole = localStorage.getItem('userRole')

  if (!token) {
    return <Navigate to='/sign-in' />
  }

  if (userRole === 'Educator') {
    return <Outlet />
  }
  console.log(`Allowed roles: ${allowedRoles}`)
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" /> // Redirect if role doesn't match
  }

  return <Outlet />
}

export default ProtectedRoute
