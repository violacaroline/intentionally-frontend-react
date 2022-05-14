import { useState } from "react"
import axios from "./api/axios"
import useAuth from "./hooks/useAuth"
import Intention from "./Intention"

const PracticeNow = () => {
  const { auth } = useAuth()
  const [intention, setIntention] = useState('')
  const [success, setSuccess] = useState(false)

  const fetchJoyIntention = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/intentions', {
        headers: {
          'Content-Type': 'application/json',
          authorization: auth.accessToken
        }
      })

      const intentions = Array.from(response.data)

      const joyIntentions = intentions.filter(intention => intention.mood === 'joy')

      const joyIntention = joyIntentions[Math.floor(Math.random() * joyIntentions.length)]
      console.log(joyIntention)
      setIntention(joyIntention)
      setSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFearIntention = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/intentions', {
        headers: {
          'Content-Type': 'application/json',
          authorization: auth.accessToken
        }
      })

      const intentions = Array.from(response.data)

      const fearIntentions = intentions.filter(intention => intention.mood === 'fear')

      const fearIntention = fearIntentions[Math.floor(Math.random() * fearIntentions.length)]
      console.log(fearIntention)
      setIntention(fearIntention)
      setSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAngerIntention = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/intentions', {
        headers: {
          'Content-Type': 'application/json',
          authorization: auth.accessToken
        }
      })

      const intentions = Array.from(response.data)

      const angerIntentions = intentions.filter(intention => intention.mood === 'anger')

      const angerIntention = angerIntentions[Math.floor(Math.random() * angerIntentions.length)]
      console.log(angerIntention)
      setIntention(angerIntention)
      setSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSadnessIntention = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/intentions', {
        headers: {
          'Content-Type': 'application/json',
          authorization: auth.accessToken
        }
      })

      const intentions = Array.from(response.data)

      const sadnessIntentions = intentions.filter(intention => intention.mood === 'sadness')

      const sadnessIntention = sadnessIntentions[Math.floor(Math.random() * sadnessIntentions.length)]
      console.log(sadnessIntention)
      setIntention(sadnessIntention)
      setSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDisgustIntention = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/intentions', {
        headers: {
          'Content-Type': 'application/json',
          authorization: auth.accessToken
        }
      })

      const intentions = Array.from(response.data)

      const disgustIntentions = intentions.filter(intention => intention.mood === 'disgust')

      const disgustIntention = disgustIntentions[Math.floor(Math.random() * disgustIntentions.length)]
      console.log(disgustIntention)
      setIntention(disgustIntention)
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
            <button onClick={fetchJoyIntention} className="feeling">Joy</button>
            <button onClick={fetchFearIntention} className="feeling">Fear</button>
            <button onClick={fetchAngerIntention} className="feeling">Anger</button>
            <button onClick={fetchSadnessIntention} className="feeling">Sadness</button>
            <button onClick={fetchDisgustIntention} className="feeling">Disgust</button>
          </div>
        </>
      }
    </div>
  )
}

export default PracticeNow;