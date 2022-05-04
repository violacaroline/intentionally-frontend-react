import { useState, useEffect, useRef } from 'react'
import axios from './api/axios'
import validator from 'validator'

const nameRegex = /^[0-9][a-zA-Z]{2,256}$/
const passwordRegex = /^[0-9][a-zA-Z]{10,256}$/

const Register = () => {
  const userRef = useRef()
  const errorRef = useState()

  const [username, setUserName] = useState('')
  const [validName, setValidUserName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [validFirstName, setValidFirstName] = useState(false)
  const [firstNameFocus, setFirstNameFocus] = useState(false)

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false)
  const [lastNameFocus, setLastNameFocus] = useState(false)

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidUserName(nameRegex.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(passwordRegex.test(password))
    setValidMatch(password === matchPwd)
  }, [password, matchPwd])

  useEffect(() => {
    setValidFirstName(nameRegex.test(firstName))
  }, [firstName])

  useEffect(() => {
    setValidLastName(nameRegex.test(lastName))
  }, [lastName])

  useEffect(() => {
    setValidEmail(validator.isEmail(email))
  }, [email])


  useEffect(() => {
    setErrMsg('')
  }, [username, password, matchPwd, firstName, lastName, email])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validUsername = nameRegex.test(username)
    const validPassword = passwordRegex.test(password)
    if (!validUsername || !validPassword) {
      setErrMsg("Invalid Entry")
      return
    }
    try {
      const response = await axios.post('/register',
        JSON.stringify({ username, password, firstName, lastName, email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken)
      console.log(JSON.stringify(response))
      setSuccess(true)
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUserName('')
      setPassword('')
      setMatchPwd('')
      setFirstName('')
      setLastName('')
      setEmail('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
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
      <form className="input-form" onSubmit={handleSubmit}>
        <p ref={errorRef} style={{color: "red"}} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          autoComplete="off"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
          aria-invalid={validFirstName ? "false" : "true"}
          onFocus={() => setFirstNameFocus(true)}
          onBlur={() => setFirstNameFocus(false)}
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
          onFocus={() => setLastNameFocus(true)}
          onBlur={() => setLastNameFocus(false)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
          required
          aria-invalid={validName ? "false" : "true"}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <label htmlFor="password">Pass Phrase</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          aria-invalid={validPassword ? "false" : "true"}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <label htmlFor="confirmPassword">Confirm Pass Phrase</label>
        <input
          type="password"
          id="confirmPassword"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
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
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <label htmlFor="admin">Are you an admin?</label>
        <input type="checkbox" className="register-checkbox" id="admin" />
        <input type="submit" value={'Submit  ' + String.fromCharCode("0x00002661")} className="submit-button" />
      </form>
    </section>
  )
}

export default Register;