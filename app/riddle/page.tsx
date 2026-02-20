"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Styles from "@/app/styles/escapeRoom.module.css";
import Button from "../components/Button/Button";
import api from "../services/api";

interface RiddleData {
  mission?: string;
  question?: string;
  hint?: string;
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

function RiddleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [riddleData, setRiddleData] = useState<RiddleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [missionId, setMissionId] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [showExitPanel, setShowExitPanel] = useState(false);
  const [showTimeoutPanel, setShowTimeoutPanel] = useState(false);

  useEffect(() => {
    const missionIdParam = searchParams.get("missionId");
    if (missionIdParam) {
      setMissionId(parseInt(missionIdParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchRiddle = async () => {
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
        setRiddleData(response.data);
      } catch (error) {
        console.error("Error fetching riddle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiddle();
  }, [missionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!missionId || !answer.trim()) return;

    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        setFeedback("Error: User ID not found.");
        return;
      }

      const response = await api.post("/answer", {
        missionId: missionId,
        answer: answer.trim(),
        userId: parseInt(userId),
      });

      const { correct, clue, timeout } = response.data;

      if (timeout) {
        setShowTimeoutPanel(true);
        return;
      }

      if (correct) {
        const clueMessage = clue ? `${clue.text}: ${clue.letter}` : "";
        setFeedback(`Correct! ${clueMessage}`);
        setTimeout(() => {
          const params = new URLSearchParams();
          if (clue) {
            params.set("letter", clue.letter);
            params.set("text", clue.text);
          }
          router.push(`/riddle/success?${params.toString()}`);
        }, 1000);
      } else {
        setFeedback("Wrong answer.");
        setAnswer("");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setFeedback("Error submitting answer.");
    }
  };

  if (loading) {
    return <div className={Styles.quizPart}>Loading...</div>;
  }

  if (!riddleData) {
    return <div className={Styles.quizPart}>Error loading riddle data.</div>;
  }

  if (riddleData.alreadyCompleted) {
    return (
      <div className={Styles.quizPart}>
        <h1 className={Styles.TitleQuiz}>Mission Already Completed</h1>
        <div className={Styles.box}>
          <p className={Styles.quizCompletedText}>{riddleData.message}</p>
          <p className={Styles.quizCompletedText}>
            Completed at: {new Date(riddleData.completedAt!).toLocaleString()}
          </p>
          {riddleData.clue && (
            <p className={Styles.quizCompletedText}>
              <strong>
                Clue: {riddleData.clue.text}: {riddleData.clue.letter}
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

  return (
    <div className={Styles.quizPart}>
      <h1 className={Styles.TitleQuiz}>{riddleData.mission}</h1>
      <div
        className={Styles.box}
        style={{ minHeight: "400px", paddingBottom: "40px" }}
      >
        <div className={Styles.text1}>
          <Button
            label="hint"
            className={Styles.hint}
            onClick={() => setShowHint(!showHint)}
          />
          {showHint && <p className={Styles.hintText}>{riddleData.hint}Think of something digital that grows when you store more and more information </p>}
        </div>
        <h1 className={Styles.text}>{riddleData.question}</h1>
        <form onSubmit={handleSubmit}>
          <div className={Styles.answers}>
            <div>
              <label>
                Answer:{" "}
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  autoComplete="off"
                />
              </label>
            </div>
            <button type="submit" disabled={!answer.trim()}>
              Submit Answer
            </button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: "20px" }}></div>
      {feedback && <p className={Styles.feedback}>{feedback}</p>}
      {/* <Button
        label="Exit"
        className={Styles.buttonQuiz}
        onClick={() => setShowExitPanel(true)}
      /> */}
      <div className={Styles.exitButtonWrapper1}>
        <Button
          label="Exit"
          className={Styles.buttonQuiz}
          onClick={() => setShowExitPanel(true)}
        />
      </div>

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
            <p style={{ fontSize: "2rem", textAlign: "center", color: "#222" }}>
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

export default function RiddlePage() {
  return (
    <Suspense fallback={<div className="quizPart">Loading...</div>}>
      <RiddleContent />
    </Suspense>
  );
}
