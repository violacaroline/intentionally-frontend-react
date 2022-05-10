const PracticeNow = () => {
  return (
    <div className="practice-now">
      <div className="feeling-heading">
        <h1>{'Tell me, how are you feeling?'}</h1>
      </div>
      <div className="feelings-buttons">
        <div className={"feeling  feeling-joy"}>
          <button className="joy">Joy</button>
        </div>
        <div className={"feeling  feeling-fear"}>
          <button className="fear">Fear</button>
        </div>
        <div className={"feeling  feeling-anger"}>
          <button className="anger">Anger</button>
        </div>
        <div className={"feeling  feeling-sadness"}>
          <button className="sadness">Sadness</button>
        </div>
        <div className={"feeling  feeling-disgust"}>
          <button className="disgust">Disgust</button>
        </div>
      </div>
    </div>
  )
}

export default PracticeNow;