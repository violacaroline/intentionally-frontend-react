import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import validator from 'validator'
// import { Link } from 'react-router-dom'

const nameRegex = /^[A-Za-z][A-Za-z0-9_]{2,256}$/
const passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{10,256}$/

const Register = () => {
  const navigate = useNavigate()
  const userRef = useRef()
  const errorRef = useRef()


  const [username, setUsername] = useState('')
  const [validName, setValidUsername] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)

  const [matchPassword, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [validFirstName, setValidFirstName] = useState(false)

  const [lastName, setLastName] = useState('')
  const [validLastName, setValidLastName] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const [admin, setAdmin] = useState(false)
  const [adminPassPhrase, setAdminPassPhrase] = useState('')

  const validAdminPassPhrase = 'iamadmin'

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setValidUsername(nameRegex.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(passwordRegex.test(password))
    setValidMatch(password === matchPassword)
  }, [password, matchPassword])

  useEffect(() => {
    setValidFirstName(nameRegex.test(firstName))
  }, [firstName])

  useEffect(() => {
    setValidLastName(nameRegex.test(lastName))
  }, [lastName])

  useEffect(() => {
    setValidEmail(validator.isEmail(email))
  }, [email])

  // VALIDATE ADMIN?
  useEffect(() => {
    setAdminPassPhrase(adminPassPhrase)
  }, [adminPassPhrase])


  useEffect(() => {
    setErrMsg('')
  }, [username, password, matchPassword, firstName, lastName, email, admin])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validUsername = nameRegex.test(username)
    const validPassword = passwordRegex.test(password)
    const validEmail = validator.isEmail(email)
    let isValidAdmin = true
    if (admin) {
      isValidAdmin = adminPassPhrase === validAdminPassPhrase
    }

    if (!validUsername || !validPassword) {
      setErrMsg("Invalid Username or Pass Phrase")
      return
    } else if (!validEmail) {
      setErrMsg("Invalid Email")
      return
    } else if (!(password === matchPassword)) {
      setErrMsg("Pass Phrase do not match")
      return
    } else if (!isValidAdmin) {
      setErrMsg("Invalid Admin Pass Phrase")
      return
    }

    try {
      await axios.post('http://localhost:8086/api/v1/register',
        JSON.stringify({ username, password, firstName, lastName, email, admin }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
          // withCredentials: true  // <-- THIS WILL NEED TO BE LOOKED INTO DUE TO CORS
        }
      )
      setSuccess(true)

      setUsername('')
      setPassword('')
      setMatchPwd('')
      setFirstName('')
      setLastName('')
      setEmail('')
      setAdmin('')
      setAdminPassPhrase('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response. No internet?')
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken')
      } else {
        setErrMsg('Registration Failed')
      }
      errorRef.current.focus()
    }
  }

  return (

    <section className="register">
      <form className="input-form-register" onSubmit={handleSubmit}>
        {
          success ? (  navigate('/login')
            // <section className="success-register-login">
            //   <h3 >You are Registered</h3>
            //   <p>
            //     <Link className="link-login" to="/login">{'Login ' + String.fromCharCode("0x00002661")}</Link>
            //   </p>
            // </section >
          ) : (
            <>
              <p ref={errorRef} style={{ color: "red", size: "10px" }} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                autoFocus="on"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
                aria-invalid={validFirstName ? "false" : "true"}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
                aria-invalid={validLastName ? "false" : "true"}
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
              />
              <label htmlFor="password">Pass Phrase</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
              />
              <label htmlFor="confirmPassword">Confirm Pass Phrase</label>
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
              />
              <label htmlFor="admin">Are you an admin?
              <input
                type="checkbox"
                className="register-checkbox"
                id="admin"
                onChange={(e) => setAdmin(e.target.checked)}
                value={admin}
              />
              </label>
              
              {admin ?
                <>
                  <label htmlFor="admin-password">Admin Pass Phrase</label>
                  <input
                    type="password"
                    id="admin-password"
                    onChange={(e) => setAdminPassPhrase(e.target.value)}
                    required
                  />
                </>
                : <>
                  <p></p>
                </>
              }
              <input type="submit" value={'Submit  ' + String.fromCharCode("0x00002661")} className="submit-button" />
            </>
          )}
      </form>
    </section >
  )
}

export default Register