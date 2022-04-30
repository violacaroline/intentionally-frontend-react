import { useEffect, useState } from "react";

const Intention = () => {

  const [intentions, setIntentions] = useState([])

  const makeAPICall = async () => {
    try {
      const response = await fetch('https://cscloud7-193.lnu.se/intentionally/intention-service/api/v1/intentions', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])

  // useEffect(() => {
  //   fetch('https://cscloud7-193.lnu.se/intentionally/intention-service/api/v1/intentions')
  //   .then(response => {
  //     return response.json()
  //   })
  //   .then((data) => {
  //     console.log(data)
  //   })
  // }, [])

  return (
    <div className="intention">
      {intentions.map((intention) => (
        <div className="intention-description">
          <h2>{intention.mood}</h2>
          <h3>Description</h3>
          <p>{intention.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Intention;