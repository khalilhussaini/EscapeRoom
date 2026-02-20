"use client";

import Styles from "@/app/styles/escapeRoom.module.css";
import Button from "../components/Button/Button";
import { useRouter } from "next/navigation";

export default function WinPage() {
  const router = useRouter();

  const handleBackToMap = () => {
    router.push("/map");
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <div className={Styles.success}>
      <div className={Styles.textquiz}>
        <h1
          style={{
            fontSize: "3rem",
            color: "#FFD700",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          🎉 CONGRATULATIONS! 🎉
        </h1>
        <p
          style={{
            fontSize: "1.8rem",
            textAlign: "center",
            color: "white",
            marginBottom: "20px",
          }}
        >
          <strong>YOU WON THE TREASURE HUNT!</strong>
        </p>
        <p style={{ fontSize: "1.2rem", textAlign: "center", color: "white" }}>
          You have successfully completed all missions!
          <br />
          <br />
          You&apos;ve decoded the mysteries, solved the riddles,
          <br />
          and discovered all the secrets.
          <br />
          <br />
          Thank you for playing!
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button
          label="Back to Map"
          className={Styles.buttonQuiz}
          onClick={handleBackToMap}
        />
        <Button
          label="Exit Game"
          className={Styles.buttonQuiz}
          onClick={handleExit}
        />
      </div>
    </div>
  );
}
