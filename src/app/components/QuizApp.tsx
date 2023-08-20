'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import Timer from "./Timer";

const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizApp: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(API_URL);
      setQuestions(response.data.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionSubmit = (selectedOption: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    moveToNextQuestion();
  };

  const handleTimeout = () => {
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10); // Reset the timer for the next question
    } else {
      setQuizCompleted(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  if (quizCompleted) {
    const passedMessage = score >= 5 ? "Congratulations! You have passed!" : "You failed. Better luck next time.";

    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
        <p>Your Score: {score} out of {questions.length}</p>
        <p>{passedMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Trivia Quiz</h1>
      <Timer duration={timeLeft} onTimeout={handleTimeout} />
      <QuestionCard
        question={currentQuestion.question}
        options={currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer)}
        onSubmit={handleOptionSubmit}
      />
    </div>
  );
};

export default QuizApp;
