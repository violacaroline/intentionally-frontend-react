import { useState } from 'react'
import axios from './api/axios'
import useAuth from './hooks/useAuth'
import Intention from './Intention'

const PracticeNow = () => {
  const { auth } = useAuth()
  const [intention, setIntention] = useState('')
  const [success, setSuccess] = useState(false)

  const fetchIntention = async (mood) => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/intentions', {
        headers: {
          'Content-Type': 'application/json',
          authorization: auth.accessToken
        }
      })

      const intentions = Array.from(response.data)

      const moodIntentions = intentions.filter(intention => intention.mood === mood)

      const intention = moodIntentions[Math.floor(Math.random() * moodIntentions.length)]
      setIntention(intention)
      setSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="practice-now">
      {success ?
        <Intention intention={intention} />
        :
        <>
          <div className="practice-now-img"></div>
          <div className="practice-now-text">
            <h1>{'Tell me, how are you feeling?'}</h1>
            <button onClick={() => {fetchIntention('joy')}}className="feeling">Joy</button>
            <button onClick={() => {fetchIntention('fear')}} className="feeling">Fear</button>
            <button onClick={() => {fetchIntention('anger')}} className="feeling">Anger</button>
            <button onClick={() => {fetchIntention('sadness')}} className="feeling">Sadness</button>
            <button onClick={() => {fetchIntention('disgust')}} className="feeling">Disgust</button>
          </div>
        </>
      }
    </div>
  )
}

export default PracticeNow;