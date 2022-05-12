import { useContext } from 'react'
import AuthContext from '../context/ProviderAuth'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth