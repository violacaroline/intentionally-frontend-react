import { useState } from 'react'

const Mood = () => {
  const [moods] = useState([
    { mood: 'Joy', description: 'Feelings of bliss, gratitude, passion, calm and fulfillness.', learning: 'Something needs to be celebrated & appreciated.' },
    { mood: 'Fear', description: 'Feelings of concern, dread, panic and worry.', learning: 'Something needs to be learned, invites full attention and presence.' },
    { mood: 'Sadness', description: 'Feelings of remorse, agony, despair, heartbreak and helplessness.', learning: 'Something meaningful is going away, a person - a dream.' },
    { mood: 'Disgust', description: 'Feelings of betrayal, jealousy, humiliation and inadequacy.', learning: 'Something has caused a usually unrealistic emotional expectation to not be met.' },
    { mood: 'Anger', description: 'Feelings of outrage, frustration, hatred, vengefulness and provocation.', learning: 'Something or someone has violated an already set boundary.' }
  ])
  return ( 
    <div className="mood">
      { moods.map((mood, index) => (
        <div key={index} className="mood-description">
        <h2>{ mood.mood }</h2>
        <h3>Description</h3>
        <p>{ mood.description }</p>
        <h3>Learning</h3>
        <p>{ mood.learning }</p>
        </div>
      ))}     
    </div>
   )
}
 
export default Mood;