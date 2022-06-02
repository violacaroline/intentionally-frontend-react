import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
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
      const response = await axios.post('http://localhost:8086/api/v1/login', 
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      
      const persistUser = {
        username: response.data.username,
        userId: response.data.user_id,
        accessToken: response.data.access_token
      }

      localStorage.setItem('user', JSON.stringify(persistUser))
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