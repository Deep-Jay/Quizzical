const HIGHLIGHTS = ["5 questions", "Science: Computers", "Instant feedback"];

export default function IntroScreen(props) {
  return (
    <div className="full-screen intro-screen">
      <h1 className="intro-screen__title">Quizzical</h1>
      <p className="intro-screen__tagline">
        Test your knowledge with a fun mix of trivia questions.
      </p>
      <ul className="intro-screen__chips">
        {HIGHLIGHTS.map((highlight) => (
          <li key={highlight} className="chip">{highlight}</li>
        ))}
      </ul>
      <button className="btn" onClick={() => props.toggleScreen(false)}>Start quiz</button>
    </div>
  )
}
