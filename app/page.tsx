

"use client";
import Button from "./components/Button/Button";
import Styles from "./styles/escapeRoom.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const startGame = () => {
    router.push("./identity");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className={Styles.loading1}>
        <h1 className={Styles.title12}>Escape Room</h1>
        <p className={Styles.title123}>TechCore Lab</p>
        <Button label="Start" onClick={startGame} className={Styles.button9} />
      </div>
    </div>
  );
}
