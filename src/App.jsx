import { useState, useEffect } from "react";
import IntroScreen from "./components/IntroScreen";
import { shuffle } from "./utils";
import {decode} from 'html-entities';

const QUESTION_COUNT = 5;

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [score, setScore] = useState(0);

  function handleSubmit() {
    if (!submit) {
      const correct = questions.filter((question, i) => (
        question.correct_answer === document.querySelector(`input[name="question-${i}"]:checked`)?.value
      )).length;

      setScore(correct);
      setSubmit(true);
    } else {
      setQuestions([]);
      setScore(0);
      setSubmit(false);
      getQuestions();
    }
  }

  async function getQuestions() {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&category=18`,
      );

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      if (data.response_code !== 0) {
        throw new Error(`API error: ${data.response_code}`);
      }

      const questions = data.results.map((question) => ({
        ...question,
        options: shuffle([
          question.correct_answer,
          ...question.incorrect_answers,
        ]),
      }));

      setQuestions(questions);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <main className="quiz">
      {showIntro && <IntroScreen toggleScreen={setShowIntro} />}
      {!showIntro && (
        <>
          <header className="quiz__header">
            <h1 className="quiz__title">Quizzical</h1>
            <p className="quiz__meta">Science: Computers</p>
          </header>

          {questions.length === 0 ? (
            <p className="status">Loading questions…</p>
          ) : (
            <ol className="quiz__list">
              {questions.map((question, i) => (
                <li
                  key={question.question}
                  className={`question-card ${submit ? "is-submitted" : ""}`}
                >
                  <p className="question">
                    <span className="question__index" aria-hidden="true">{i + 1}</span>
                    <span>{decode(question.question)}</span>
                  </p>

                  <div className="answers" role="group" aria-label={`Answers for question ${i + 1}`}>
                    {question.options.map((option) => (
                      <label
                        key={option}
                        className="answer"
                        data-correct={question.correct_answer === option}
                      >
                        <input
                          type="radio"
                          name={`question-${i}`}
                          value={option}
                          disabled={submit}
                        />
                        <span>{decode(option)}</span>
                      </label>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          )}

          <div className="results">
            {submit && (
              <p className="result" role="status">
                You scored <strong>{score}</strong>/{questions.length} correct
              </p>
            )}
            <button className="btn" onClick={handleSubmit}>
              {!submit ? "Check answers" : "Play again"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
