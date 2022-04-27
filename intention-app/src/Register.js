const Register = () => {
  return (  
    <div className="register">
      <form className="input-form" action="/register">
      <label htmlFor="firstName">First Name</label>
      <input type="text" id="firstName" />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" id="lastName" />
      <label htmlFor="username">Username</label>
      <input type="text" id="username" />
      <label htmlFor="password">Pass Phrase</label>
      <input type="password" id="password" />
      <label htmlFor="email">Email</label>
      <input type="text" id="email" />
      <label htmlFor="admin">Are you an admin?</label>
      <input type="checkbox" className="register-checkbox" id="admin" />
      <input type="submit" value={ 'Submit  ' + String.fromCharCode("0x00002661") } className="submit-button"/>
      </form>
    </div>
  )
}
 
export default Register;