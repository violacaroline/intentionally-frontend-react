const Intention = ({ intention }) => {
  return (  
    <div className="intention">
      <div className="intention-presentation">
        <h3>{'Your Intention ' + String.fromCharCode("0x00002661")}</h3>
        <p>{ intention.intention }</p>
      </div>
    </div>
  )
}
 
export default Intention