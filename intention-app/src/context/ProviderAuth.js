import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const ProviderAuth = ({ children }) => {
  const [auth, setAuth] = useState(undefined)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext