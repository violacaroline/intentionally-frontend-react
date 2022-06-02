const Info = () => {
  return (
    <div className="info">
      <div className="info-text">
        <h3>What information is Intentionally keeping about me?</h3>
        <p>Information that you shared during registration such as your name, email, username and pass phrase. Pass phrases are salted and hashed which means they can not be read back and are therefor safe.</p>
        <p>Moods that you log before your meditation will be kept, but only you personally will see that data. The application will ensure your identity and only display your own logged moods - so that you can keep track over your feelings  {String.fromCharCode("0x00002661")}</p>
        <p>The application stores an access token that is created when you log in. It is there to ensure that it's you who wants to view your previously logged moods or asking for an intention before your meditation.</p>
        <h3>Can I remove my data?</h3>
        <p>On your profile page under "Practice" - "My practice", you will find a link you can use if you would like to delete your account. This will also delete all your previously logged moods.</p>
        <h3>Contact</h3>
        <p>Any questions, please contact me at <a href="mailto:ca223pw@student.lnu.se">ca223pw@student.lnu.se</a></p>
        <p>This web application is a student project made during the first year of Web Programming at Linneaus University by Caroline Åkesson</p>
        <p>It has been a great oppurtunity to try out new technichs and also a challenge to create this tiny space. I made it with the intention to help people create a daily meditation practice and also keep track of their overall mental health {String.fromCharCode("0x00002661")}</p>
      </div>
    </div>
  )
}

export default Info;