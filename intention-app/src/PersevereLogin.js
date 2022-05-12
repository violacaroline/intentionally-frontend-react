import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuth from './hooks/useAuth'

const PersevereLogin = () => {
  const [loading, setLoading] = useState(true)
  const { auth } = useAuth()

  useEffect(() => {
    
  }, [])
  return (  );
}
 
export default PersevereLogin;