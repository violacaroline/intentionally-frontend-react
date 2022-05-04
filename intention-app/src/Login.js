const Login  = () => {
  return (  
    <div className="login">
      <form className="input-form" action="/login">
      <label htmlFor="username">Username</label>
      <input type="text" id="username" autoComplete="off" />
      <label htmlFor="password">Pass Phrase</label>
      <input type="password" id="password" autoComplete="off" />
      <input type="submit" value={ 'Submit  ' + String.fromCharCode("0x00002661") } className="submit-button"/>
      </form>
    </div>
  )
}
 
export default Login;