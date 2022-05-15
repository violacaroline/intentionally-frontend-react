import { useNavigate } from 'react-router-dom'

const Intention = ({ intention }) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/practice')
  }

  return (  
    <div className="intention">
      <button onClick={goBack}>&#10006;  Thank you </button>
      <div className="intention-presentation">
        <h3>{'Your Intention ' + String.fromCharCode("0x00002661")}</h3>
        <p>{ intention.intention }</p>
      </div>
    </div>
  )
}
 
export default Intention