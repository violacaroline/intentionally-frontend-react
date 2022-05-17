import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'


const Login = () => {
  const { setAuth } = useAuth()
  const errRef = useRef()
  const navigate = useNavigate()

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
      const response = await axios.post('http://localhost:8086/api/v1/login', // AXIOS VS FETCH - AXIOS WILL THROW AN ERROR IF THERE WAS ONE, DONT NEED TO CHECK
        JSON.stringify({ username, password }), // AXIOS VS FETCH, NOT NECESSARY TO TAKE THE RESPONSE AND CONVERT IT TO JSON, AXIOS WILL DO IT
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true // LOOK INTO THIS
        }
      );
      console.log('The Response from login: ', JSON.stringify(response?.data))
      const user = {
        username: response.data.username,
        userId: response.data.user_id,
      }

      localStorage.setItem('user', JSON.stringify(user))
      setAuth({ })
      setUsername('')
      setPassword('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 401) {
        setErrMsg('Invalid Credentials')
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
          success ? ( navigate('/practice')
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