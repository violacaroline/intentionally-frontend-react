import { useNavigate } from 'react-router-dom'

const MyPractice = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/practice')
  }
  return (  
    <div className="my-practice">
      <button onClick={goBack}>&#10006; Go Back </button>
      <h2>Not yet Implemented</h2>
      <h3>Coming Soon</h3>
      <p>Journaling Prompts</p>
      <p>My Mood</p>
      <p>Delete User</p>
    </div>
  )
}
 
export default MyPractice