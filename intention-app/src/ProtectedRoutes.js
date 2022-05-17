import { useLocation, Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const location = useLocation()
  const authenticatedUser = localStorage.getItem("user")

  return ( 
    authenticatedUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
   )
}
 
export default ProtectedRoutes