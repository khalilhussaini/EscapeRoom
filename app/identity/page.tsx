"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button/Button";
import InputField from "../components/input/Inputfield";
import Styles from "@/app/styles/escapeRoom.module.css";
import api from "../services/api";

export default function IdentityPage() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  const handleNext = async () => {
    if (!name.trim()) return;

    console.log("Submitting name:", name);

    try {
      const response = await api.post("/user", { name });
      console.log("API response:", response.data);

      const { id, name: userName } = response.data;

      sessionStorage.setItem("userId", id.toString());
      sessionStorage.setItem("playerName", userName);

      console.log("Navigating to story page...");
      router.push("./story");
    } catch (error: unknown) {
      console.error("Full error:", error);
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "ECONNABORTED"
      ) {
        alert(
          "Request timeout. Please check if the backend server is responding.",
        );
      } else if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response: { data?: { message?: string }; statusText: string };
        };
        alert(
          `Server error: ${axiosError.response.data?.message || axiosError.response.statusText
          }`,
        );
      } else if (error && typeof error === "object" && "request" in error) {
        alert(
          "Cannot connect to server. Please check if the backend is running at http://localhost:4000",
        );
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        alert("Error: " + errorMessage);
      }
    }
  };

  return (
    <div className={Styles.boxbox}>
      <h2 className={Styles.title22}>Identify yourself to begin the BIT-9 retrieval mission</h2>
      <div className={Styles.gridContainer}>
        <div className={Styles.inputColumn}>
          <InputField
            type="text"
            value={name}
            onChange={setName}
            placeholder="Enter your name"
          />
          {showError && (
            <p className={Styles.errorText}>Enter your name please</p>
          )}
        </div>
        <div className={Styles.buttonColumn}>
          <Button
            label="Begin mission"
            onClick={() => {
              if (name.trim().length === 0) {
                setShowError(true);
                return;
              }
              setShowError(false);
              handleNext();
            }}
            className="button"
          />
          <div style={{ height: "1em" }}></div>
        </div>
      </div>
    </div>
  );
}
