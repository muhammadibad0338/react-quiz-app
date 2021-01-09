import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions, Difficulty, QuestionState } from './Api';
import { type } from 'os';

const TOTAL_QUESTION = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(true);

//console.log(questions)

  const startTrivia = async () => {
    setLoading(true);
    setGameover(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTION, Difficulty.EASY)
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameover) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore(pre => pre + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswer((prev) => [...prev, answerObject]);

    }
  }
  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTION) {
      setGameover(true);
    }
    else {
      setNumber(nextQ)
    }
  }
  return (
    <>
      <h1>Quiz React App</h1>
      {gameover || userAnswer.length === TOTAL_QUESTION ? (
        <button className="start" onClick={startTrivia}>Start</button>
      ) : null}

      {!gameover ? <h2 className="score">Score : {score} </h2> : null}
      {loading && <p>Loading Question..</p>}
      {!loading && !gameover && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTION}
          question={questions[number].question}
          answer={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />)}
      {!gameover && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
        <button className="next" onClick={nextQuestion}>Next Question</button>
      ) : null}
    </>
  );
}

export default App;