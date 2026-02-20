"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Styles from "@/app/styles/escapeRoom.module.css";
import Button from "../components/Button/Button";
import api from "../services/api";

interface QuizData {
  mission?: string;
  question?: string;
  hint?: string;
  answerPossibilities?: string[];
  startedAt?: string;
  timeRemaining?: number;
  timerExpired?: boolean;
  alreadyCompleted?: boolean;
  message?: string;
  completedAt?: string;
  clue?: {
    letter: string;
    text: string;
  };
}

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [missionId, setMissionId] = useState<number | null>(null);
  const [showExitPanel, setShowExitPanel] = useState(false);
  const [showTimeoutPanel, setShowTimeoutPanel] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [completedClue, setCompletedClue] = useState<QuizData["clue"] | null>(null);

  // Get missionId from query
  useEffect(() => {
    const missionIdParam = searchParams.get("missionId");
    if (missionIdParam) {
      setMissionId(parseInt(missionIdParam));
    }
  }, [searchParams]);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!missionId) return;

      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found");
          setLoading(false);
          return;
        }
        const response = await api.get(`/missions/${missionId}`, {
          params: { userId },
        });
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [missionId]);

  // Handle answer submission
  const handleAnswer = async (answer: string) => {
    if (!missionId) return;

    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        setFeedback("Error: User ID not found.");
        return;
      }

      const response = await api.post("/answer", {
        missionId: missionId,
        answer: answer,
        userId: parseInt(userId),
      });

      const { correct, clue, timeout } = response.data;

      if (timeout) {
        setShowTimeoutPanel(true);
        return;
      }

      if (correct) {
        setMissionCompleted(true);
        if (clue) setCompletedClue(clue);
        setFeedback(`Correct! ${clue ? `${clue.text}: ${clue.letter}` : ""}`);
      } else {
        setFeedback("Wrong answer.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setFeedback("Error submitting answer.");
    }
  };

  if (loading) {
    return <div className={Styles.quizPart}>Loading...</div>;
  }

  if (!quizData) {
    return <div className={Styles.quizPart}>Error loading quiz data.</div>;
  }

  // Already completed mission
  if (quizData.alreadyCompleted) {
    return (
      <div className={Styles.quizPart}>
        <h1 className={Styles.TitleQuiz}>Mission Already Completed</h1>
        <div className={Styles.box}>
          <p className={Styles.quizCompletedText}>{quizData.message}</p>
          <p className={Styles.quizCompletedText} style={{ color: "black" }}>
            Completed at: {new Date(quizData.completedAt!).toLocaleString()}
          </p>
          {quizData.clue && (
            <p className={Styles.text9} style={{ color: "black" }}>
              <strong>
                Clue: {quizData.clue.text}: {quizData.clue.letter}
              </strong>
            </p>
          )}
        </div>
        <Button
          label="Back to Map"
          className={Styles.buttonQuiz}
          onClick={() => router.push("/map")}
        />
      </div>
    );
  }

  // Show success panel after correct answer
  if (missionCompleted) {
    return (
      <div className={Styles.quizPart}>
        <h1 className={Styles.quizCompletedText}>Mission Completed!</h1>
        <div className={Styles.box}>
          {completedClue && (
            <p className={Styles.quizCompletedText} style={{ color: "black" }}>
              <strong>
                Clue: {completedClue.text}: {completedClue.letter}
              </strong>
            </p>
          )}
        </div>
        <Button
          label="Back to Map"
          className={Styles.buttonQuiz}
          onClick={() => router.push("/map")}
        />
      </div>
    );
  }

  // Main quiz content
  return (
    <div className={Styles.quizPart}>
      <h1 className={Styles.TitleQuiz}>{quizData.mission}</h1>
      <div className={Styles.box}>
        <div className={Styles.text1}>
          <Button
            label="Hint"
            className={Styles.hint}
            onClick={() => setShowHint(!showHint)}
          />
          {showHint && (
            <p className={Styles.hintText}>
              {quizData.hint}, it tells you what to do
            </p>
          )}
        </div>
        <h1 className={Styles.text}>{quizData.question}</h1>
      </div>
      <div className={Styles.answers}>
        {quizData.answerPossibilities?.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
      {feedback && <p className={Styles.feedback}>{feedback}</p>}
      <Button
        label="Exit"
        className={Styles.buttonQuiz}
        onClick={() => setShowExitPanel(true)}
      />

      {showExitPanel && (
        <div className={Styles.exit1}>
          <div className={Styles.exitBox}>
            <p className={Styles.exitText}>Exit?</p>
            <div className={Styles.exitButtons1}>
              <Button label="Cancel" onClick={() => setShowExitPanel(false)} />
              <Button label="Confirm" onClick={() => router.push("/map")} />
            </div>
          </div>
        </div>
      )}

      {showTimeoutPanel && (
        <div className={Styles.exit1}>
          <div className={Styles.exitBox}>
            <p className={Styles.exitText}>Game Over!</p>
            <p
              style={{
                fontSize: "2rem",
                textAlign: "center",
                color: "#222",
              }}
            >
              You took too long to answer.
            </p>
            <div className={Styles.exitButtons1}>
              <Button label="Back to Map" onClick={() => router.push("/map")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className={Styles.quizPart}>Loading...</div>}>
      <QuizContent />
    </Suspense>
  );
}
