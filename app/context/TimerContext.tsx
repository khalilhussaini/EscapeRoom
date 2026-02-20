// "use client";

// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { useRouter } from "next/navigation";

// interface TimerContextType {
//   secondsLeft: number;
//   resetTimer: (seconds: number) => void;
// }

// const TimerContext = createContext<TimerContextType>({
//   secondsLeft: 0,
//   resetTimer: () => { },
// });

// export function TimerProvider({ children }: { children: ReactNode }) {
//   const router = useRouter();
//   const TOTAL_TIME = 60;

//   const [secondsLeft, setSecondsLeft] = useState<number>(() => {
//     if (typeof window !== "undefined") {
//       const saved = sessionStorage.getItem("timeLeft");
//       return saved ? parseInt(saved) : TOTAL_TIME;
//     }
//     return TOTAL_TIME;
//   });

//   useEffect(() => {
//     if (secondsLeft <= 0) {
//       sessionStorage.removeItem("timeLeft");

//       setTimeout(() => {
//         router.push("/story");
//       }, 500);

//       return;
//     }

//     const interval = setInterval(() => {
//       setSecondsLeft((prev) => {
//         const next = prev - 1;
//         sessionStorage.setItem("timeLeft", next.toString());
//         return next;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [secondsLeft, router]);

//   const resetTimer = (newSeconds: number) => {
//     setSecondsLeft(newSeconds);
//     sessionStorage.setItem("timeLeft", newSeconds.toString());
//   };

//   return (
//     <TimerContext.Provider value={{ secondsLeft, resetTimer }}>
//       {children}
//     </TimerContext.Provider>
//   );
// }

// export const useTimerContext = () => useContext(TimerContext);

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";

interface TimerContextType {
  timerValue: number;
  resetTimer: (seconds: number) => void;
  toggleMute: () => void;
  isMuted: boolean;
  timerRunning: boolean;
}

const TimerContext = createContext<TimerContextType>({
  timerValue: 2,
  resetTimer: () => { },
  toggleMute: () => { },
  isMuted: false,
  timerRunning: false,
});

export function TimerProvider({ children }: { children: ReactNode }) {
  const TOTAL_TIME = 60;

  const [timerValue, setTimerValue] = useState(TOTAL_TIME);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    audioRef.current = new Audio("/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    const start = () => {
      setTimerRunning(true);
      audioRef.current?.play().catch(() => {
        console.log("Autoplay blocked. User interaction required.");
      });
    };

    const timeout = setTimeout(start, 0);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);
  useEffect(() => {
    if (!timerRunning) return;

    intervalRef.current = window.setInterval(() => {
      setTimerValue((prev) => {
        if (prev <= 1) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerRunning]);

  // Reset the timer
  const resetTimer = (seconds: number) => {
    setTimerValue(seconds);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimerRunning(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <TimerContext.Provider
      value={{ timerValue, resetTimer, toggleMute, isMuted, timerRunning }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export const useTimerContext = () => useContext(TimerContext);
