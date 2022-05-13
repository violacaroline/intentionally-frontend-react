import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from './hooks/useAuth'

const ProtectedRoutes = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return ( 
    auth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
   )
}
 
export default ProtectedRoutes