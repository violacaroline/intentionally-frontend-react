import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from './context/ProviderAuth.js'
import axios from './api/axios'
import { Link } from 'react-router-dom'


const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const errRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)


  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/login', // AXIOS VS FETCH - AXIOS WILL THROW AN ERROR IF THERE WAS ONE, DONT NEED TO CHECK
        JSON.stringify({ username, password }), // AXIOS VS FETCH, NOT NECESSARY TO TAKE THE RESPONSE AND CONVERT IT TO JSON, AXIOS WILL DO IT
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true // LOOK INTO THIS
        }
      );
      console.log('The Response from login: ', JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken

      setAuth({ username, password, accessToken })
      setUsername('')
      setPassword('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized, invalid credentials')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <div className="login">
      <form className="input-form" data-testid='form' onSubmit={ handleSubmit }>
        {
          success ? (
            <section className="success-register-login">
              <h3 >You are Logged In</h3>
              <p>
                <Link className="link-login" to="/practice">{'Practice  ' + String.fromCharCode("0x00002661")} </Link>
              </p>
            </section >
          ) : (
            <>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}  style={{ color: "red", size: "10px" }} aria-live="assertive">{errMsg}</p>
              <label htmlFor="username">Username</label>
              <input type="text"
                id="username"
                autoComplete="off"
                autoFocus="on"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <label htmlFor="password">Pass Phrase</label>
              <input type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <input type="submit" value={'Submit  ' + String.fromCharCode("0x00002661")} className="submit-button" />
            </>
          )}
      </form>
    </div>
  )
}

export default Login